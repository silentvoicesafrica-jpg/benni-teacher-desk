// Run with: APP_DIR=/path/to/app node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const appDir = process.env.APP_DIR;
if (!appDir) throw new Error('Set APP_DIR to the app folder');

// Load plain browser scripts into one sandbox and expose their top-level constants for tests.
function loadScripts(files) {
  const ctx = { console, TextEncoder, TextDecoder, crypto: globalThis.crypto, atob, btoa, Uint8Array, JSON, Set, Map };
  vm.createContext(ctx);
  for (const file of files) {
    const source = fs.readFileSync(path.join(appDir, file), 'utf8');
    vm.runInContext(source + '\n;globalThis.__TOPIC_PROFILES = typeof TOPIC_PROFILES !== "undefined" ? TOPIC_PROFILES : undefined;', ctx, { filename: file });
  }
  return ctx;
}
const sandbox = loadScripts(['question-bank.js', 'backup-validation.js']);
const {
  validateBackupState, encryptBackupPayload, decryptBackupEnvelope, hasTopicProfile,
  buildQuestionBank, __TOPIC_PROFILES
} = sandbox;

// Default topics and exam rules, read from app.js so the test follows the shipped data.
const appSource = fs.readFileSync(path.join(appDir, 'app.js'), 'utf8');
const topicsMatch = appSource.match(/const DEFAULT_TOPICS = (\{[\s\S]*?\n\});/);
const DEFAULT_TOPICS = vm.runInContext('(' + topicsMatch[1] + ')', vm.createContext({}));
const ruleFor = cls => {
  if (['KG2', 'Basic 1', 'Basic 2'].includes(cls)) return { a: 30, b: 0 };
  if (['Basic 3', 'Basic 4'].includes(cls)) return { a: 40, b: 5 };
  return { a: 40, b: 6 };
};

test('backup validation accepts a minimal and a full state', () => {
  assert.equal(validateBackupState({ workRecords: [] }).ok, true);
  assert.equal(validateBackupState({
    term: 'Term 1', currentClass: 'Basic 4', workRecords: [{ id: 1 }], exams: [], scores: [],
    projects: [], lessonPlans: [], extraPlans: [], customExtras: [], customTopics: {}, targets: {}, checks: {}
  }).ok, true);
});

test('backup validation rejects malformed states without changing them', () => {
  const bad = [null, [], 'text', {}, { workRecords: 'x' }, { workRecords: [], exams: 'x' },
    { workRecords: [], scores: [1, 2] }, { workRecords: [], customTopics: [] }, { workRecords: [], currentClass: 5 }];
  for (const candidate of bad) assert.equal(validateBackupState(candidate).ok, false, JSON.stringify(candidate));
});

test('encrypted backup round-trips with the right password', async () => {
  const payload = { version: 2, state: { workRecords: [{ id: 'a', score: 7 }] } };
  const envelope = await encryptBackupPayload(payload, 'correct-horse-battery');
  assert.equal(envelope.format, 'benni-encrypted-backup-v1');
  const result = await decryptBackupEnvelope(envelope, 'correct-horse-battery');
  assert.equal(result.ok, true);
  assert.deepEqual(result.payload, payload);
});

test('wrong password fails safely as unreadable', async () => {
  const envelope = await encryptBackupPayload({ state: { workRecords: [] } }, 'correct-horse-battery');
  const result = await decryptBackupEnvelope(envelope, 'wrong-password-123');
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'unreadable');
});

test('tampered ciphertext is rejected by AES-GCM', async () => {
  const envelope = await encryptBackupPayload({ state: { workRecords: [] } }, 'correct-horse-battery');
  const bytes = Buffer.from(envelope.ciphertext, 'base64');
  bytes[0] ^= 0xff;
  const tampered = { ...envelope, ciphertext: bytes.toString('base64') };
  const result = await decryptBackupEnvelope(tampered, 'correct-horse-battery');
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'unreadable');
});

test('wrong envelope format is reported as format, not password', async () => {
  assert.equal((await decryptBackupEnvelope({ format: 'other' }, 'x'.repeat(8))).reason, 'format');
  assert.equal((await decryptBackupEnvelope({ format: 'benni-encrypted-backup-v1', salt: '!!', iv: 'AA==', ciphertext: 'AA==' }, 'x'.repeat(8))).reason, 'format');
});

test('every default class topic has a deliberate question profile', () => {
  let count = 0;
  for (const topics of Object.values(DEFAULT_TOPICS)) for (const topic of topics) { count++; assert.equal(hasTopicProfile(topic), true, topic); }
  assert.ok(count > 50);
});

test('custom topics have no profile, so generation must refuse them', () => {
  assert.equal(hasTopicProfile('Robotics club'), false);
  assert.equal(hasTopicProfile('constructor'), false);
});

test('each class default topic set can build its official paper without repeats', () => {
  for (const [cls, topics] of Object.entries(DEFAULT_TOPICS)) {
    const rule = ruleFor(cls);
    const bank = buildQuestionBank(cls, topics);
    const seen = new Set();
    const pool = bank.filter(q => { const k = q.text.trim().toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
    assert.ok(pool.length >= rule.a, `${cls}: Section A pool ${pool.length} < ${rule.a}`);
    const sectionA = pool.slice(0, rule.a);
    const aIds = new Set(sectionA.map(q => q.id));
    const structured = pool.filter(q => ['Structured', 'Scenario', 'Practical'].includes(q.type) && !aIds.has(q.id));
    assert.ok(structured.length >= rule.b, `${cls}: Section B pool ${structured.length} < ${rule.b}`);
    for (const q of sectionA) { assert.ok(q.answer && q.marks > 0, `${cls}: missing answer or marks for ${q.id}`); }
  }
});

test('a single topic cannot build a full paper', () => {
  const pool = buildQuestionBank('KG2', ['What is ICT?']);
  assert.ok(pool.length < ruleFor('KG2').a);
});

// ---- Phase A: static local-first build ----
const indexHtml = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(appDir, 'app.js'), 'utf8');
const swJs = fs.readFileSync(path.join(appDir, 'sw.js'), 'utf8');

test('Phase A: Content Security Policy blocks other origins and eval', () => {
  const m = indexHtml.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
  assert.ok(m, 'CSP meta tag is present');
  const policy = m[1];
  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /script-src 'self'(;|$)/);
  assert.doesNotMatch(policy, /unsafe-eval/);
  assert.match(policy, /object-src 'none'/);
});

test('Phase A: no inline script blocks and no remote scripts in index.html', () => {
  assert.doesNotMatch(indexHtml, /<script(?![^>]*\bsrc=)[^>]*>/i, 'every script tag loads a file');
  for (const [, src] of indexHtml.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)) {
    assert.match(src, /^\.\//, `script ${src} is a relative app file`);
  }
});

test('Phase A: sign-in to Manus is switched off for the static build', () => {
  assert.match(appJs, /const SIGN_IN_ENABLED = false;/);
  assert.match(indexHtml, /id="loginBtn"[^>]*hidden/);
  assert.match(appJs, /if \(!SIGN_IN_ENABLED\) \{/);
});

test('Phase A: links work at any address (no root-relative app paths)', () => {
  assert.doesNotMatch(indexHtml, /(href|src)="\/[^/]/);
  
  assert.match(appJs, /register\('sw\.js'\)/);
  assert.doesNotMatch(swJs, /'\/(app\.js|index\.html|styles\.css)'/);
});

test('Phase A: privacy policy exists and says nothing is sent to a server', () => {
  assert.match(appJs, /PRIVACY_POLICY_HTML = `/);
  assert.match(appJs, /nothing you type is sent over the internet/i);
  assert.match(indexHtml, /id="privacyPolicyBtn"/);
});

test('Phase A: typed values put into HTML attributes are escaped', () => {
  // Any data-* attribute built from a record id must go through esc().
  const raw = appJs.match(/data-[a-z-]+="\$\{(?!esc\()[^}]+\}/g) || [];
  assert.deepEqual(raw, [], `unescaped attributes: ${raw.join(', ')}`);
});
