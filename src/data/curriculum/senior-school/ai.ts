import type { StrandInfo, SubStrandInfo } from "../types";

/**
 * AI (Artificial General Intelligence) Learning Area
 * Kenyan CBE-aligned design, Grades 4-12.
 *
 * Sources blended into this design:
 *  - "A Strategic Framework for an AI Education Model in the Kenyan CBE" (Daniel Wachira)
 *  - UNESCO AI Competency Framework for Students (2024): human-centred mindset,
 *    ethics of AI, AI techniques and applications, AI system design x
 *    Understand / Apply / Create progression levels.
 *  - China MOE "Guide to General AI Education in Primary and Secondary Schools (2025)":
 *    tiered progression — primary = experience, junior = technical logic,
 *    senior = model building, systems thinking and social responsibility.
 *
 * Every sub-strand carries official-style learning outcomes written in the rigid
 * KSA order required by this project: a) Knowledge, b) Skills, c) Attitudes.
 */

const STRAND_NAMES = [
  "1.0 Foundations of Intelligence",
  "2.0 Data and Representation",
  "3.0 AI Techniques and Programming",
  "4.0 AI System Design and Projects",
  "5.0 Ethics, Society and AI Policy",
] as const;

function ss(
  name: string,
  lessons: number,
  keyInquiryQuestion: string,
  learningOutcomes: string[],
  suggestedExperiences: string[],
): SubStrandInfo {
  return { name, lessons, keyInquiryQuestion, learningOutcomes, suggestedExperiences };
}

function build(subs: SubStrandInfo[][]): StrandInfo[] {
  return STRAND_NAMES.map((name, i) => ({ name, subStrands: subs[i] }));
}

// ─────────────────────────────────────────────────────────────
// UPPER PRIMARY (Grades 4-6) — 3 lessons/week, 99 lessons
// Emphasis: recognising AI around us, data basics, safe and honest use
// ─────────────────────────────────────────────────────────────

export const grade4AI: StrandInfo[] = build([
  [
    ss("1.1 What is Intelligence?", 5, "How do we know that something is intelligent?", [
      "identify examples of intelligent behaviour in people, animals and machines",
      "sort everyday objects into those that are intelligent and those that are not",
      "appreciate the intelligence found in living things and in machines",
    ], [
      "Learners name intelligent things they see at home and in school",
      "Learners sort picture cards of objects into intelligent and not intelligent",
      "Learners discuss in groups why they placed each card where they did",
    ]),
    ss("1.2 Machines that Help Us", 5, "Which machines around us behave as if they can think?", [
      "name machines in the home and community that appear to think",
      "demonstrate how a simple smart device responds to an instruction",
      "appreciate the help machines give to people in daily life",
    ], [
      "Learners name smart devices such as phones, calculators and remote controls",
      "Learners give voice instructions to a phone assistant and observe the reply",
      "Learners draw and label a machine that helps their family",
    ]),
    ss("1.3 People and Machines", 5, "What can people do that machines cannot?", [
      "state things that people can do but machines cannot do",
      "compare a task done by a person with the same task done by a machine",
      "value the special abilities that people have",
    ], [
      "Learners list tasks such as caring, feeling and imagining",
      "Learners race a calculator against mental arithmetic and record results",
      "Learners role-play a person and a machine doing the same job",
    ]),
  ],
  [
    ss("2.1 Meaning of Data", 6, "What is data and where do we find it?", [
      "define data in simple terms",
      "collect simple data about the class such as age, height or favourite fruit",
      "appreciate the usefulness of data in making decisions",
    ], [
      "Learners name types of data found in school records",
      "Learners collect data from classmates using a tally sheet",
      "Learners present their tally sheets to the class",
    ]),
    ss("2.2 Sorting and Grouping Data", 6, "Why do we group things that are alike?", [
      "explain why data is grouped",
      "sort collected data into groups using a chosen rule",
      "show care when handling information about other people",
    ], [
      "Learners sort bottle tops, leaves or cards by colour, size and shape",
      "Learners group class data into tables",
      "Learners discuss why we do not share other people's personal details",
    ]),
    ss("2.3 Pictures and Labels", 6, "How do machines learn to tell pictures apart?", [
      "describe how labels help a machine recognise a picture",
      "label a set of pictures correctly for a machine to use",
      "value accuracy when labelling information",
    ], [
      "Learners label printed pictures of animals and objects",
      "Learners feed labelled pictures into a free image-training tool and test it",
      "Learners discuss what happens when a label is wrong",
    ]),
  ],
  [
    ss("3.1 Giving Clear Instructions", 6, "Why must instructions to a machine be clear?", [
      "explain why machines need clear and ordered instructions",
      "practice writing a step-by-step instruction for a simple task",
      "appreciate the value of clear communication",
    ], [
      "Learners guide a blindfolded partner across the room using words only",
      "Learners write steps for washing hands and test them on a classmate",
      "Learners correct instructions that gave a wrong result",
    ]),
    ss("3.2 Block-based Programming", 6, "How can we make a computer follow our plan?", [
      "identify the parts of a block-based programming screen",
      "construct a simple animation or quiz using blocks",
      "show patience when a program does not work at first",
    ], [
      "Learners explore Scratch or a similar offline block tool",
      "Learners build a short animation of a Kenyan story",
      "Learners fix errors in each other's projects",
    ]),
    ss("3.3 Teaching a Machine", 6, "Can a machine learn from examples we give it?", [
      "describe how a machine learns from examples",
      "practice training a simple image or sound model using examples",
      "appreciate the effort needed to teach a machine well",
    ], [
      "Learners train a Teachable Machine model with two picture classes",
      "Learners test the model with new pictures and record the results",
      "Learners add more examples and observe the improvement",
    ]),
  ],
  [
    ss("4.1 Finding a Problem to Solve", 5, "Which problem in our school could a smart tool help with?", [
      "identify a problem in the school or home that a smart tool could help solve",
      "suggest a simple smart solution to the chosen problem",
      "value teamwork in solving problems",
    ], [
      "Learners walk around the school and list problems they notice",
      "Learners choose one problem in groups and suggest a solution",
      "Learners present their chosen problem to the class",
    ]),
    ss("4.2 Building a Simple Project", 5, "How do we turn an idea into a working project?", [
      "outline the steps of making a simple digital project",
      "construct a simple project using blocks or a training tool",
      "show persistence while building a project",
    ], [
      "Learners plan their project on paper first",
      "Learners build the project using a block tool",
      "Learners keep a simple record of changes they make",
    ]),
    ss("4.3 Testing and Sharing", 5, "How do we know our project works well?", [
      "describe how a project is tested",
      "demonstrate their finished project to an audience",
      "appreciate feedback from others",
    ], [
      "Learners test each other's projects and note problems",
      "Learners improve their project using the feedback",
      "Learners display projects at a class exhibition",
    ]),
  ],
  [
    ss("5.1 Safe Use of Smart Tools", 8, "How do we stay safe when using smart tools?", [
      "state rules for using smart devices safely",
      "demonstrate safe behaviour when using a digital device",
      "show responsibility when using smart tools",
    ], [
      "Learners make a class charter for safe device use",
      "Learners role-play safe and unsafe online situations",
      "Learners share the charter with other classes",
    ]),
    ss("5.2 Privacy and Personal Information", 8, "Why should we protect our personal information?", [
      "identify information that should be kept private",
      "sort information into private and public",
      "value the privacy of themselves and others",
    ], [
      "Learners sort cards showing names, photos, passwords and hobbies",
      "Learners discuss what a stranger could do with private details",
      "Learners create posters about protecting personal information",
    ]),
    ss("5.3 Honesty when Using AI", 8, "Is it fair to say that work done by a machine is ours?", [
      "explain what honesty means when a smart tool helps with schoolwork",
      "demonstrate how to state where help came from",
      "commit to honesty in their own work",
    ], [
      "Learners discuss cases where a tool did the work for a learner",
      "Learners practice writing a short note showing what help they used",
      "Learners agree on a class honesty pledge",
    ]),
    ss("5.4 Class AI Project Showcase", 9, "How can our smart project help our community?", [
      "describe how their project helps the community",
      "demonstrate the completed project to parents or other classes",
      "appreciate the contribution of every group member",
    ], [
      "Learners refine their project for display",
      "Learners prepare a short spoken presentation",
      "Learners hold a showcase and collect visitor comments",
    ]),
  ],
]);

export const grade5AI: StrandInfo[] = build([
  [
    ss("1.1 History of Thinking Machines", 5, "How did thinking machines begin?", [
      "outline key milestones in the growth of thinking machines",
      "arrange milestones of AI development in order of time",
      "appreciate the work of people who built early machines",
    ], [
      "Learners study a picture timeline of computing and AI",
      "Learners arrange milestone cards on a class timeline",
      "Learners discuss which milestone changed life the most",
    ]),
    ss("1.2 AI in Kenyan Daily Life", 5, "Where is AI already working in Kenya?", [
      "identify uses of AI in Kenyan farming, banking, health and transport",
      "record examples of AI they meet in their community",
      "value the role of AI in national development",
    ], [
      "Learners list AI uses such as mobile money fraud checks and crop apps",
      "Learners interview a family member about smart services they use",
      "Learners report their findings in groups",
    ]),
    ss("1.3 Kinds of Intelligent Systems", 5, "Are all intelligent machines the same?", [
      "classify intelligent systems as rule-following or example-learning",
      "sort examples of systems into the two kinds",
      "appreciate the variety of intelligent systems",
    ], [
      "Learners study a calculator and a photo-tagging app",
      "Learners sort system cards into rule-based and learning",
      "Learners explain their sorting to another group",
    ]),
  ],
  [
    ss("2.1 Collecting Good Data", 6, "What makes data good enough to use?", [
      "explain the qualities of good data",
      "collect data using an agreed method and record it neatly",
      "value accuracy in collecting information",
    ], [
      "Learners design a simple survey form",
      "Learners collect weather or attendance data for a week",
      "Learners check each other's records for mistakes",
    ]),
    ss("2.2 Cleaning Data", 6, "What do we do with data that has errors?", [
      "describe common errors found in data",
      "practice removing errors and repeated entries from a data set",
      "show care and patience when working with data",
    ], [
      "Learners receive a messy data table and mark the errors",
      "Learners correct the table in a spreadsheet",
      "Learners compare the messy and clean tables",
    ]),
    ss("2.3 Reading Data in Charts", 6, "What story does our data tell?", [
      "explain what a chart shows about a set of data",
      "construct a bar chart or picture chart from collected data",
      "appreciate the power of data in telling a true story",
    ], [
      "Learners draw bar charts of class data by hand",
      "Learners create the same chart in a spreadsheet",
      "Learners write one sentence describing what the chart shows",
    ]),
  ],
  [
    ss("3.1 Rules and Decisions", 6, "How can a machine make a decision?", [
      "explain how a rule leads a machine to a decision",
      "construct a decision tree for a familiar choice",
      "appreciate logical thinking in daily decisions",
    ], [
      "Learners build a decision tree for choosing what to wear",
      "Learners test the tree on classmates",
      "Learners improve rules that gave a wrong answer",
    ]),
    ss("3.2 Programming with Conditions", 6, "How does a program choose between two paths?", [
      "identify conditional blocks in a programming tool",
      "construct a program that uses a condition to choose an action",
      "show determination when correcting program errors",
    ], [
      "Learners build a quiz that responds differently to right and wrong answers",
      "Learners add a score counter to the quiz",
      "Learners test and debug the quiz in pairs",
    ]),
    ss("3.3 Training and Testing a Model", 6, "Why must we test a model with new examples?", [
      "explain why a model is tested with examples it has not seen",
      "practice training and testing a simple classifier",
      "value fairness in judging how well a model works",
    ], [
      "Learners train a sound or image classifier with three classes",
      "Learners set aside test examples before training",
      "Learners record how many test examples were classified correctly",
    ]),
  ],
  [
    ss("4.1 Planning an AI Solution", 5, "Who is our project for and what do they need?", [
      "identify the user and the need that a project will serve",
      "suggest a design for a project that meets the identified need",
      "value listening to the people a project is meant to help",
    ], [
      "Learners interview a potential user about their need",
      "Learners write a short plan naming the user, need and idea",
      "Learners present plans for peer comment",
    ]),
    ss("4.2 Building and Improving", 5, "How do we make our project better each time?", [
      "describe the cycle of building, testing and improving",
      "construct a working version of the planned project",
      "show openness to changing their work after testing",
    ], [
      "Learners build a first version of the project",
      "Learners test it with a real user and note problems",
      "Learners make one improvement and test again",
    ]),
    ss("4.3 Presenting the Solution", 5, "How do we explain our project to others?", [
      "outline the parts of a clear project presentation",
      "demonstrate the project and explain how it works",
      "appreciate the ideas of other groups",
    ], [
      "Learners prepare a short poster about the project",
      "Learners present to the class within a time limit",
      "Learners give positive comments on other projects",
    ]),
  ],
  [
    ss("5.1 Fairness in AI", 8, "Can a machine treat people unfairly?", [
      "explain how a machine can treat some people unfairly",
      "identify unfair results in a simple model they have trained",
      "value fair treatment of all people",
    ], [
      "Learners train a model using examples from only one group",
      "Learners test it on a different group and record the results",
      "Learners discuss how to make the examples fairer",
    ]),
    ss("5.2 AI and Our Jobs", 8, "How will smart machines change work in Kenya?", [
      "identify jobs that smart machines are changing in Kenya",
      "interpret information about changing jobs in their community",
      "appreciate the need to keep learning new skills",
    ], [
      "Learners interview workers about changes brought by technology",
      "Learners group jobs into changing, growing and reducing",
      "Learners discuss skills they will need in future",
    ]),
    ss("5.3 Protecting Our Information", 8, "Who should be allowed to keep our information?", [
      "state basic rights people have over their own information",
      "demonstrate how to set a strong password and privacy setting",
      "commit to protecting their own and other people's information",
    ], [
      "Learners study simplified rights from the Kenyan data protection law",
      "Learners practice creating strong passwords",
      "Learners create a class guide on protecting information",
    ]),
    ss("5.4 Community AI Challenge", 9, "How can our class use AI to serve our community?", [
      "describe a community problem their project addresses",
      "construct and present a project that responds to the problem",
      "show commitment to serving their community",
    ], [
      "Learners select a community problem in groups",
      "Learners build and test their solution over several lessons",
      "Learners present the project to the school community",
    ]),
  ],
]);

export const grade6AI: StrandInfo[] = build([
  [
    ss("1.1 How Machines Sense the World", 5, "How does a machine take in information?", [
      "identify sensors used by intelligent machines",
      "demonstrate how a sensor input changes a machine's response",
      "appreciate the link between sensing and intelligent action",
    ], [
      "Learners examine cameras, microphones and light sensors",
      "Learners use a phone sensor app and record readings",
      "Learners match sensors to intelligent devices that use them",
    ]),
    ss("1.2 Narrow and General Intelligence", 5, "Can one machine do everything a person can do?", [
      "explain the difference between narrow AI and general intelligence",
      "classify given systems as narrow or general",
      "appreciate the limits of present-day machines",
    ], [
      "Learners test a chatbot on tasks outside its purpose",
      "Learners sort system cards into narrow and general",
      "Learners debate whether a general machine is possible",
    ]),
    ss("1.3 AI and Other Learning Areas", 5, "How does AI connect with our other subjects?", [
      "identify links between AI and mathematics, science and languages",
      "use an AI tool to support learning in another subject",
      "value the usefulness of AI across learning areas",
    ], [
      "Learners use a translation tool in a Kiswahili lesson",
      "Learners use a graphing tool in a mathematics task",
      "Learners record which tool helped most and why",
    ]),
  ],
  [
    ss("2.1 Structured and Unstructured Data", 6, "Is all data stored in the same way?", [
      "classify data as structured or unstructured",
      "sort samples of data into the two types",
      "appreciate the variety of data used by machines",
    ], [
      "Learners examine tables, photographs, sound clips and messages",
      "Learners sort data samples into two groups",
      "Learners explain the difference in their own words",
    ]),
    ss("2.2 Bias in Data", 6, "Whose voices are missing from our data?", [
      "explain how missing groups create bias in data",
      "examine a data set and identify groups that are missing",
      "value the inclusion of all groups in data",
    ], [
      "Learners study a class data set that excludes some learners",
      "Learners predict the effect of the missing group",
      "Learners collect extra data to fix the gap",
    ]),
    ss("2.3 Representing Knowledge", 6, "How can facts be written so a machine can use them?", [
      "describe how facts and relationships can be written for a machine",
      "construct a simple knowledge map of a familiar topic",
      "appreciate orderly thinking in organising knowledge",
    ], [
      "Learners draw concept maps linking facts about a topic",
      "Learners write facts as simple statements such as 'a cow is an animal'",
      "Learners use their statements to answer questions",
    ]),
  ],
  [
    ss("3.1 Pattern Recognition", 6, "How does a machine notice a pattern?", [
      "explain how patterns help a machine make predictions",
      "identify patterns in a set of numbers, pictures or sounds",
      "appreciate patterns found in the world around them",
    ], [
      "Learners complete pattern puzzles in groups",
      "Learners feed patterned data into a training tool",
      "Learners predict what the tool will answer before testing",
    ]),
    ss("3.2 Programming with Loops and Lists", 6, "How can a program handle many items at once?", [
      "identify loops and lists in a programming tool",
      "construct a program that processes a list of items using a loop",
      "show persistence in debugging their programs",
    ], [
      "Learners build a program that reads a list of class names",
      "Learners add a loop to repeat an action for each name",
      "Learners test the program with a longer list",
    ]),
    ss("3.3 Chatbots and Language Tools", 6, "How does a machine understand what we type?", [
      "describe how a chatbot responds to typed words",
      "construct a simple rule-based chatbot",
      "value careful and respectful communication with AI tools",
    ], [
      "Learners plan chatbot questions and answers on paper",
      "Learners build the chatbot in a block tool",
      "Learners test the chatbot with unexpected questions",
    ]),
  ],
  [
    ss("4.1 Defining the Problem", 5, "What exactly are we trying to solve?", [
      "state a project problem clearly in one sentence",
      "interpret user needs into a clear project goal",
      "value clarity before starting work",
    ], [
      "Learners write and rewrite their problem statement",
      "Learners test the statement with another group",
      "Learners agree on a final goal for the project",
    ]),
    ss("4.2 Designing and Building", 5, "How do we build what we planned?", [
      "outline the design of their intended solution",
      "construct the solution using an AI or programming tool",
      "show teamwork while building the solution",
    ], [
      "Learners draw a design sketch before building",
      "Learners share building roles within the group",
      "Learners keep a build log of each session",
    ]),
    ss("4.3 Evaluating the Solution", 5, "Did our solution actually solve the problem?", [
      "explain criteria for judging whether a solution works",
      "interpret test results against the project goal",
      "appreciate honest judgement of their own work",
    ], [
      "Learners write success criteria before testing",
      "Learners test the solution with real users",
      "Learners write an honest evaluation of the results",
    ]),
  ],
  [
    ss("5.1 Truth and False Information", 8, "How can we tell if something online is real?", [
      "explain how AI can create false pictures, voices and text",
      "examine online items and identify signs that they are false",
      "commit to sharing only information they have checked",
    ], [
      "Learners compare real and AI-generated images",
      "Learners list clues that reveal generated content",
      "Learners create a checking checklist for the class",
    ]),
    ss("5.2 Human-Centred AI", 8, "Should a machine ever decide for a person?", [
      "explain what it means to keep people at the centre of AI use",
      "examine cases where a machine decision affects a person",
      "value human dignity in the use of technology",
    ], [
      "Learners study cases such as automated school admission",
      "Learners role-play affected people and decision makers",
      "Learners agree on when a human must decide",
    ]),
    ss("5.3 AI and the Environment", 8, "What does running AI cost our planet?", [
      "describe the energy and material costs of running AI systems",
      "interpret simple data on energy used by digital devices",
      "value responsible use of energy and devices",
    ], [
      "Learners read simplified figures on data centre energy use",
      "Learners audit device use in their own school",
      "Learners suggest ways to reduce waste",
    ]),
    ss("5.4 Transition Capstone Project", 9, "What have we learnt that we can now build alone?", [
      "outline all the stages of their capstone project",
      "construct and evaluate a complete AI project",
      "show pride and responsibility in completed work",
    ], [
      "Learners choose a capstone theme independently",
      "Learners build, test and document the project",
      "Learners present the project portfolio for assessment",
    ]),
  ],
]);

// ─────────────────────────────────────────────────────────────
// JUNIOR SCHOOL (Grades 7-9) — 3 lessons/week, 99 lessons
// Emphasis: how machines learn, data handling, project work, bias and ethics
// ─────────────────────────────────────────────────────────────

export const grade7AI: StrandInfo[] = build([
  [
    ss("1.1 Defining Artificial Intelligence", 5, "What makes a system artificially intelligent?", [
      "define artificial intelligence and its main branches",
      "classify given systems into the branches of AI",
      "appreciate the scope of artificial intelligence as a field",
    ], [
      "Learners research definitions of AI from different sources",
      "Learners map systems onto branches such as vision, language and robotics",
      "Learners defend their classification in a class discussion",
    ]),
    ss("1.2 Symbolic and Connectionist Approaches", 5, "Do machines reason with rules or with examples?", [
      "explain the difference between rule-based and learning-based AI",
      "compare a rule-based system with a learning system on the same task",
      "appreciate that different problems need different approaches",
    ], [
      "Learners build a rule-based spam filter on paper",
      "Learners test a trained spam classifier on the same messages",
      "Learners record where each approach succeeded or failed",
    ]),
    ss("1.3 The Road Towards General Intelligence", 5, "How far are we from a machine that can learn anything?", [
      "outline what artificial general intelligence would require",
      "compare current systems against the requirements of general intelligence",
      "value realistic thinking about technology claims",
    ], [
      "Learners read a short article on AI research",
      "Learners build a comparison table of current AI against AI goals",
      "Learners debate timelines claimed in the media",
    ]),
  ],
  [
    ss("2.1 The Data Life Cycle", 6, "What happens to data from collection to use?", [
      "outline the stages of the data life cycle",
      "conduct a small data collection following the life cycle",
      "value integrity at every stage of handling data",
    ], [
      "Learners map the stages from collection to storage to use",
      "Learners collect a class data set following each stage",
      "Learners document what they did at each stage",
    ]),
    ss("2.2 Data Cleaning and Preparation", 6, "Why is most of AI work actually data work?", [
      "explain why data must be prepared before training",
      "practice cleaning, formatting and splitting a data set",
      "show diligence in preparing data carefully",
    ], [
      "Learners clean a supplied messy spreadsheet",
      "Learners split data into training and testing portions",
      "Learners compare model results before and after cleaning",
    ]),
    ss("2.3 Labelling and Annotation", 6, "Who decides what a label means?", [
      "describe how labelling guidelines affect a trained model",
      "practice labelling a shared data set using agreed guidelines",
      "value consistency and honesty when labelling",
    ], [
      "Learners write labelling guidelines as a class",
      "Learners label the same images independently and compare",
      "Learners resolve disagreements and refine the guidelines",
    ]),
  ],
  [
    ss("3.1 Supervised Learning", 6, "How does a machine learn from labelled examples?", [
      "explain the process of supervised learning",
      "practice training a classifier on a labelled data set",
      "appreciate the role of good examples in learning",
    ], [
      "Learners train a classifier using a prepared data set",
      "Learners record accuracy at different training sizes",
      "Learners plot accuracy against number of examples",
    ]),
    ss("3.2 Introduction to Text Programming", 6, "How is text programming different from blocks?", [
      "identify the basic elements of a text-based program",
      "construct short text-based programs using variables and conditions",
      "show perseverance when handling syntax errors",
    ], [
      "Learners translate a block program into text code",
      "Learners write programs that take input and give output",
      "Learners debug error messages in pairs",
    ]),
    ss("3.3 Evaluating a Model", 6, "How do we measure whether a model is good?", [
      "explain accuracy and error in a trained model",
      "interpret the results of a model test",
      "value honest reporting of model performance",
    ], [
      "Learners test a model on unseen data",
      "Learners build a simple results table of correct and wrong answers",
      "Learners explain where the model failed and why",
    ]),
  ],
  [
    ss("4.1 Problem Framing", 5, "Is AI the right tool for this problem?", [
      "state when an AI approach suits a problem and when it does not",
      "examine a set of problems and select those suited to AI",
      "value careful judgement before choosing technology",
    ], [
      "Learners assess problem cards for AI suitability",
      "Learners justify their choices to the class",
      "Learners select one problem for their term project",
    ]),
    ss("4.2 Prototyping", 5, "How do we make a first working version quickly?", [
      "outline the purpose of a prototype",
      "construct a prototype of their chosen solution",
      "show willingness to discard and rebuild ideas",
    ], [
      "Learners build a rough prototype within one lesson",
      "Learners show the prototype to users for comment",
      "Learners rebuild the prototype after feedback",
    ]),
    ss("4.3 Documentation", 5, "How will others understand what we built?", [
      "describe what project documentation should contain",
      "record their project design, data and results",
      "appreciate clear records as part of good work",
    ], [
      "Learners keep a structured project journal",
      "Learners write a short technical description of their solution",
      "Learners exchange documents and check for clarity",
    ]),
  ],
  [
    ss("5.1 Ethical Principles for AI", 8, "What principles should guide anyone who builds AI?", [
      "state the main ethical principles guiding AI use",
      "examine case studies against these principles",
      "commit to ethical conduct in their own projects",
    ], [
      "Learners study principles of fairness, transparency and accountability",
      "Learners analyse case studies in groups",
      "Learners write an ethics statement for their project",
    ]),
    ss("5.2 Algorithmic Bias", 8, "How does bias get into a system that has no feelings?", [
      "explain how bias enters an AI system through data and design",
      "examine a model for biased outcomes",
      "value equity in the systems they build",
    ], [
      "Learners train models on deliberately skewed data",
      "Learners measure outcomes across different groups",
      "Learners propose corrections and retest",
    ]),
    ss("5.3 Data Protection in Kenya", 8, "What does Kenyan law say about our data?", [
      "outline key provisions of the Kenyan data protection framework",
      "interpret a scenario against the requirements of the law",
      "commit to lawful handling of other people's data",
    ], [
      "Learners study simplified provisions of the Data Protection Act",
      "Learners judge scenarios as lawful or unlawful",
      "Learners write a data policy for their class project",
    ]),
    ss("5.4 Junior Capstone Project", 9, "How can we solve a real Kenyan problem with AI?", [
      "describe the full design of their capstone solution",
      "construct, test and document a complete AI project",
      "show responsibility and teamwork throughout the project",
    ], [
      "Learners select a real local problem",
      "Learners run the full design cycle over several weeks",
      "Learners present the project with documentation and ethics statement",
    ]),
  ],
]);

export const grade8AI: StrandInfo[] = build([
  [
    ss("1.1 Search and Problem Solving", 5, "How does a machine find a path to a goal?", [
      "explain how a machine searches for a solution",
      "practice tracing a search through a simple problem space",
      "appreciate systematic thinking in solving problems",
    ], [
      "Learners solve maze problems by hand using search rules",
      "Learners trace breadth-first and depth-first routes",
      "Learners compare the number of steps each route needed",
    ]),
    ss("1.2 Knowledge and Reasoning", 5, "Can a machine draw a conclusion from facts?", [
      "explain how a machine reasons from stored facts",
      "construct simple logical rules that produce a conclusion",
      "value logical consistency in reasoning",
    ], [
      "Learners write facts and rules for a small domain",
      "Learners derive conclusions by applying rules",
      "Learners test rules that produce wrong conclusions",
    ]),
    ss("1.3 Agents and Environments", 5, "What makes a program an agent?", [
      "describe an agent in terms of sensing, deciding and acting",
      "examine a given system and identify its agent parts",
      "appreciate the design thinking behind intelligent agents",
    ], [
      "Learners draw sense-decide-act diagrams for known systems",
      "Learners simulate an agent in a grid world on paper",
      "Learners identify agent parts in a robot or game character",
    ]),
  ],
  [
    ss("2.1 Features and Attributes", 6, "What does a model actually look at?", [
      "explain what features a model uses to make a prediction",
      "select suitable features from a data set for a given task",
      "value thoughtful selection over guessing",
    ], [
      "Learners list possible features for predicting crop yield",
      "Learners test models built on different feature sets",
      "Learners record which features mattered most",
    ]),
    ss("2.2 Data Visualisation", 6, "What can a chart reveal that a table hides?", [
      "explain how different charts reveal different patterns",
      "construct appropriate charts for a given data set",
      "appreciate honesty in presenting data visually",
    ], [
      "Learners produce scatter, bar and line charts of the same data",
      "Learners identify misleading charts and explain why",
      "Learners redraw a misleading chart honestly",
    ]),
    ss("2.3 Knowledge Graphs", 6, "How can relationships between facts be stored?", [
      "describe how a knowledge graph stores entities and relationships",
      "construct a small knowledge graph of a chosen topic",
      "appreciate structure in organising knowledge",
    ], [
      "Learners model Kenyan counties and their products as a graph",
      "Learners write entity-relation statements",
      "Learners query the graph by hand to answer questions",
    ]),
  ],
  [
    ss("3.1 Unsupervised Learning and Clustering", 6, "Can a machine group data without being told the groups?", [
      "explain how clustering groups data without labels",
      "practice clustering a data set and interpreting the groups",
      "value curiosity in exploring unlabelled data",
    ], [
      "Learners cluster class survey data using a free tool",
      "Learners name and describe the clusters found",
      "Learners test whether the clusters make real-world sense",
    ]),
    ss("3.2 Programming Data Pipelines", 6, "How do we move data through a program?", [
      "outline the stages of a simple data pipeline in code",
      "construct a program that reads, processes and outputs data",
      "show orderliness in structuring their code",
    ], [
      "Learners write code that reads a data file",
      "Learners add processing steps and output to the pipeline",
      "Learners refactor the pipeline into reusable functions",
    ]),
    ss("3.3 Introduction to Neural Networks", 6, "How is a neural network different from a set of rules?", [
      "describe the structure of a simple neural network",
      "practice training a small neural network on a prepared data set",
      "appreciate the learning behaviour of neural networks",
    ], [
      "Learners build a paper model of neurons, weights and layers",
      "Learners train a small network in a browser tool",
      "Learners observe how changing layers changes results",
    ]),
  ],
  [
    ss("4.1 Requirements and Constraints", 5, "What limits must our solution work within?", [
      "state the requirements and constraints of a project",
      "examine a context and record its technical and social constraints",
      "value realism in planning solutions",
    ], [
      "Learners audit available devices, data and time",
      "Learners write a constraints list for their project",
      "Learners adjust their project scope to fit the constraints",
    ]),
    ss("4.2 Iterative Development", 5, "Why do we build in small repeated steps?", [
      "explain the value of building in small iterations",
      "construct successive versions of a solution, testing each one",
      "show discipline in working through repeated cycles",
    ], [
      "Learners plan three build cycles with goals for each",
      "Learners complete and test each cycle",
      "Learners record what changed between versions",
    ]),
    ss("4.3 User Testing", 5, "What do real users say about what we built?", [
      "describe methods of testing a solution with users",
      "conduct a user test and record the findings",
      "appreciate criticism as a way to improve",
    ], [
      "Learners prepare user test tasks and questions",
      "Learners observe users without coaching them",
      "Learners rank the problems found and fix the top ones",
    ]),
  ],
  [
    ss("5.1 Transparency and Explainability", 8, "Should a machine explain its decision?", [
      "explain why AI decisions should be explainable",
      "examine a model decision and attempt to explain it",
      "value openness in the systems they build",
    ], [
      "Learners test a model and try to explain its output",
      "Learners compare a rule-based and a learned explanation",
      "Learners write explanation notes for their own project",
    ]),
    ss("5.2 AI, Security and Safety", 8, "How can an AI system be attacked or misused?", [
      "identify ways in which AI systems can be misused or attacked",
      "examine a system for safety weaknesses",
      "commit to building systems that protect users",
    ], [
      "Learners study cases of misuse such as deepfakes and scams",
      "Learners test a classifier with deliberately tricky inputs",
      "Learners list safeguards for their own project",
    ]),
    ss("5.3 AI Policy and Governance", 8, "Who should make the rules for AI in Kenya?", [
      "outline the role of policy in guiding AI development",
      "examine Kenyan and African AI policy positions",
      "value participation in shaping national technology policy",
    ], [
      "Learners read summaries of national AI strategy documents",
      "Learners compare positions from two countries",
      "Learners draft a policy recommendation for their school",
    ]),
    ss("5.4 Applied Capstone Project", 9, "Can our solution stand up to real users and real ethics?", [
      "describe the technical and ethical design of their project",
      "construct, evaluate and document a complete AI solution",
      "show integrity in reporting results and limitations",
    ], [
      "Learners run the complete design cycle on a chosen problem",
      "Learners include an ethics and limitations section",
      "Learners present to a panel of teachers and peers",
    ]),
  ],
]);

export const grade9AI: StrandInfo[] = build([
  [
    ss("1.1 Cognitive Architectures", 5, "How might a machine combine many abilities at once?", [
      "describe how a cognitive architecture combines memory, reasoning and learning",
      "compare two approaches to building general intelligent systems",
      "appreciate the complexity of building general intelligence",
    ], [
      "Learners study diagrams of cognitive architectures",
      "Learners map human abilities onto architecture components",
      "Learners present a comparison of two architectures",
    ]),
    ss("1.2 Foundation Models and Generative AI", 5, "How does a model generate new text or images?", [
      "explain in outline how a generative model produces new content",
      "use a generative tool and evaluate the quality of its output",
      "value critical judgement of generated content",
    ], [
      "Learners prompt a generative tool on a familiar topic",
      "Learners fact-check the output against reliable sources",
      "Learners record where the output was wrong or invented",
    ]),
    ss("1.3 Limits of Current AI", 5, "What still defeats today's best systems?", [
      "identify the known weaknesses of current AI systems",
      "examine outputs that reveal these weaknesses",
      "value humility about what technology can do",
    ], [
      "Learners test tools on reasoning and counting tasks",
      "Learners classify failures by type",
      "Learners discuss what a general system would need instead",
    ]),
  ],
  [
    ss("2.1 Large Data Sets", 6, "What changes when data becomes very large?", [
      "explain the challenges of working with large data sets",
      "practice sampling and summarising a large data set",
      "appreciate careful method when data is too large to read",
    ], [
      "Learners work with a large public data file",
      "Learners take random samples and compare them to the whole",
      "Learners summarise the data set in a short report",
    ]),
    ss("2.2 Data Sovereignty", 6, "Who owns Kenyan data?", [
      "explain the meaning of data sovereignty for Kenya",
      "examine where data about Kenyans is stored and processed",
      "value national interest in the handling of data",
    ], [
      "Learners research where popular services store data",
      "Learners map data flows out of and into Kenya",
      "Learners debate local versus foreign data hosting",
    ]),
    ss("2.3 Building a Local Data Set", 6, "Why do we need data sets made in Kenya?", [
      "explain why locally collected data sets matter for Kenyan AI",
      "conduct the collection of a small local data set with consent",
      "commit to respecting consent and community interests",
    ], [
      "Learners design a consent form for data collection",
      "Learners collect local images, text or Kiswahili audio",
      "Learners document the data set and its intended use",
    ]),
  ],
  [
    ss("3.1 Symbolic Programming Concepts", 6, "How do we program with facts and rules instead of steps?", [
      "explain how symbolic programming represents facts and rules",
      "construct simple symbolic rules that a system can evaluate",
      "appreciate declarative thinking as a way to program",
    ], [
      "Learners write facts and rules for a small knowledge base",
      "Learners run queries against the rules",
      "Learners compare the result with a step-by-step program",
    ]),
    ss("3.2 Machine Learning Workflow in Code", 6, "What does a complete ML workflow look like in code?", [
      "outline the full machine learning workflow from data to evaluation",
      "construct a program that trains and evaluates a model",
      "show rigour in following each workflow stage",
    ], [
      "Learners load and split a data set in code",
      "Learners train and evaluate a model programmatically",
      "Learners report metrics in a results table",
    ]),
    ss("3.3 Building an AI Agent", 6, "How do we build something that acts on its own?", [
      "describe the components of a simple software agent",
      "construct an agent that senses input and takes an action",
      "show responsibility in limiting what an agent may do",
    ], [
      "Learners design an agent for a school task",
      "Learners implement sense, decide and act components",
      "Learners set and test safety limits for the agent",
    ]),
  ],
  [
    ss("4.1 Systems Thinking in Design", 5, "How does our solution fit into the wider system?", [
      "explain how a solution interacts with people, data and institutions",
      "examine the wider system surrounding a chosen problem",
      "value whole-system thinking in design",
    ], [
      "Learners draw a system map around their problem",
      "Learners identify who gains and who loses",
      "Learners adjust the design based on the map",
    ]),
    ss("4.2 Integration and Deployment", 5, "How do we put our solution into real use?", [
      "outline the steps of putting a solution into real use",
      "practice deploying a solution for real users to try",
      "show care for users during deployment",
    ], [
      "Learners prepare deployment instructions",
      "Learners release the solution to a small user group",
      "Learners monitor and record real usage",
    ]),
    ss("4.3 Monitoring and Maintenance", 5, "What happens to our solution after we hand it over?", [
      "explain why deployed systems must be monitored",
      "interpret usage data to detect problems after deployment",
      "commit to supporting what they have built",
    ], [
      "Learners set up a simple usage log",
      "Learners review logs and identify issues",
      "Learners plan maintenance actions",
    ]),
  ],
  [
    ss("5.1 AI and Human Rights", 8, "Can an AI system violate a person's rights?", [
      "explain how AI systems can affect human rights",
      "examine cases where rights were affected by automated decisions",
      "commit to protecting rights in their own work",
    ], [
      "Learners study rights in the Constitution of Kenya",
      "Learners analyse automated decision cases against those rights",
      "Learners write a rights impact note for their project",
    ]),
    ss("5.2 Economic Transformation and AI", 8, "How can AI grow Kenya's economy fairly?", [
      "outline the economic opportunities AI creates in Kenya",
      "interpret data on AI adoption in Kenyan industries",
      "value inclusive growth in technology",
    ], [
      "Learners research AI use in Kenyan startups",
      "Learners analyse data on jobs created and lost",
      "Learners propose a fair adoption plan for a sector",
    ]),
    ss("5.3 Responsible AI Frameworks", 8, "How do organisations keep their AI responsible?", [
      "outline the components of a responsible AI framework",
      "examine an organisation's practice against the framework",
      "commit to responsible practice as future builders",
    ], [
      "Learners study a published responsible AI framework",
      "Learners audit a case organisation against it",
      "Learners write a responsible AI checklist for their school",
    ]),
    ss("5.4 Junior School Exit Project", 9, "What can we build that is ready for real users?", [
      "describe a complete solution including its ethical safeguards",
      "construct, deploy and evaluate the solution with real users",
      "show professionalism and integrity in delivering the project",
    ], [
      "Learners run a full project cycle from problem to deployment",
      "Learners collect real user feedback and metrics",
      "Learners present a portfolio for exit assessment",
    ]),
  ],
]);

// ─────────────────────────────────────────────────────────────
// SENIOR SCHOOL (Grades 10-12) — 4 lessons/week, 132 lessons
// Emphasis: symbolic and neural AI, MeTTa and Wolfram Language,
// model building, agents, AI policy and enterprise
// ─────────────────────────────────────────────────────────────

export const grade10AI: StrandInfo[] = build([
  [
    ss("1.1 Theories of Intelligence", 7, "What theories explain intelligence in humans and machines?", [
      "explain the main theories that describe intelligence",
      "compare biological and computational accounts of intelligence",
      "appreciate the philosophical depth of the field",
    ], [
      "Learners read summaries of leading theories of intelligence",
      "Learners build a comparison matrix of the theories",
      "Learners debate which theory best guides AI design",
    ]),
    ss("1.2 Symbolic AI and the Knowledge Tradition", 7, "Why did early AI rely on symbols and logic?", [
      "outline the principles of symbolic artificial intelligence",
      "practice expressing a problem in symbolic form",
      "value formal precision in expressing knowledge",
    ], [
      "Learners translate word problems into logical statements",
      "Learners evaluate the statements for truth",
      "Learners identify problems that resist symbolic expression",
    ]),
    ss("1.3 Connectionism and Deep Learning", 6, "How did learning from data come to dominate AI?", [
      "explain the principles of connectionist and deep learning systems",
      "compare symbolic and connectionist systems on the same task",
      "appreciate the strengths and weaknesses of each tradition",
    ], [
      "Learners study the structure of deep networks",
      "Learners run the same task through both kinds of system",
      "Learners present findings on where each excelled",
    ]),
  ],
  [
    ss("2.1 Data Engineering Foundations", 8, "How is data prepared at professional scale?", [
      "outline professional practices in preparing data for AI",
      "construct a reproducible data preparation pipeline",
      "value reproducibility and documentation in data work",
    ], [
      "Learners build a pipeline that cleans and transforms raw data",
      "Learners version their data and scripts",
      "Learners rerun the pipeline to prove reproducibility",
    ]),
    ss("2.2 Statistical Description of Data", 8, "What do the numbers say before any model is built?", [
      "explain the statistical measures that describe a data set",
      "compute and interpret descriptive statistics for a data set",
      "value evidence over assumption",
    ], [
      "Learners compute measures of centre and spread",
      "Learners visualise distributions and outliers",
      "Learners write a data description report",
    ]),
    ss("2.3 Symbolic Knowledge Representation", 8, "How do we write knowledge that a reasoning engine can use?", [
      "describe atomspace-style representation of knowledge as atoms and links",
      "construct a knowledge base using symbolic notation",
      "appreciate rigour in representing knowledge formally",
    ], [
      "Learners represent a Kenyan agriculture domain as atoms and links",
      "Learners write the representation in MeTTa notation",
      "Learners check the representation for contradictions",
    ]),
  ],
  [
    ss("3.1 Programming Fundamentals for AI", 8, "Which programming ideas underpin all AI work?", [
      "outline the programming constructs used across AI systems",
      "construct programs using functions, data structures and iteration",
      "show discipline in writing readable code",
    ], [
      "Learners implement common data structures",
      "Learners refactor code for readability",
      "Learners review each other's code against a style guide",
    ]),
    ss("3.2 Introduction to MeTTa", 8, "How does MeTTa let us program with knowledge itself?", [
      "explain the syntax and evaluation model of MeTTa",
      "construct MeTTa programs that define atoms, types and rewrite rules",
      "appreciate declarative programming as a route to general reasoning",
    ], [
      "Learners install or access a MeTTa environment and run examples",
      "Learners write atoms, grounded values and simple rewrite rules",
      "Learners query a MeTTa knowledge base and trace the evaluation",
    ]),
    ss("3.3 Introduction to Wolfram Language", 8, "How does a computational language shorten AI work?", [
      "explain the symbolic and computational design of Wolfram Language",
      "construct Wolfram Language expressions for computation and data analysis",
      "value expressive tools that reduce repetitive work",
    ], [
      "Learners evaluate symbolic and numeric expressions in a notebook",
      "Learners use built-in data and plotting functions",
      "Learners solve a mathematics problem symbolically and numerically",
    ]),
  ],
  [
    ss("4.1 The AI Project Life Cycle", 7, "What stages does a professional AI project follow?", [
      "outline the stages of a professional AI project life cycle",
      "plan a project against each stage of the life cycle",
      "value structured working over improvisation",
    ], [
      "Learners produce a staged project plan with milestones",
      "Learners assign roles and deliverables per stage",
      "Learners review the plan against a professional template",
    ]),
    ss("4.2 Building a Baseline Model", 7, "Why start with the simplest model that works?", [
      "explain the purpose of a baseline model",
      "construct and evaluate a baseline model for their problem",
      "value modest starting points before complexity",
    ], [
      "Learners implement a simple baseline in code",
      "Learners record its metrics as a reference point",
      "Learners justify any added complexity against the baseline",
    ]),
    ss("4.3 Version Control and Collaboration", 6, "How do teams build software together without losing work?", [
      "describe how version control supports team development",
      "practice committing, branching and merging project work",
      "show cooperation and accountability in shared work",
    ], [
      "Learners set up a shared repository",
      "Learners work on branches and merge their changes",
      "Learners resolve a deliberate merge conflict",
    ]),
  ],
  [
    ss("5.1 Ethical Theory Applied to AI", 9, "Which ethical framework should guide a difficult AI decision?", [
      "outline the main ethical frameworks used to judge technology",
      "examine a difficult AI case using more than one framework",
      "commit to reasoned ethical judgement rather than opinion",
    ], [
      "Learners study consequentialist, duty and virtue approaches",
      "Learners analyse a case using each framework in turn",
      "Learners defend a position in a structured debate",
    ]),
    ss("5.2 AI in the Kenyan Policy Landscape", 9, "How is Kenya choosing to govern AI?", [
      "outline Kenya's national position on artificial intelligence",
      "examine national strategy documents against real practice",
      "value informed citizenship in technology policy",
    ], [
      "Learners read the national AI strategy and data protection law",
      "Learners compare stated policy with observed practice",
      "Learners write a policy brief for a chosen sector",
    ]),
    ss("5.3 Global Comparative Models", 9, "What can Kenya learn from other countries?", [
      "compare AI education and governance models from other countries",
      "examine the UNESCO competency framework against Kenyan needs",
      "value learning from others while adapting to local context",
    ], [
      "Learners study the UNESCO, UK, Finland and China models",
      "Learners build a comparative matrix",
      "Learners recommend adaptations suitable for Kenya",
    ]),
    ss("5.4 Term Capstone: Symbolic Reasoner", 17, "Can we build a reasoning system for a Kenyan domain?", [
      "describe the design of a symbolic reasoning system for a chosen domain",
      "construct and evaluate the reasoner in MeTTa or Wolfram Language",
      "show integrity in documenting limitations and ethical risks",
    ], [
      "Learners select a domain and gather its rules and facts",
      "Learners implement the reasoner and test it on real queries",
      "Learners present the system with documentation and an ethics review",
    ]),
  ],
]);

export const grade11AI: StrandInfo[] = build([
  [
    ss("1.1 Learning Theory", 7, "What does it mean, mathematically, for a machine to learn?", [
      "explain the formal idea of learning from data",
      "interpret learning curves and generalisation behaviour",
      "value mathematical grounding in AI work",
    ], [
      "Learners study training and generalisation error",
      "Learners plot and interpret learning curves",
      "Learners explain overfitting from their own plots",
    ]),
    ss("1.2 Reasoning Under Uncertainty", 7, "How does a machine decide when it is not sure?", [
      "explain how probability supports reasoning under uncertainty",
      "compute simple probabilistic inferences",
      "appreciate honest handling of uncertainty",
    ], [
      "Learners work through probability problems by hand",
      "Learners implement a naive Bayes classifier",
      "Learners report confidence alongside predictions",
    ]),
    ss("1.3 Neuro-Symbolic Integration", 6, "Can symbolic reasoning and neural learning work together?", [
      "describe approaches to combining symbolic and neural methods",
      "compare a neural, a symbolic and a hybrid solution to one task",
      "appreciate integration as a path towards general intelligence",
    ], [
      "Learners implement the same task three ways",
      "Learners compare accuracy, explainability and data needs",
      "Learners present a case for the hybrid approach",
    ]),
  ],
  [
    ss("2.1 Feature Engineering", 8, "How do we turn raw data into useful signals?", [
      "explain how engineered features improve model performance",
      "construct new features from a raw data set and test their effect",
      "value creativity grounded in evidence",
    ], [
      "Learners derive features from date, text and location fields",
      "Learners measure the effect of each feature on performance",
      "Learners document feature decisions",
    ]),
    ss("2.2 Working with Text and Language Data", 8, "How is Kiswahili text prepared for a model?", [
      "describe the steps of preparing text data for modelling",
      "practice tokenising and vectorising Kiswahili and English text",
      "value inclusion of African languages in AI",
    ], [
      "Learners tokenise Kiswahili sentences and inspect the tokens",
      "Learners build simple vector representations",
      "Learners compare tool performance on Kiswahili and English",
    ]),
    ss("2.3 Data Ethics and Consent at Scale", 8, "Is consent still meaningful when data is collected in bulk?", [
      "explain the ethical requirements of large-scale data collection",
      "examine a data set's provenance and consent basis",
      "commit to lawful and ethical data sourcing",
    ], [
      "Learners audit public data sets for provenance",
      "Learners write a consent and provenance statement",
      "Learners reject a data set that fails the audit and justify it",
    ]),
  ],
  [
    ss("3.1 Advanced MeTTa Programming", 8, "How do we express complex reasoning in MeTTa?", [
      "explain non-determinism, types and pattern matching in MeTTa",
      "construct MeTTa programs that perform multi-step inference",
      "value elegance and clarity in declarative code",
    ], [
      "Learners write typed MeTTa definitions and pattern-matching rules",
      "Learners implement multi-step inference chains",
      "Learners trace non-deterministic evaluation results",
    ]),
    ss("3.2 Machine Learning in Wolfram Language", 8, "How fast can we go from data to a trained model?", [
      "outline the built-in machine learning functions of Wolfram Language",
      "construct and evaluate models using these built-in functions",
      "appreciate high-level tooling for rapid experimentation",
    ], [
      "Learners train classifiers and predictors on supplied data",
      "Learners inspect model information and performance reports",
      "Learners compare the built-in model with a hand-built one",
    ]),
    ss("3.3 Neural Network Implementation", 8, "What happens inside the layers we train?", [
      "explain the operation of layers, weights and training loops",
      "construct and train a neural network for a chosen task",
      "show perseverance through long training and tuning cycles",
    ], [
      "Learners implement a small network layer by layer",
      "Learners tune learning rate and architecture",
      "Learners record every experiment in a results log",
    ]),
  ],
  [
    ss("4.1 Requirements Engineering", 7, "How do we capture what a real client actually needs?", [
      "outline how requirements are gathered and recorded",
      "conduct a requirements interview and produce a specification",
      "value listening carefully to clients",
    ], [
      "Learners interview a real or role-played client",
      "Learners write a specification document",
      "Learners have the client confirm the specification",
    ]),
    ss("4.2 Building an Intelligent Agent", 7, "How do we build an agent that plans and acts?", [
      "describe the architecture of a planning agent",
      "construct an agent that plans and executes multi-step tasks",
      "show responsibility in bounding agent autonomy",
    ], [
      "Learners design an agent architecture diagram",
      "Learners implement planning and execution components",
      "Learners test the agent and impose safety limits",
    ]),
    ss("4.3 Evaluation and Benchmarking", 6, "How do we prove that our system is genuinely better?", [
      "explain benchmarking methods for AI systems",
      "conduct a benchmark comparison and report the results",
      "value honesty in reporting comparative results",
    ], [
      "Learners define benchmark tasks and metrics",
      "Learners run the benchmark on competing systems",
      "Learners publish a results table with limitations noted",
    ]),
  ],
  [
    ss("5.1 Accountability and Liability", 9, "Who answers when an AI system causes harm?", [
      "explain how responsibility is assigned when AI causes harm",
      "examine cases and assign accountability with reasons",
      "commit to accepting responsibility for what they build",
    ], [
      "Learners study real incidents involving automated systems",
      "Learners map responsibility across developers, deployers and users",
      "Learners write an accountability clause for their project",
    ]),
    ss("5.2 AI, Work and Enterprise in Kenya", 9, "How can young Kenyans build enterprises with AI?", [
      "outline enterprise opportunities created by AI in Kenya",
      "examine a business case for an AI-based venture",
      "value enterprise and self-reliance",
    ], [
      "Learners study Kenyan AI ventures",
      "Learners build a business model canvas for an AI idea",
      "Learners pitch the venture to peers",
    ]),
    ss("5.3 Inclusive and Accessible AI", 9, "Who is left out by the systems we build?", [
      "explain how AI systems exclude certain users",
      "examine a system for accessibility and language barriers",
      "value inclusion of all learners and citizens",
    ], [
      "Learners test tools with users of different abilities and languages",
      "Learners record exclusion points found",
      "Learners redesign one feature for inclusion",
    ]),
    ss("5.4 Term Capstone: Applied AI System", 17, "Can we deliver a working AI system for a real client?", [
      "describe the full architecture and evaluation of their system",
      "construct, benchmark and deploy the system for a real client",
      "show professionalism in delivery and documentation",
    ], [
      "Learners work with a real client through the full cycle",
      "Learners benchmark and deploy the solution",
      "Learners deliver documentation, ethics review and handover",
    ]),
  ],
]);

export const grade12AI: StrandInfo[] = build([
  [
    ss("1.1 Pathways to Artificial General Intelligence", 7, "What would it take to build a genuinely general mind?", [
      "outline the leading research pathways towards general intelligence",
      "compare the assumptions behind each pathway",
      "appreciate open scientific questions in the field",
    ], [
      "Learners review research summaries on AI approaches",
      "Learners map assumptions and open problems per pathway",
      "Learners present a critique of one pathway",
    ]),
    ss("1.2 Consciousness, Agency and Mind", 7, "Could a machine ever be said to understand?", [
      "explain the philosophical arguments about machine understanding",
      "examine arguments for and against machine consciousness",
      "value reasoned reflection on hard questions",
    ], [
      "Learners study the Chinese Room and related arguments",
      "Learners construct arguments on both sides",
      "Learners hold a formal debate",
    ]),
    ss("1.3 Alignment and Control", 6, "How do we keep powerful systems doing what we intend?", [
      "explain the problem of aligning AI systems with human intent",
      "examine alignment failures in existing systems",
      "commit to safety as a design priority",
    ], [
      "Learners study specification gaming examples",
      "Learners test a system for unintended behaviour",
      "Learners write alignment requirements for their project",
    ]),
  ],
  [
    ss("2.1 Data Strategy for Organisations", 8, "How should an organisation plan its data?", [
      "outline the components of an organisational data strategy",
      "construct a data strategy for a chosen organisation",
      "value long-term planning over short-term fixes",
    ], [
      "Learners audit an organisation's data holdings",
      "Learners draft a data strategy document",
      "Learners present the strategy to the organisation",
    ]),
    ss("2.2 Building Kenyan Language Data Sets", 8, "How do we build AI that speaks our languages?", [
      "explain the requirements of building a language data set for Kenyan languages",
      "conduct the collection and annotation of a Kenyan language data set",
      "value the preservation and digital presence of local languages",
    ], [
      "Learners collect Kiswahili or indigenous language samples with consent",
      "Learners annotate the samples using agreed guidelines",
      "Learners publish the data set with a licence and data card",
    ]),
    ss("2.3 Knowledge Graphs and Ontologies", 8, "How do we formalise an entire domain of knowledge?", [
      "explain how ontologies formalise a domain of knowledge",
      "construct an ontology and query it programmatically",
      "appreciate systematic organisation of knowledge",
    ], [
      "Learners design an ontology for a Kenyan sector",
      "Learners implement it in MeTTa or a graph tool",
      "Learners run reasoning queries against the ontology",
    ]),
  ],
  [
    ss("3.1 Advanced Symbolic Reasoning in MeTTa", 8, "Can our reasoner learn and revise its own rules?", [
      "explain how a MeTTa program can transform its own rules",
      "construct a self-modifying reasoning program in MeTTa",
      "value rigour when building systems that change themselves",
    ], [
      "Learners implement meta-rules that rewrite other rules",
      "Learners test the system's behaviour as rules change",
      "Learners bound the system to prevent runaway rewriting",
    ]),
    ss("3.2 Computational Modelling in Wolfram Language", 8, "How do we model a real Kenyan system computationally?", [
      "explain how computational models simulate real systems",
      "construct a simulation of a real system in Wolfram Language",
      "value evidence-based modelling of real problems",
    ], [
      "Learners model rainfall, disease spread or market prices",
      "Learners validate the model against real data",
      "Learners present findings with visualisations",
    ]),
    ss("3.3 Multi-Agent and Generative Systems", 8, "What happens when several intelligent agents interact?", [
      "describe how multiple agents coordinate or compete",
      "construct a multi-agent or generative system for a chosen task",
      "show responsibility in controlling emergent behaviour",
    ], [
      "Learners implement two or more interacting agents",
      "Learners observe and record emergent behaviour",
      "Learners add coordination and safety rules",
    ]),
  ],
  [
    ss("4.1 Research Methods in AI", 7, "How is an AI claim proved or disproved?", [
      "outline the methods used to conduct and report AI research",
      "conduct a small controlled experiment with a stated hypothesis",
      "value scientific honesty and replicability",
    ], [
      "Learners state a hypothesis and design an experiment",
      "Learners run controlled trials and record results",
      "Learners write the study in research report format",
    ]),
    ss("4.2 Productisation and Scaling", 7, "How does a prototype become a product people rely on?", [
      "explain what is required to take a prototype to a reliable product",
      "practice packaging, testing and scaling a solution",
      "value reliability and user trust",
    ], [
      "Learners package a solution for distribution",
      "Learners load-test and harden the solution",
      "Learners write user and maintenance documentation",
    ]),
    ss("4.3 Portfolio and Professional Presentation", 6, "How do we present ourselves as AI professionals?", [
      "describe the contents of a professional AI portfolio",
      "construct a portfolio of their completed AI work",
      "show pride and professionalism in their achievements",
    ], [
      "Learners assemble projects, code and reports into a portfolio",
      "Learners rehearse a professional presentation",
      "Learners present the portfolio to an external panel",
    ]),
  ],
  [
    ss("5.1 AI Governance and Regulation", 9, "How should Kenya regulate powerful AI systems?", [
      "outline approaches to regulating advanced AI systems",
      "examine proposed regulations against Kenyan realities",
      "value the rule of law in technology development",
    ], [
      "Learners compare regulatory approaches across jurisdictions",
      "Learners assess their fit for Kenya",
      "Learners draft a regulatory proposal",
    ]),
    ss("5.2 AI Sovereignty and National Strategy", 9, "Should Kenya build its own AI, or buy it?", [
      "explain the meaning and stakes of AI sovereignty for Kenya",
      "examine the trade-offs between local building and foreign systems",
      "commit to advancing national technological capacity",
    ], [
      "Learners research national AI capability across Africa",
      "Learners analyse dependency risks",
      "Learners debate a sovereignty position for Kenya",
    ]),
    ss("5.3 Existential and Long-Term Risk", 9, "What are the long-term risks of very capable AI?", [
      "outline long-term risks associated with highly capable AI",
      "examine risk arguments critically against available evidence",
      "value sober and evidence-based risk assessment",
    ], [
      "Learners study long-term risk literature",
      "Learners separate evidenced claims from speculation",
      "Learners write a balanced risk assessment",
    ]),
    ss("5.4 Exit Capstone: AI Research Project", 17, "What original contribution can we make to AI in Kenya?", [
      "describe an original research question and its method",
      "conduct, evaluate and defend a complete research project",
      "show integrity, independence and scholarly discipline",
    ], [
      "Learners select an original research question",
      "Learners conduct the study with proper method and ethics",
      "Learners defend the work before an assessment panel",
    ]),
  ],
]);
