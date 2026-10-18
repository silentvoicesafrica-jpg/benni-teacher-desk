// Pure backup helpers: structural validation and AES-GCM encryption/decryption.
// No DOM access, so they can be tested in Node. Keep the iteration count and envelope
// layout unchanged so existing encrypted backups remain readable.
const BACKUP_ENCRYPTED_FORMAT = 'benni-encrypted-backup-v1';
const BACKUP_KDF_ITERATIONS = 150000;
const BACKUP_MIN_PASSWORD_LENGTH = 8;
const BACKUP_ARRAY_FIELDS = ['exams', 'workRecords', 'scores', 'projects', 'lessonPlans', 'extraPlans', 'customExtras'];
const BACKUP_OBJECT_FIELDS = ['customTopics', 'targets', 'checks'];
const BACKUP_STRING_FIELDS = ['term', 'currentClass'];

function isPlainObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }

// Returns { ok: true } or { ok: false, reason } and never changes anything.
function validateBackupState(candidate) {
  if (!isPlainObject(candidate)) return { ok: false, reason: 'the file contains no teacher records' };
  if (!Array.isArray(candidate.workRecords)) return { ok: false, reason: 'work records are missing' };
  for (const field of BACKUP_ARRAY_FIELDS) {
    if (candidate[field] === undefined) continue;
    if (!Array.isArray(candidate[field])) return { ok: false, reason: `${field} is not a list` };
    if (!candidate[field].every(isPlainObject)) return { ok: false, reason: `${field} contains an invalid entry` };
  }
  for (const field of BACKUP_OBJECT_FIELDS) {
    if (candidate[field] !== undefined && !isPlainObject(candidate[field])) return { ok: false, reason: `${field} is not valid` };
  }
  for (const field of BACKUP_STRING_FIELDS) {
    if (candidate[field] !== undefined && typeof candidate[field] !== 'string') return { ok: false, reason: `${field} is not valid` };
  }
  return { ok: true };
}

function bytesToBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function deriveBackupKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: BACKUP_KDF_ITERATIONS, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

// Encrypts a JSON-serialisable payload. AES-GCM is authenticated, so tampering is detected on decrypt.
async function encryptBackupPayload(payload, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveBackupKey(password, salt);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(payload)));
  return { format: BACKUP_ENCRYPTED_FORMAT, salt: bytesToBase64(salt), iv: bytesToBase64(iv), ciphertext: bytesToBase64(new Uint8Array(cipher)) };
}

// Returns { ok: true, payload } or { ok: false, reason: 'format' | 'unreadable' }.
// 'unreadable' covers both a wrong password and a damaged or altered file, which AES-GCM cannot tell apart.
async function decryptBackupEnvelope(envelope, password) {
  if (!isPlainObject(envelope) || envelope.format !== BACKUP_ENCRYPTED_FORMAT || typeof envelope.salt !== 'string' || typeof envelope.iv !== 'string' || typeof envelope.ciphertext !== 'string') return { ok: false, reason: 'format' };
  let salt, iv, data;
  try { salt = base64ToBytes(envelope.salt); iv = base64ToBytes(envelope.iv); data = base64ToBytes(envelope.ciphertext); }
  catch { return { ok: false, reason: 'format' }; }
  if (salt.length !== 16 || iv.length !== 12) return { ok: false, reason: 'format' };
  try {
    const key = await deriveBackupKey(password, salt);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return { ok: true, payload: JSON.parse(new TextDecoder().decode(plain)) };
  } catch { return { ok: false, reason: 'unreadable' }; }
}
