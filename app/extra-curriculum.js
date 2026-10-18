const EXTRA_CURRICULA = [
  {
    id: "coding-digital-making",
    title: "Coding and Digital Making",
    tag: "Digital skills",
    icon: "</>",
    age: "Basic 3–Form 3",
    why: "Unplugged algorithms, Scratch-style projects, debugging and practical digital confidence.",
    status: "Teacher-designed optional pathway",
    skills: ["Algorithms and decomposition", "Sequence, events, loops and choices", "Digital storytelling and quizzes", "Testing and debugging", "Saving and presenting projects"],
    safety: ["Use offline tools where possible; do not require learner accounts or public posting.", "Do not collect or publish learner names, faces, voices, locations or contact details without the school’s approved process.", "Rotate shared-device time and provide paper alternatives for access, disability and language needs.", "Only an authorised adult handles damaged cables, chargers or power strips."],
    sessions: [
      { title: "Instructions become algorithms", outcome: "Each learner produces a correctly ordered 6–8-step algorithm for a familiar task and explains the sequence.", activity: "Arrange paper action cards for a Ghanaian-context task such as handwashing, safe road crossing or preparing a school bag. If a device is available, connect event and motion blocks; otherwise move a paper sprite on a grid.", evidence: "Dated algorithm sheet or card sequence, observation checklist and one saved project, screenshot or paper-grid trace." },
      { title: "Tell a three-scene digital story", outcome: "Create and explain a three-scene story with a start event, a clear message and a beginning, middle and ending.", activity: "Storyboard a safe local theme, then add a backdrop, sprite and dialogue in Scratch or make a paper storyboard and role-play the characters.", evidence: "Three-box storyboard, saved file or paper prototype, and a short rubric for start event, scenes, message and explanation." },
      { title: "Repeat patterns with loops", outcome: "Identify a repeated pattern and use or mark a repeat block to make at least four repetitions.", activity: "Find patterns in claps, steps, rainfall, market movement or recycling routines. Build the loop on a shared device or perform it with paper block cards.", evidence: "Annotated block sequence, loop count, grid path or screenshot, plus a teacher check that actions were not simply copied." },
      { title: "Make choices with if/then", outcome: "Build or simulate two different outcomes from one condition and record two test cases.", activity: "Make a simple safety quiz or message using an if/else decision. On paper, use a decision diamond and two labelled branches.", evidence: "Decision diagram, two-case test table and saved project, screenshot or teacher-recorded simulation." },
      { title: "Debug, test and improve", outcome: "Locate a deliberate error, describe expected and actual behaviour, make one justified change and retest successfully.", activity: "Use a teacher-supplied broken story or quiz with a missing start event, wrong loop or misplaced block. Complete an expected/actual/change log.", evidence: "Dated Debug Log, before-and-after screenshot or paper simulation, peer-test initials and teacher rubric." },
      { title: "Community message showcase", outcome: "Present a project or paper prototype that combines ordered steps, a loop or condition and a clear message for a named audience.", activity: "Create a 30–90 second animation, quiz or paper prototype about handwashing, road safety, reading, school property or environmental cleanliness.", evidence: "One-page plan, final file or paper prototype, rubric, peer feedback, reflection and local backup or printed screenshot." }
    ],
    sources: [
      { title: "Computing Curriculum for Primary Schools (Basic 4–6), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/COMPUTING-B4-B6.pdf", why: "Official Ghana primary Computing evidence for digital literacy, creativity, communication, problem solving and practical programming such as Scratch." },
      { title: "Computing Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/COMPUTING.pdf", why: "Official Common Core evidence for computational thinking, programming, sequence, selection and iteration." },
      { title: "ICT (JHS 1–3), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/ICT-JHS-1-3.pdf", why: "Supports practical projects, group exercises, homework and teacher-kept evidence." }
    ],
    caveat: "These sources support the skills and pedagogy, but none approves this exact six-session club. It is a teacher-designed optional adaptation, not a compulsory national subject or certificate."
  },
  {
    id: "sewing-clothing-textiles",
    title: "Sewing, Clothing and Textiles",
    tag: "Practical trade",
    icon: "✂",
    age: "Basic 3–Form 3",
    why: "Hand stitches, textile care, simple products, design thinking and ethical enterprise.",
    status: "Teacher-designed optional pathway",
    skills: ["Tool care and textile safety", "Measuring, marking and cutting", "Running stitch, tacking, backstitch and hemming", "Repair and textile care", "Product design and simple costing"],
    safety: ["Supervise every use of needles and scissors; use pre-punched card or blunt needles for younger learners.", "Count needles before and after sessions and store sharps in a labelled container.", "Use clean, dry, non-mouldy fabric scraps. Do not use rotary cutters, flames, chemicals, hot irons or sewing machines in the starter pathway.", "Follow school safeguarding, first-aid, inclusion and permission procedures."],
    sessions: [
      { title: "Materials, tools and safe habits", outcome: "Name or match at least five tools, demonstrate safe handling and return everything to labelled storage.", activity: "Sort fabric, thread, ruler, chalk, scissors, needle and button cards. Practise measuring a 10 cm line and the clean-work-area routine.", evidence: "Tool-sorting checklist, annotated safety drawing, teacher observation and attendance." },
      { title: "First hand stitches", outcome: "Produce a labelled sampler with at least two recognisable stitches and secure starts and ends.", activity: "Practise running stitch and tacking on card or fabric, then add backstitch or overcasting for older learners.", evidence: "Individual dated stitch sampler, teacher checklist and peer feedback." },
      { title: "Measure, mark and prepare", outcome: "Make a template for a small pouch, bookmark or pin cushion with two measurements and an edge or seam line.", activity: "Use a ruler or tape to mark paper or scrap fabric. Older learners add a simple seam allowance and cutting list.", evidence: "Dated template, photograph or paper model, cutting list and teacher sign-off." },
      { title: "Textile care and repair", outcome: "Classify three fabric samples by an observable feature and demonstrate or explain three safe care actions.", activity: "Use care-label pictures and a small water-drop observation. Practise repairing a loose seam or attaching a button to scrap.", evidence: "Fabric-observation table, care card, repaired sample and teacher questioning record." },
      { title: "Make a useful small product", outcome: "Complete a functional hand-sewn article with a joined seam and finished edge, then inspect function, strength and neatness.", activity: "Make a bookmark, drawstring pouch, needle book or small sachet from prepared fabric pieces.", evidence: "Finished tagged article, self-check, before/after photos where authorised and teacher rubric." },
      { title: "Design, cost and explain", outcome: "Present a one-page product folio with a sketch, improvement, material-cost calculation and ethical selling plan.", activity: "Redesign one feature, list materials and sample prices, then give a 30–60 second user-and-price explanation.", evidence: "Design folio, prototype/display, costing sheet, pitch rubric and learner reflection." }
    ],
    sources: [
      { title: "Creative Arts Curriculum for Primary Schools (Basic 4–6), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/06/CREATIVE-ARTS-B4-B6-.pdf", why: "Supports learning through available materials, designing and making, fabric work, sewing, weaving and peer review." },
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Supports workshop safety, measuring, marking, cutting, joining, product design and entrepreneurial skills for B7–B9." },
      { title: "Clothing and Textiles Curriculum for Secondary Education, NaCCA", url: "https://curriculumresources.edu.gh/wp-content/uploads/2025/07/Clothing-and-Textiles-Curriculum.pdf", why: "Supports older learners’ progression in fibres, fabrics, sewing tools, hand stitches, garment care and related careers." }
    ],
    caveat: "The formal sources do not approve this exact club or qualify an ICT teacher as a sewing instructor. Obtain school approval and involve a competent practical-skills teacher or community practitioner when extending beyond beginner hand work."
  },
  {
    id: "visual-creative-arts",
    title: "Visual and Creative Arts",
    tag: "Creative arts",
    icon: "✦",
    age: "KG2–Form 3",
    why: "Drawing, design, print, crafts and respectful observation of Ghanaian visual culture.",
    status: "Teacher-designed optional pathway",
    skills: ["Observation drawing and visual vocabulary", "Pattern, colour and layout", "Printmaking and safe found materials", "Paper, fibre, clay and reused-material craft", "Presentation, labelling and reflection"],
    safety: ["Use child-safe, non-toxic, washable materials. Do not use solvents, spray paint, blades, hot tools, glass or open flames.", "Keep small parts away from KG2 and learners who may choke; count tools and clean surfaces after use.", "Provide ventilation, drying space, floor protection and accessible alternatives.", "Discuss Ghanaian culture respectfully and do not claim meanings that have not been verified."],
    sessions: [
      { title: "Look, notice and draw", outcome: "Produce a dated observation drawing with marks and shapes appropriate to the age band.", activity: "Observe a leaf, cup, calabash, basket or classroom object. Use crayons for younger learners and line, contour or tone for older learners.", evidence: "Dated drawing, observation checklist and one learner explanation." },
      { title: "Pattern and colour from the local environment", outcome: "Create a repeat pattern with at least two shapes and two colours and identify its local inspiration.", activity: "Make safe rubbings or stamps from leaves, bottle caps, cardboard or sponges, then repeat and vary the arrangement.", evidence: "Pattern sheet, inspiration reference and design-choice reflection." },
      { title: "Reuse, model and build", outcome: "Make a stable 2D or 3D object from clean reused materials and name the joining method.", activity: "Fold, roll, slot, model or join card, paper, clay, yarn or fabric scraps without sharp or heated tools.", evidence: "Finished object or photo, process record and teacher safety checklist." },
      { title: "Safe found-object printing", outcome: "Make at least two recognisable prints from a safe stencil, cardboard relief or found-object plate.", activity: "Use washable water-based paint and teacher-prepared plates or stencils. Compare clean and over-inked prints.", evidence: "Two labelled prints, plate photo and process checklist." },
      { title: "Design a useful visual message", outcome: "Produce a visual message for a real school or community audience that a viewer can understand.", activity: "Sketch two options and make a poster, sign or label about handwashing, water, school care or welcoming visitors.", evidence: "Thumbnails, final design, peer readability check and dated display photo where permitted." },
      { title: "Curate, explain and reflect", outcome: "Select work for a small display and describe one process choice and one next step.", activity: "Label a tabletop exhibition and use ‘I notice, I wonder, next time’ feedback.", evidence: "Exhibition inventory, labelled work, display record, reflection and teacher rubric." }
    ],
    sources: [
      { title: "Kindergarten Curriculum for Preschools, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/06/KG-Curriculum.pdf", why: "Supports KG2 exploration of tools, materials, 2D/3D work, patterns and Ghanaian visual culture." },
      { title: "Creative Arts Curriculum for Primary Schools (Basic 1–3), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/06/CREATIVE-ARTS-B1-B3.pdf", why: "Supports drawing, patterns, modelling, print work and local objects." },
      { title: "Creative Arts Curriculum for Primary Schools (Basic 4–6), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/06/CREATIVE-ARTS-B4-B6-.pdf", why: "Supports drawing, painting, printing, crafts, design from local culture and appraisal." },
      { title: "Creative Arts and Design Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/CREATIVE-ARTS-AND-DESIGN.pdf", why: "Supports older learners’ design process, printmaking, weaving, safe tool care, display and appraisal." }
    ],
    caveat: "These official Creative Arts sources support the age progression and skills, but not this exact club. It remains an optional teacher-designed adaptation with school safeguarding and local cultural guidance."
  },
  {
    id: "agriculture-agri-tech",
    title: "Agriculture and Agri-Tech",
    tag: "Food and environment",
    icon: "⌁",
    age: "Basic 2–Form 3",
    why: "School gardening, crop observation, water care, food systems and simple farm records.",
    status: "Teacher-designed optional pathway",
    skills: ["Garden-site observation and crop choice", "Planting, watering and growth records", "Waste sorting, mulch and soil care", "Hygienic harvest thinking", "Paper-first farm records and optional offline ICT"],
    safety: ["Use a teacher-approved site and crop. Keep learners away from roads, drains, electrical equipment, unknown soil and livestock.", "Do not use pesticides, herbicides, powered tools, cutlasses or animal waste in the starter pathway.", "No tasting or distribution of produce until an adult verifies crop identity, cleanliness and food safety.", "Provide gloves or closed shoes, handwashing, shade, water and an emergency procedure."],
    sessions: [
      { title: "Our school garden: observe and plan", outcome: "Contribute to a labelled garden or container-garden map and identify two site constraints.", activity: "Observe sunlight, soil, water access and space in a teacher-approved area. Choose a manageable local crop.", evidence: "Dated site map, crop-choice card, learner roles and teacher observation." },
      { title: "Seeds, soil and first planting", outcome: "Label a container or bed, plant at least three seeds or seedlings and record the date.", activity: "Use clean cups, cartons or a small bed with ordinary soil. Demonstrate spacing, depth and gentle watering.", evidence: "Planting checklist, labelled sketch or photo and germination tally." },
      { title: "Water, soil and useful waste", outcome: "Sort sample materials and demonstrate one way to reduce water loss.", activity: "Sort leaves, paper, plastic and stones; make a plant-material mulch or covered compost demonstration.", evidence: "Sorting chart, dated compost/mulch log and water comparison tally." },
      { title: "Care, measurement and environmental protection", outcome: "Measure one plant on two dates and explain one care practice.", activity: "Count leaves or measure height, remove litter and add safe mulch under supervision.", evidence: "Growth table, observation drawing or photo, care checklist and explanation." },
      { title: "From garden to food", outcome: "Sequence four steps from seed to food and demonstrate handwashing and safe handling.", activity: "Use cards or safe produce to map seed, care, harvest, cleaning/preparation and storage. No tasting is required.", evidence: "Seed-to-plate flow, hygiene checklist and approved harvest/handling log." },
      { title: "The simple farm record and ICT share", outcome: "Complete a one-page record with date, crop, task/input, observation or quantity and next action.", activity: "Use a paper farm-card template. Older learners may enter the same record in an offline spreadsheet.", evidence: "Dated farm card, growth/harvest tally, optional offline file and short group report." }
    ],
    sources: [
      { title: "Agriculture Curriculum, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2025/04/Agriculture-Curriculum.pdf", why: "Supports crop production, school/backyard farming, composting, sustainable agriculture, soil and water conservation and feasible technology." },
      { title: "Science Curriculum, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/SCIENCE.pdf", why: "Supports school gardening, observation, equipment handling, reporting and plant-growth investigation." },
      { title: "Final Skills Directory for the 7 Selected Sectors, CTVET", url: "https://ctvet.gov.gh/wp-content/uploads/2021/03/Final-Skills-Directory-for-the-7-selected-sectors.-For-EBEN-3.pdf", why: "Provides occupational context for sowing, watering, weeding, harvesting, waste handling and farm records." }
    ],
    caveat: "This is a teacher-designed club adaptation, not regulated agricultural training or an official national extracurricular subject. Consult qualified agriculture staff and school leadership for expansion."
  },
  {
    id: "solar-green-skills",
    title: "Solar and Green Skills",
    tag: "Green skills",
    icon: "☼",
    age: "Basic 5–Form 3",
    why: "Energy awareness, simple solar concepts, climate care and safe low-voltage models.",
    status: "Teacher-designed optional pathway",
    skills: ["Renewable and non-renewable energy concepts", "Observation and energy-use tallies", "Safe extra-low-voltage LED circuits", "Resource conservation and waste reduction", "Model design, testing and explanation"],
    safety: ["Use only intact commercially made extra-low-voltage modules. Never use wall sockets, exposed household wiring, inverters or improvised high-voltage circuits.", "Disconnect before rewiring, never short terminals and do not use flames, magnifying lenses or focused sunlight.", "The teacher controls any multimeter and handles damaged batteries or equipment.", "Provide shade and drinking water outdoors; avoid unsafe weather and heat."],
    sessions: [
      { title: "Energy detectives", outcome: "Classify familiar energy examples and give one conservation action.", activity: "Map classroom and community uses such as light, fans, charging, cooking and transport using picture cards.", evidence: "Dated energy map, classification sheet and teacher checklist." },
      { title: "Sunlight, shade and solar concepts", outcome: "Explain that a solar cell changes light energy into electrical energy and record three observations.", activity: "Compare shadows or a small solar module in sun, shade and different angles without focusing sunlight.", evidence: "Observation table, labelled diagram and learner explanation." },
      { title: "A safe solar LED model", outcome: "Assemble or draw a low-voltage solar panel–switch–LED circuit and explain the energy conversion.", activity: "Use a shared commercial panel/module, insulated leads, LED and switch under direct teacher supervision.", evidence: "Circuit diagram, safety checklist and sun/shade result table." },
      { title: "Energy conservation audit", outcome: "Identify three waste behaviours, collect a simple tally and recommend two realistic actions.", activity: "Audit classroom lights, fans, chargers and screens without touching controls without permission.", evidence: "Before/after checklist, raw tally, hand-drawn chart and recommendations." },
      { title: "Climate care through resources and waste", outcome: "Identify two local resource concerns and complete one feasible reduce, reuse or repair action.", activity: "Use a resource walk and clean classroom materials to make an action poster or pledge.", evidence: "Annotated resource map, action display and exit ticket." },
      { title: "A solar-and-green classroom model", outcome: "Build a cardboard model with one low-voltage solar LED feature and three green features, then state a limitation.", activity: "Design a solar-lit classroom, kiosk or household with daylight, shade, ventilation, reuse or water-saving features.", evidence: "Design sketch, final model, light/shade test, circuit diagram, presentation and reflection." }
    ],
    sources: [
      { title: "Science Curriculum for Primary Schools (Basic 4–6), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/SCIENCE-UPPER-PRIMARY-B4-B6.pdf", why: "Supports energy, electricity, conservation, climate change, LED circuits and renewable energy comparisons." },
      { title: "Science Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Science-Curriculum.pdf", why: "Supports energy conversion, environmental impact, practical investigation and simple circuits." },
      { title: "Ghana Renewable Energy Master Plan, Energy Commission", url: "https://energycom.gov.gh/rett/phocadownload/remp/Draft-Renewable-Energy-Masterplan.pdf", why: "Provides Ghana context for solar PV, solar-light applications and technical capacity-building." },
      { title: "Ghana TVET Report, CTVET", url: "https://ctvet.gov.gh/wp-content/uploads/2024/04/GHANA-TVET-REPORT-SECOND-EDITION-2023.pdf", why: "Shows solar and green skills as relevant TVET areas while not approving this school pathway." }
    ],
    caveat: "The sources support energy and green-skills context, not this exact club or technician certification. Keep the pathway introductory, low-voltage and school-risk-assessed."
  },
  {
    id: "electronics-repair",
    title: "Electronics and Repair",
    tag: "Technical skills",
    icon: "⌁",
    age: "Basic 5–Form 3",
    why: "Components, low-voltage circuits, systematic troubleshooting and responsible e-waste decisions.",
    status: "Teacher-designed optional pathway",
    skills: ["Component identification and polarity", "Simple battery–switch–LED circuits", "Low-voltage measurement", "Fault logs and troubleshooting", "E-waste quarantine and approved handoff"],
    safety: ["Battery-powered circuits only, normally 3–5 V. Never connect learner work to mains, chargers, inverters or generators.", "Do not use leaking, swollen, hot or corroded batteries. Disconnect before changing connections.", "Never open, crush, burn or chemically process e-waste; quarantine CRTs, lamps, microwaves, power supplies and damaged batteries.", "Use an authorised school e-waste route and supervise every multimeter use."],
    sessions: [
      { title: "Meet the parts and make a safe workbench", outcome: "Identify at least five low-voltage components, indicate polarity and separate safe parts from hazardous devices.", activity: "Match LEDs, resistors, switches, wires and battery holders to symbols and functions. Create a bench-safety checklist.", evidence: "Component sheet, polarity matching, safety checklist and teacher observation." },
      { title: "Build a first LED circuit", outcome: "Assemble a 3 V switch–resistor–LED circuit and explain open and closed states.", activity: "Use AA cells in a holder, a suitable resistor, LED, switch and insulated leads. No soldering or mains.", evidence: "Circuit diagram, test result and teacher-verified connection." },
      { title: "Observe and measure safely", outcome: "Predict and record whether a low-voltage circuit has power or continuity under direct supervision.", activity: "Use a shared multimeter on a teacher-checked range with known-good batteries, resistors and preassembled circuits.", evidence: "Prediction/measurement table and meter-safety checklist." },
      { title: "Troubleshoot one fault at a time", outcome: "Follow a visual-check, power, polarity, connection, substitution and retest sequence.", activity: "Diagnose a teacher-prepared single fault such as a reversed LED, loose clip, open switch or depleted cell.", evidence: "Fault log with symptom, hypothesis, tests, result and final status." },
      { title: "Repair a modular classroom kit", outcome: "Document and complete a low-risk reconnection or teacher-approved component replacement, then demonstrate two tests.", activity: "Repair a modular battery-powered kit using clip leads or terminal blocks; do not open consumer electronics.", evidence: "Repair ticket, before/after sketch, teacher verification and labelled faulty part." },
      { title: "E-waste safety and responsible handoff", outcome: "Sort example items into safe classroom reuse, teacher quarantine or approved handoff and give two reasons.", activity: "Inspect intact screened examples or photographs without dismantling. Make an item register and hazard poster.", evidence: "Sorting record, poster, chain-of-custody sheet and teacher sign-off." }
    ],
    sources: [
      { title: "Science Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/SCIENCE.pdf", why: "Supports electronic components and a 3 V battery–switch–LED example." },
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Supports practical work, testing, reporting, tool handling, PPE, storage and ventilation." },
      { title: "Hazardous and Electronic Waste Control and Management Act, 2016 (Act 917)", url: "https://faolex.fao.org/docs/pdf/gha205550.pdf", why: "Supports conservative e-waste quarantine, secure storage and environmentally sound disposal." }
    ],
    caveat: "This is not a licence to repair mains appliances or a regulated electronics qualification. Use a competent adult, school risk assessment and an authorised e-waste route."
  },
  {
    id: "technical-drawing-draftsmanship",
    title: "Technical Drawing and Draftsmanship",
    tag: "Technical design",
    icon: "⌗",
    age: "Basic 5–Form 3",
    why: "Measurement, geometric construction, simple views, design briefs and prototype communication.",
    status: "Teacher-designed optional pathway",
    skills: ["Measurement, units and accuracy checks", "Lines, angles and geometric construction", "Simple scale and dimensions", "Front, top and side views", "Design briefs, prototypes and refinement"],
    safety: ["Use pencils, rulers, optional child-safe compasses and scissors. The teacher controls blades, saws, drills, hot glue and powered equipment.", "Cap or close compass points and pass tools safely.", "Use clean recycled card and never measure in traffic, construction areas or unsupervised sites.", "Test paper/card models only with light loads on stable desks."],
    sessions: [
      { title: "Measure, observe and mark out", outcome: "Record dimensions of five familiar objects and make a measured rectangle with a short accuracy check.", activity: "Measure a book, desk, box or bottle with a ruler, tape or checked paper strip. Model zero alignment.", evidence: "Dated measurement table, marked rectangle and teacher checklist." },
      { title: "Lines, angles and geometric construction", outcome: "Complete a plate with labelled lines, parallel/perpendicular lines, a bisected segment or angle, circle and triangle/rectangle.", activity: "Use rulers, paper folding, string, optional compass or cardboard right-angle alternatives.", evidence: "Dated construction plate, peer check and teacher observation." },
      { title: "Proportion, scale and freehand draftsmanship", outcome: "Produce a neat freehand and ruled drawing with a stated scale or proportional rule and four consistent dimensions.", activity: "Measure a small box, organiser or window feature, make a thumbnail then a ruled version.", evidence: "Thumbnail, final drawing, dimension check and learner correction note." },
      { title: "Orthographic ideas", outcome: "Draw aligned front, top and side views of a simple box-shaped object.", activity: "Rotate a carton or box, sketch each face and label which physical face it represents.", evidence: "Three-view sheet, partner matching check and teacher questioning record." },
      { title: "Turn a need into a design brief", outcome: "Write a one-page brief naming user, function, dimensions, material, constraints and three success criteria.", activity: "Choose a book/phone stand, marker holder, cable organiser or desk nameplate and sketch two options.", evidence: "Dated brief, two concept sketches, criteria table and conference note." },
      { title: "Prototype, test and refine", outcome: "Build a paper/card prototype, test two criteria, record a limitation and submit a revised drawing.", activity: "Make a safe stand or organiser, compare with the drawing and alter one line, joint, dimension or view.", evidence: "Final drawing, prototype, test record, reflection and teacher rubric." }
    ],
    sources: [
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Direct support for measuring, marking out, drawing communication, dimensions and design–make–test–evaluate processes." },
      { title: "CTVET: TVET Institutions and Programmes", url: "https://ctvet.gov.gh/tvet-institutions-and-programmes/", why: "Shows recognised Ghana TVET areas such as architectural drafting, building construction and related design fields." },
      { title: "National TVET Qualifications Framework, CTVET", url: "https://ctvet.gov.gh/qualifications-framework/", why: "Explains that club participation can build interest and portfolio habits but is not a CTVET qualification." }
    ],
    caveat: "The cited curriculum directly covers the JHS phase; the Basic 5–6 and Form 1–3 extensions here are teacher-designed adaptations, not official codes or certificates."
  },
  {
    id: "construction-making",
    title: "Construction and Making",
    tag: "Technical design",
    icon: "▰",
    age: "Basic 5–Form 3",
    why: "Materials, structures, safe model building, fair testing and local problem-solving.",
    status: "Teacher-designed optional pathway",
    skills: ["Material properties and selection", "Design briefs and measured sketches", "Base, support, beam, brace and span", "Paper/card joining and modelling", "Controlled testing and improvement"],
    safety: ["Keep every build tabletop and non-load-bearing. Learners must never climb, sit or stand on a model.", "Use clean, dry materials. Exclude broken glass, rusty metal, splintered wood, sharp wire, cement, solvents, fire and dust-producing processes.", "The teacher controls knives, saws, hot glue and powered tools. Use safe scissors, tape, string and PVA.", "Test with small light units such as bottle caps or coins; stop at the first slip, crack or unexpected movement."],
    sessions: [
      { title: "Materials detectives", outcome: "Classify six materials by properties and choose suitable materials for a small model brief.", activity: "Observe clean card, paper, straws, string, sticks, bottle caps and fabric; record stiff/flexible, light/heavy, absorbent/non-absorbent.", evidence: "Dated property chart, selection note and teacher safety observation." },
      { title: "From problem to plan", outcome: "Produce a labelled model sketch with three dimensions, material list and at least three making steps.", activity: "Design a bridge for a toy-sized load or a freestanding desk shelter using a teacher-approved gap or footprint.", evidence: "Design sheet, dimensions, materials list and numbered method." },
      { title: "Structure lab", outcome: "Build and compare two frame forms and support the stability claim with a recorded test result.", activity: "Make a square frame and a braced frame from card, straws or sticks. Add identical light loads one at a time.", evidence: "Two labelled prototypes, stability table and learner comparison." },
      { title: "Safe model build", outcome: "Assemble one stable non-load-bearing model to a plan while following a safety checklist.", activity: "Build a bridge, tower, shelter or truss with teacher-supervised roles for measuring, cutting/folding, assembling and recording.", evidence: "Finished model, role checklist, process photo or build log." },
      { title: "Test, improve and reduce waste", outcome: "Run a fair before/after test, record a weakness, make one justified modification and report whether it improved.", activity: "Keep the gap, loads and method constant. Reinforce a weak joint, twisting member or narrow base.", evidence: "Before/after table, annotated modification, reflection and teacher sign-off." },
      { title: "Explain the build", outcome: "Present the problem, material choices, structure, safety decisions, test result and next improvement using a mini-portfolio.", activity: "Hold a tabletop exhibition with the brief, sketch, property chart, model and test table.", evidence: "Portfolio, presentation rubric, peer feedback and safe clean-up record." }
    ],
    sources: [
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Supports materials, measuring, joining, simple structures, design briefs, making, testing and evaluation." },
      { title: "Creative Arts and Design Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Creative-Arts-and-Designs.pdf", why: "Supports planning, making, feedback, prototypes, display and refinement." },
      { title: "National Pre-tertiary Education Curriculum Framework, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/National-Pre-tertiary-Education-Curriculum-Framework-final.pdf", why: "Supports practical problem solving, learner involvement and localisation with community materials." }
    ],
    caveat: "This is a safe model-making club, not construction-site training or a trade qualification. Obtain local approval and do not introduce workshop tools without a qualified supervisor."
  },
  {
    id: "entrepreneurship-money-skills",
    title: "Entrepreneurship and Money Skills",
    tag: "Enterprise",
    icon: "₵",
    age: "Basic 4–Form 3",
    why: "Needs discovery, value, costing, budgeting, ethical communication and a tiny supervised enterprise simulation.",
    status: "Teacher-designed optional pathway",
    skills: ["Needs discovery and evidence", "Value propositions and prototyping", "Total cost, unit cost and fair pricing", "Budgets, stock and simple reconciliation", "Privacy, consent and ethical selling"],
    safety: ["Do not require learners to contribute money, borrow, invest or absorb business losses.", "Use a closed school audience and teacher-approved non-food, non-chemical, non-electrical starter products or services.", "An adult controls real cash and records. Never collect children’s financial, contact or family information.", "Do not use online marketplaces, mobile-money accounts or private customer messaging."],
    sessions: [
      { title: "Find a real need", outcome: "Record three school/community needs and select one with an evidence-based reason.", activity: "Observe classroom routines or ask a few consenting peers/staff using a paper needs-walk and anonymous tally.", evidence: "Dated need map, question sheet, tally, team decision note and teacher observation." },
      { title: "Turn the need into value", outcome: "Produce a labelled response prototype and explain who it helps and its benefit.", activity: "Design a bookmark, study card, organiser, classroom poster or teacher-approved digital poster template.", evidence: "Sketches, selected-idea criteria, prototype/screenshot and one-minute pitch rubric." },
      { title: "Cost it and choose a fair price", outcome: "Calculate total and unit cost and propose a price with a written reason.", activity: "Use teacher sample prices and paper arithmetic or an offline spreadsheet. No purchase is required.", evidence: "Costing sheet, checking work and teacher accuracy checklist." },
      { title: "Make a budget and keep records", outcome: "Prepare a notional budget, record five simulated transactions and reconcile the balance.", activity: "Use mock money/tokens to record materials, stock, sales and closing balance; adults control real cash.", evidence: "Budget, inventory, ledger, reconciliation, paired checker initials and sign-off." },
      { title: "Sell ethically and promote responsibly", outcome: "Give a truthful pitch or poster with price, limits and a respectful no-pressure approach.", activity: "Role-play seller, customer and observer. Remove personal data and unverified claims from the poster.", evidence: "Final poster/script, ethical-selling rubric and feedback." },
      { title: "Run a tiny enterprise pilot", outcome: "Complete a supervised simulation or approved showcase, record units, income and costs, and state one evidence-based improvement.", activity: "Use a closed classroom audience for low-risk products or an offline service; close stock and accounts with adult checking.", evidence: "Approved plan, inventory, transaction log, adult reconciliation, customer feedback and reflection." }
    ],
    sources: [
      { title: "Computing Curriculum for Primary Schools (Basic 4–6), NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/COMPUTING-B4-B6.pdf", why: "Supports project/group learning, data tables, problem solving, creativity, innovation and responsible ICT use." },
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Includes entrepreneurial skills, opportunity seeking, local enterprise research and micro/small enterprise concepts." },
      { title: "Financial Literacy Education Campaign, Ministry of Finance Ghana", url: "https://mofep.gov.gh/news-and-events/2023-08-29/financial-literacy-education-campaign-to-ignite-responsiveness-of-consumers-held", why: "Supports age-appropriate resource management, informed decisions and risk awareness." }
    ],
    caveat: "This is an educational simulation or school-approved pilot, not a licence for children to run independent businesses. Follow school finance, safeguarding, procurement and consent rules."
  },
  {
    id: "communication-languages",
    title: "Communication and Languages",
    tag: "Life skills",
    icon: "Aa",
    age: "KG2–Form 3",
    why: "Listening, speaking, reading, local-language confidence, presentation and careful introductory translation.",
    status: "Teacher-designed optional pathway",
    skills: ["Active listening and turn-taking", "Speaking, vocabulary and respectful feedback", "Story retelling and reading comprehension", "Directions and short presentations", "Meaning-focused bilingual translation"],
    safety: ["Do not shame accents, dialects, pronunciation or translation errors. Use supportive modelling.", "Do not require disclosure of home identity or a language a child does not wish to use.", "Use fictional or public classroom messages, not personal, medical, legal or confidential information.", "Have a fluent, trusted speaker check local-language wording before presenting it as correct."],
    sessions: [
      { title: "Listen, respond and take turns", outcome: "Follow age-appropriate instructions, answer a question and take conversational turns.", activity: "Use action cards in English and a locally used Ghanaian language; rotate speaker and listener roles.", evidence: "Dated observation checklist and teacher instruction cards." },
      { title: "Picture-to-print story retell", outcome: "Sequence pictures and retell a three-part story; older learners give a one-sentence summary.", activity: "Arrange picture cards from a familiar story and retell in a comfortable language before adding English vocabulary.", evidence: "Dated sequence or mini-book and retell rubric." },
      { title: "My language, my words", outcome: "Contribute, explain and use five respectful everyday words or phrases.", activity: "Build a class word wall with greetings, objects, numbers, food or places. A fluent speaker checks meaning and tone.", evidence: "Dated bilingual list, checker initials and matching sheet or dialogue." },
      { title: "Hear it, read it, find it", outcome: "Give or follow directions with landmarks and restate a short announcement accurately.", activity: "Use a hand-drawn classroom/community map with counters, then read a teacher-made notice.", evidence: "Labelled map, direction checklist and keyword slip." },
      { title: "Small-group presentation", outcome: "Give an age-appropriate presentation with a clear beginning, relevant points, audible speech and audience response.", activity: "Plan and rehearse a local place, story, healthy habit, craft or school rule using a paper cue card.", evidence: "Plan, cue card, rubric, peer feedback and attendance." },
      { title: "Bilingual meaning-makers", outcome: "Translate familiar classroom/community messages while preserving meaning and flagging uncertainty for checking.", activity: "Translate short welcome, direction, safety or library notices and explain one translation choice.", evidence: "Original and translated cards, checker/date, meaning rubric and reflection." }
    ],
    sources: [
      { title: "English Language Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/English-Language.pdf", why: "Supports listening, speaking, reading, directions, questioning, presentation and integrated language skills." },
      { title: "Ghanaian Language Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/GHANAIAN-LANGUAGE.pdf", why: "Supports first-language confidence, oral communication, reading, cultural values and communicative competence." },
      { title: "Kindergarten Curriculum for Preschools, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/06/KG-Curriculum.pdf", why: "Supports storytelling, role play, bilingual environments, instructions and oral-language confidence." }
    ],
    caveat: "This is not a language qualification or a replacement for language specialists. Confirm local language choices and have fluent speakers validate content."
  },
  {
    id: "home-economics-food",
    title: "Home Economics, Food and Nutrition",
    tag: "Life skills",
    icon: "⌂",
    age: "Basic 3–Form 3",
    why: "Hygiene, local food knowledge, safe preparation theory, household resources and no-heat practical work.",
    status: "Teacher-designed optional pathway",
    skills: ["Handwashing and food hygiene", "Broad food groups and balanced choices", "Safe preparation sequencing", "Storage, spoilage and waste", "Budgeting and supervised no-cook assembly"],
    safety: ["Use potable water and clean surfaces; check allergies, dietary needs and cultural restrictions. Tasting is optional and never forced.", "Learners do not use flames, hot liquids, electrical appliances or sharp knives in the starter pathway.", "Do not taste or smell spoiled food. Keep raw and ready-to-eat items separate and food covered.", "Follow school health, emergency, safeguarding and first-aid procedures."],
    sessions: [
      { title: "Clean hands, clean work", outcome: "Perform handwashing in order and name at least three food-hygiene rules.", activity: "Use picture hazards and a handwashing station with soap and potable water. Make a before/during/after poster.", evidence: "Dated safety briefing, handwashing checklist, poster and reflection." },
      { title: "Local foods and a balanced plate", outcome: "Classify six foods or pictures and assemble a varied plate or snack plan.", activity: "Sort local food cards into broad groups and discuss variety, colour, availability and budget without medical claims.", evidence: "Classification sheet, plate plan, presentation and exit ticket." },
      { title: "From plan to safe procedure", outcome: "Order the stages of a food task and identify adult-supervised tools or actions.", activity: "Create a flowchart for a no-cook snack or teacher demonstration using cups/spoons and clean bowls.", evidence: "Flowchart, measurement record and hazard checklist." },
      { title: "Safe storage and spoilage", outcome: "Label and place example foods in a dry, covered storage simulation and distinguish spoilage warnings.", activity: "Use clean packages or pictures to practise labelling, covering and first-in/first-out without smelling questionable food.", evidence: "Labels, storage diagram and hazard worksheet." },
      { title: "Household resources on a small budget", outcome: "Prepare a feasible meal/snack plan within a mock budget and justify two choices.", activity: "Use fictional local prices and paper arithmetic or an offline spreadsheet. Discuss needs, time, water, fuel and waste.", evidence: "Budget sheet, shopping list, revised plan and team presentation." },
      { title: "Prepare, serve and evaluate", outcome: "Complete a supervised role in hygiene, measuring, no-cook assembly or safe serving and record whether criteria were met.", activity: "Use an allergy-checked no-cook option or dry simulation. Clean the work station and evaluate hygiene, nutrition, cost and waste.", evidence: "Capstone plan, practical checklist, clean-up log, optional product record and reflection." }
    ],
    sources: [
      { title: "Career Technology Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2022/10/Career-Technology.pdf", why: "Supports personal hygiene, food hygiene, safe storage, food-laboratory safety and kitchen essentials." },
      { title: "Food and Nutrition Curriculum for Secondary Education, NaCCA", url: "https://curriculumresources.edu.gh/wp-content/uploads/2025/07/Food-and-Nutrition-Curriculum.pdf", why: "Supports food-laboratory hygiene, balanced meals, hygienic serving and experiential learning for older learners." },
      { title: "Code of Hygienic Practice for Food Service Establishments, Ghana FDA", url: "https://fdaghana.gov.gh/code-of-practice-for-food-service-establishments/", why: "Supports potable water, handwashing, clean/covered food, hair restraint and waste control." }
    ],
    caveat: "This is an optional theory and low-risk practical adaptation, not a food-service certificate or formal Home Economics course. Obtain school approval and adapt to facilities and allergies."
  },
  {
    id: "health-safety-citizenship",
    title: "Health, Safety and Citizenship",
    tag: "Life skills",
    icon: "♡",
    age: "KG2–Form 3",
    why: "First-aid awareness, personal safety, digital citizenship, teamwork and supervised community service.",
    status: "Teacher-designed optional pathway",
    skills: ["Hazard spotting and help-seeking", "Age-appropriate first-aid awareness", "Hygiene, boundaries and trusted-adult reporting", "Privacy and respectful digital citizenship", "Team roles and community action"],
    safety: ["This is first-aid awareness, not certification. Only trained/authorised adults respond to real injuries under school procedure.", "Use fictional scenarios and clean props; never practise CPR, choking manoeuvres, medicines or invasive treatment on learners.", "Protect confidentiality and dignity. Do not force disclosure or investigate safeguarding concerns in the club.", "No unsupervised road crossing, water activity, climbing, chemicals, exposed electricity or off-site service."],
    sessions: [
      { title: "Notice danger and get help", outcome: "Identify three hazards, give a safer alternative and name a trusted school contact.", activity: "Use picture cards or a supervised classroom walk to mark wet floors, exposed wires, blocked exits or unsafe movement.", evidence: "Annotated map, observation checklist and exit drawing or sentence." },
      { title: "First-aid awareness", outcome: "Sequence scene safety, adult help, self-protection and the school procedure for a fictional minor-injury scenario.", activity: "Use clean cloth, water, soap and an empty first-aid box as props. Invite a qualified trainer for live instruction if available.", evidence: "Sequencing sheet, teacher checklist and first-aid-box inventory drawing." },
      { title: "Personal safety and boundaries", outcome: "Sort everyday scenarios, demonstrate hygiene and state that unsafe situations should be reported to a trusted adult.", activity: "Use picture cards, handwashing and non-contact role play about safe movement, saying no and help-seeking.", evidence: "Scenario sort, handwashing checklist and confidential trusted-help plan." },
      { title: "Digital citizenship without risky logins", outcome: "Classify fictional online situations and produce a respectful message with no private information.", activity: "Use dummy cards for privacy, cyberbullying and reporting; practise stop, save evidence if safe, block/report and tell an adult.", evidence: "Safe/unsafe rubric, rewritten fictional message and digital-safety poster." },
      { title: "Teamwork and a small service plan", outcome: "Make a supervised plan with named roles, purpose, materials, hazards, adult supervisor and success measure.", activity: "Plan a safety sign, class safety corner, tidy area or handwashing message using paper and tape.", evidence: "Dated plan, role card, collaboration rubric and draft product." },
      { title: "Supervised action and safety showcase", outcome: "Complete an approved low-risk action, record one observable improvement and communicate a safety message.", activity: "Display signs, organise a safety corner or tidy a defined area with hand tools under adult supervision.", evidence: "Service log, before/after checklist, team product, individual reflection and teacher sign-off." }
    ],
    sources: [
      { title: "Computing Common Core Programme, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/COMPUTING.pdf", why: "Supports responsible citizenship, ICT ethics, information security, cyberbullying, digital footprints and reporting." },
      { title: "Career Technology K–9 Curriculum, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2023/06/Career-Technology-k-9-3rd-Aug.08.2021.pdf", why: "Supports health and safety, accident prevention and carefully adapted first-aid awareness." },
      { title: "National Pre-tertiary Education Curriculum Framework, NaCCA", url: "https://nacca.gov.gh/wp-content/uploads/2019/04/National-Pre-tertiary-Education-Curriculum-Framework-final.pdf", why: "Supports communication, collaboration, citizenship, personal development and extracurricular community projects." }
    ],
    caveat: "This pathway does not replace the school’s safeguarding, health service or qualified first-aid provider. It is optional awareness and community-service practice."
  }
];
