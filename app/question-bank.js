const OFFICIAL_COMPUTING_SOURCES = {
  primary: 'https://nacca.gov.gh/wp-content/uploads/2019/04/COMPUTING-B4-B6.pdf',
  ccp: 'https://nacca.gov.gh/wp-content/uploads/2023/06/COMPUTING.pdf',
  lower: 'https://nacca.gov.gh/computing/'
};

const TOPIC_PROFILES = {
  'What is ICT?':['ICT tools and their purposes','a computer, phone or radio','Introduction to Computing','ICT foundations'],
  'ICT Around Us':['uses of technology at home, school and community','a phone used to send a message','Technology in the Community','ICT in the community'],
  'Computer Parts':['parts of a computer and their functions','a keyboard sends input and a monitor shows output','Introduction to Computing','Computer parts'],
  'Using a Mouse':['pointing, clicking, dragging and safe mouse control','dragging a shape from one place to another','Introduction to Computing','Mouse skills'],
  'Using a Keyboard':['keys, typing, spacebar and Enter','using the spacebar to separate words','Introduction to Computing','Keyboard skills'],
  'Staying Safe':['safe posture, permission and equipment care','keeping liquids away from a computer','Health and Safety','Safe ICT use'],
  'Drawing on Computer':['using shapes, colours and drawing tools','making a picture with a line and circle','Productivity Software','Digital drawing'],
  'More Drawing':['editing a drawing and correcting mistakes','using undo after an accidental mark','Productivity Software','Digital drawing'],
  'Playing Educational Games':['learning through rules, turn-taking and safe games','sharing one mouse fairly','Introduction to Computing','Educational software'],
  'ICT at Home':['responsible family uses of technology','using a phone to communicate with family','Technology in the Community','ICT uses'],
  'Fun Review':['recalling safe and useful ICT practices','naming a computer part and its use','Introduction to Computing','Review'],
  'Computer parts':['computer parts and connections','keyboard, mouse, monitor and system unit','Introduction to Computing','Computer parts'],
  'Staying safe':['permission, safe posture and care of ICT equipment','asking an adult before touching a cable','Health and Safety','Safe ICT use'],
  'ICT at home and school':['technology tools used in familiar places','a computer used for learning','Technology in the Community','ICT uses'],
  'Mouse skills':['clicking, double-clicking and dragging','double-clicking a teacher-approved icon','Introduction to Computing','Mouse skills'],
  'Keyboard skills':['Home keys, alphabet keys and number keys','typing a short word using the keyboard','Introduction to Computing','Keyboard skills'],
  'Computer parts and uses':['identifying a tool and matching it to a use','a monitor displays information','Introduction to Computing','Computer parts'],
  'Mouse and keyboard practice':['coordinating mouse and keyboard actions','clicking a target then typing a word','Introduction to Computing','Mouse and keyboard'],
  'Digital safety':['permission, privacy and safe device habits','not sharing a password','Health and Safety','Digital safety'],
  'Drawing and colours':['using colour and shapes to communicate','choosing a colour to make a sign clear','Productivity Software','Creative digital work'],
  'Technology around us':['communication and technology in the community','radio, phone or computer communication','Technology in the Community','Technology uses'],
  'Introduction to computing':['computer systems, tools and responsible use','input, processing and output','Introduction to Computing','Computing foundations'],
  'Computer parts and their uses':['input, output and processing devices','a keyboard as an input device','Introduction to Computing','Computer parts'],
  'Keyboard and mouse skills':['accurate input using keyboard and mouse','typing then selecting a file','Introduction to Computing','Input skills'],
  'Word processing basics':['creating, editing and saving a short document','adding a title and correcting a sentence','Productivity Software','Word processing'],
  'Health and safety in ICT':['posture, breaks, permission and equipment care','taking a screen break and keeping cables safe','Health and Safety','ICT safety'],
  'Computer input and output devices':['input and output devices and their functions','a microphone provides input and speakers provide output','Introduction to Computing','Input and output'],
  'Word processing':['formatting, editing and saving documents','using a heading and paragraph formatting','Productivity Software','Word processing'],
  'Presentation basics':['slides, headings, images and clear communication','a three-slide school message','Productivity Software','Presentation'],
  'Internet and responsible use':['safe searching, privacy and responsible online behaviour','checking a link before opening it','Communication Networks','Internet responsibility'],
  'Output devices and digital devices':['output devices and digital systems','a printer produces a paper output','Introduction to Computing','Output devices'],
  'Word processing tools':['clipboard, fonts, paragraphs, editing and styles','using a heading style to improve readability','Productivity Software','Word processing'],
  'Presentation tools':['slide layout, text, images and transitions','using fewer words and a clear heading','Productivity Software','Presentation'],
  'Basic 5|Electronic spreadsheet':['cells, rows, columns, formulas and charts','a SUM formula for class totals','Productivity Software','Spreadsheets'],
  'Internet and email safety':['email, privacy, suspicious messages and safe sharing','checking a sender before opening an attachment','Communication Networks','Internet and email'],
  'Computer systems':['hardware, software, files and system functions','system software helps applications run','Introduction to Computing','Computer systems'],
  'Word processing and presentation':['choosing a document or slide format for a purpose','a document for detailed text and slides for presenting','Productivity Software','Productivity software'],
  'Spreadsheets':['data entry, calculations, tables and charts','a table that compares class categories','Productivity Software','Spreadsheets'],
  'Email and internet':['browser, URL, email and responsible communication','a URL identifies a web location','Communication Networks','Internet and email'],
  'Digital literacy and privacy':['personal information, privacy and responsible use','using anonymous IDs in a score record','Communication Networks','Digital literacy'],
  'Components of computers and computer systems':['hardware components, software and how a system works','input, processing, storage and output','Introduction to Computing','Computer systems'],
  'Technology in the community':['benefits, limitations and effects of technology','technology supporting learning or health','Technology in the Community','Technology and society'],
  'Introduction to presentation':['slide structure, audience and visual communication','a title slide with a clear message','Productivity Software','Presentation'],
  'Basic 7 / Form 1|Internet and social media':['networks, online communication and responsible participation','a safe response to a suspicious message','Communication Networks','Internet and social media'],
  'Information security':['threats, passwords, privacy and protective actions','using a strong password without revealing it','Communication Networks','Information security'],
  'Basic 8 / Form 2|Electronic spreadsheet':['data types, formulas, functions, references and charts','copying a formula down a column','Productivity Software','Electronic spreadsheet'],
  'Computer networks':['nodes, connections, resources and network types','sharing a printer on a local network','Communication Networks','Computer networks'],
  'Web technologies':['web pages, hyperlinks, search and source evaluation','using keywords to improve a search','Communication Networks','Web technologies'],
  'Introduction to programming':['variables, constants, operators and data types','a variable storing a score','Computational Thinking','Programming concepts'],
  'Algorithms':['sequence, selection, iteration and search','an IF decision in a classroom procedure','Computational Thinking','Algorithms'],
  'Desktop publishing':['page layout, text, images and audience','a flyer with a heading and aligned sections','Productivity Software','Desktop publishing'],
  'Basic 9 / Form 3|Internet and social media':['online identity, safe sharing and digital footprints','a post remaining available after sharing','Communication Networks','Internet and social media'],
  'Programming and algorithms':['pseudocode, flowcharts, sequence, selection and iteration','a flowchart for finding the largest value','Computational Thinking','Programming and algorithms'],
  'Robotics':['controllers, sensors, actuators and safe automation','a light sensor triggering a paper robot action','Computational Thinking','Robotics'],
  'Artificial intelligence':['data, rules, learning, capability and limitation','a rule-based system responding IF a condition is true','Computational Thinking','Artificial intelligence'],
  'Digital citizenship and security':['privacy, cyberbullying, consent and responsible participation','reporting harmful content to a trusted adult','Communication Networks','Digital citizenship'],
  'Desktop and computer parts':['desktop, icons, taskbar and basic file management','creating and renaming a folder','Introduction to Computing','Desktop and file management'],
  'Files, folders and saving':['file names, folders, save and retrieval','saving a project in a named folder','Introduction to Computing','File management'],
  'Data and information':['data, information, sources and simple analysis','turning a tally into a useful table','Data, Sources and Usage','Data and information'],
  'Data, sources and usage':['collecting, classifying, tabulating and interpreting data','a tally becoming a bar chart','Data, Sources and Usage','Data and information'],
  'Desktop, taskbar, icons and folders':['personalising the desktop and managing icons and folders','moving an icon and creating a folder','Introduction to Computing','Desktop and file management'],
  'Presentation':['slides, audience, text and visual communication','a three-slide presentation','Productivity Software','Presentation'],
  'Networks':['network connections, shared resources and communication','a local network sharing a printer','Communication Networks','Networks'],
  'Email and digital communication':['message structure, attachments and responsible communication','a fictional unsent email with an attachment','Communication Networks','Email'],
  'IoT and smart sensors':['sensors, data, connectivity and responsible use','a light sensor controlling a smart lamp','Communication Networks','Internet of Things'],
  'Emerging technology and storage':['wearables, e-paper, cloud and local storage','saving a file in a cloud service with permission','Introduction to Computing','Emerging technology'],
  'Cloud storage':['remote storage, access, sync and privacy','a dated backup stored in a private folder','Communication Networks','Cloud storage'],
  'E-commerce and e-learning':['online transactions, learning platforms and safety','checking a site before entering payment details','Communication Networks','Online services'],
  'Advanced spreadsheets':['sorting, filtering, validation, pivot tables and charts','filtering a class table by one category','Productivity Software','Advanced spreadsheets'],
  'Web development':['web pages, structure, links and publishing','a simple page with a heading and link','Communication Networks','Web technologies'],
  'Binary and hexadecimal':['number systems and conversion for computing','converting a small binary value to decimal','Computational Thinking','Number systems']
};

function topicProfile(topic, className) {
  const exact = TOPIC_PROFILES[`${className}|${topic}`] || TOPIC_PROFILES[topic];
  if (exact) return { focus: exact[0], example: exact[1], strand: exact[2], subStrand: exact[3] };
  const lower = String(topic).toLowerCase();
  let focus = 'the key ideas, uses and responsible practice connected to this topic';
  let example = `a practical school example of ${topic}`;
  let strand = 'Introduction to Computing';
  let subStrand = 'Teacher-selected topic';
  if (/internet|email|social|security|privacy|network|web/.test(lower)) { strand='Communication Networks'; subStrand='Communication, safety and responsible use'; }
  else if (/word|presentation|spreadsheet|desktop|file|folder|drawing/.test(lower)) { strand='Productivity Software'; subStrand='Productivity software'; }
  else if (/program|algorithm|robot|artificial|binary|hex/.test(lower)) { strand='Computational Thinking'; subStrand='Computational thinking'; }
  else if (/data|information/.test(lower)) { strand='Data, Sources and Usage'; subStrand='Data and information'; }
  return { focus, example, strand, subStrand };
}

function sourceForClass(className) {
  if (['KG2','Basic 1','Basic 2','Basic 3'].includes(className)) return OFFICIAL_COMPUTING_SOURCES.lower;
  if (['Basic 4','Basic 5','Basic 6'].includes(className)) return OFFICIAL_COMPUTING_SOURCES.primary;
  return OFFICIAL_COMPUTING_SOURCES.ccp;
}

function bankForTopic(className, topic, group = 'b59') {
  const p = topicProfile(topic, className);
  const source = sourceForClass(className);
  const map = { strand:p.strand, subStrand:p.subStrand, contentStandard:'Verify the exact approved curriculum wording before publication.', indicator:'Verify the exact approved curriculum indicator before publication.', source, verification:'Source document identified; exact wording and indicator codes still need teacher confirmation.' };
  const stem = topic;
  const questions = [
    {type:'Multiple choice',difficulty:'Basic',text:`Which statement best describes ${topic}?`,options:[`It concerns ${p.focus}.`,'It is unrelated to learning.','It is only used outside school.','It must never be practised.'],answer:`It concerns ${p.focus}.`,marks:1},
    {type:'True or false',difficulty:'Basic',text:`True or false: A learner can connect ${topic} to ${p.example}.`,answer:'True. The example is a valid school or community connection.',marks:1},
    {type:'Short answer',difficulty:'Basic',text:`State one important idea learners should know about ${topic}.`,answer:`Any accurate statement about ${p.focus}, such as ${p.example}.`,marks:2},
    {type:'Matching',difficulty:'Standard',text:`Match the topic idea with its practical example: ${topic}.`,answer:`A correct match connects ${p.focus} with ${p.example}.`,marks:2},
    {type:'Practical',difficulty:'Standard',text:`Describe or demonstrate one safe classroom task using ${topic}.`,answer:`Accept a correctly sequenced, safe task connected to ${p.focus}; the learner should explain the purpose.`,marks:3},
    {type:'Short answer',difficulty:'Standard',text:`Give one school or community use of ${topic} and explain its benefit.`,answer:`Accept a relevant use and a clear benefit connected to ${p.focus}.`,marks:3},
    {type:'Structured',difficulty:'Challenging',text:`Explain ${topic}. Include two key points, ${p.example}, and one responsible-use or safety point.`,answer:`Award marks for two accurate points, a relevant example, and a responsible-use or safety point.`,marks:5},
    {type:'Scenario',difficulty:'Challenging',text:`A learner needs to apply ${topic} to a school task. Recommend an approach and justify it.`,answer:`Award marks for a suitable approach, correct reasoning, a relevant example, and safe/responsible practice.`,marks:5},
    {type:'Multiple choice',difficulty:'Standard',text:`Which classroom action shows correct understanding of ${topic}?`,options:[`Use it for ${p.example}.`,'Ignore instructions and safety.','Share private information freely.','Change unrelated settings.'],answer:`Use it for ${p.example}.`,marks:1},
    {type:'True or false',difficulty:'Standard',text:`True or false: Responsible use matters when learning ${topic}.`,answer:'True. Safe and responsible practice is part of competent ICT use.',marks:1},
    {type:'Practical',difficulty:'Challenging',text:`Plan a three-step activity that teaches ${topic} to a younger learner.`,answer:`Award marks for three logical steps, accurate topic content, learner suitability, and safety.`,marks:4},
    {type:'Short answer',difficulty:'Challenging',text:`State one limitation or possible risk connected to ${topic} and one way to reduce it.`,answer:`Accept a relevant limitation or risk and a practical mitigation linked to ${p.focus}.`,marks:3}
  ];
  return questions.map((q,i) => ({...q,id:`${className}-${topic}-${i+1}`.replace(/[^a-z0-9]+/gi,'-').toLowerCase(),topic,className,mapping:map}));
}

// Multiple-choice answers must not always sit in the same place (for example always option A).
// The correct answer moves to a position that rotates with the question number.
function spreadAnswers(questions) {
  return questions.map((q, i) => {
    if (!Array.isArray(q.options) || !q.options.includes(q.answer)) return q;
    const pos = i % q.options.length;
    const others = q.options.filter(option => option !== q.answer);
    const options = [];
    let next = 0;
    for (let j = 0; j < q.options.length; j += 1) options.push(j === pos ? q.answer : others[next++]);
    return { ...q, options };
  });
}

function buildQuestionBank(className, topics) {
  const bank = topics.flatMap(topic => {
    // Basic 4 uses the real, teacher-checked bank only. Topics without real questions give nothing.
    if (className === 'Basic 4' && typeof B4_QUESTION_BANK !== 'undefined') return B4_QUESTION_BANK[topic] || [];
    return bankForTopic(className, topic);
  });
  return spreadAnswers(bank);
}

// True only for topics with a deliberate question profile. Generation must refuse other topics.
function hasTopicProfile(topic, className) {
  const has = key => Object.prototype.hasOwnProperty.call(TOPIC_PROFILES, key);
  if (className === 'Basic 4' && typeof B4_QUESTION_BANK !== 'undefined') return Object.prototype.hasOwnProperty.call(B4_QUESTION_BANK, topic);
  return (className !== undefined && has(`${className}|${topic}`)) || has(topic);
}
