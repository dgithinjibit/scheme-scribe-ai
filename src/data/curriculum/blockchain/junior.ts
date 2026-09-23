import type { StrandInfo } from "../types";
import { ss, build } from "./shared";

/**
 * Junior School Blockchain — Grades 7-9.
 * Grade 7: how a chain of records works, unplugged.
 * Grade 8: cryptography, consensus, digital ownership.
 * Grade 9: wallets, keys, tokens and consumer protection.
 * Trading and speculation are studied as risks, never practised.
 */

export const grade7Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Centralised and Shared Records", 9, "Who should hold a record that everybody depends on?", [
      "explain the difference between a record held by one office and a record shared by many",
      "compare a centralised and a shared class record in a practical activity",
      "appreciate the strengths of each way of keeping records",
    ], [
      "Learners keep one class register with a single monitor, then with five groups",
      "Learners record what happens when the single record holder is absent",
      "Learners tabulate the strengths and weaknesses of each method",
    ]),
    ss("1.2 History of Money and Records", 9, "How has the way we store value changed?", [
      "describe the development of value exchange from barter to digital money",
      "prepare a timeline of forms of money used in Kenya",
      "appreciate how technology has changed the exchange of value",
    ], [
      "Learners research forms of money used in Kenya over time",
      "Learners draw a timeline from barter through coins to mobile money",
      "Learners discuss what problem each new form of money solved",
    ]),
    ss("1.3 Trust Without a Middleman", 10, "Can strangers trade safely without someone in the middle?", [
      "explain the role of an intermediary in a transaction",
      "role-play a transaction with and without an intermediary",
      "value fairness in transactions between strangers",
    ], [
      "Learners role-play a sale using an agent, then without one",
      "Learners identify where cheating could occur in each case",
      "Learners suggest rules that would make the direct trade safe",
    ]),
  ],
  [
    ss("2.1 Blocks and Chains", 9, "How are records linked together?", [
      "describe how records are grouped into blocks and linked in order",
      "construct a paper blockchain where each block refers to the previous one",
      "appreciate the ordering of linked records",
    ], [
      "Learners write transactions on cards and group them into blocks",
      "Learners link the blocks by copying a code from the previous block",
      "Learners alter one block and observe the break in the chain",
    ]),
    ss("2.2 Fingerprints of Data", 9, "How can a short code represent a whole page of information?", [
      "explain the meaning of a data fingerprint used to detect change",
      "demonstrate producing a simple checksum for a short message",
      "value accuracy when verifying information",
    ], [
      "Learners add letter values to produce a simple checksum",
      "Learners change one letter and recalculate to observe the difference",
      "Learners verify a partner's message using the checksum",
    ]),
    ss("2.3 Agreeing on the Truth", 10, "How does a group decide which record is correct?", [
      "explain how a group reaches agreement on a shared record",
      "conduct a class activity to agree on a disputed record",
      "show respect for group decision-making",
    ], [
      "Learners split into groups holding slightly different records",
      "Learners vote and adopt the record held by the majority",
      "Learners discuss what happens if one group keeps a false record",
    ]),
  ],
  [
    ss("3.1 Digital Records of Ownership", 9, "How do we prove that something digital belongs to us?", [
      "explain how ownership of a digital item can be recorded",
      "prepare a class register of digital ownership for sample items",
      "appreciate the importance of proof of ownership",
    ], [
      "Learners register ownership of drawings or files on a class ledger",
      "Learners transfer ownership and record the change",
      "Learners discuss disputes that the register helps to settle",
    ]),
    ss("3.2 Types of Digital Value", 9, "Are all digital tokens the same?", [
      "classify digital value into money, points, vouchers and unique items",
      "sort examples of digital value into the correct class",
      "show curiosity about new forms of digital value",
    ], [
      "Learners list examples of each type of digital value",
      "Learners sort example cards into the four classes",
      "Learners present one example and explain where it is used",
    ]),
    ss("3.3 Digital Finance in Kenya", 10, "How has digital finance changed life in Kenya?", [
      "describe digital financial services used in Kenya",
      "survey the digital financial services used by families in the community",
      "appreciate the contribution of digital finance to daily life",
    ], [
      "Learners prepare a short questionnaire on digital payments",
      "Learners collect and tabulate responses from families",
      "Learners present findings using charts",
    ]),
  ],
  [
    ss("4.1 Conditions and Automatic Actions", 9, "How can a computer enforce an agreement?", [
      "explain how an if-then condition can enforce an agreement automatically",
      "write if-then rules for a simple class agreement",
      "appreciate consistency in automatically enforced rules",
    ], [
      "Learners write if-then rules for a class savings activity",
      "Learners act out the rules with a neutral learner as the machine",
      "Learners identify rules that were unclear and rewrite them",
    ]),
    ss("4.2 Block-Based Simulation", 9, "How can we model a shared ledger on a computer?", [
      "describe the parts of a simple ledger program",
      "build a block-based program that adds and displays transactions",
      "show persistence when testing and correcting a program",
    ], [
      "Learners build a Scratch project that stores transactions in a list",
      "Learners test adding, displaying and rejecting invalid entries",
      "Learners exchange projects and test one another's work",
    ]),
    ss("4.3 Tracing Goods Through a Supply Chain", 10, "How can a shared record prove where goods came from?", [
      "describe the stages of a supply chain and the records kept at each stage",
      "simulate recording a product's journey on a shared class ledger",
      "value transparency in the supply of goods",
    ], [
      "Learners map the journey of tea or milk from farm to shop",
      "Learners record each stage on a shared ledger with group signatures",
      "Learners test the record by tracing a product backwards",
    ]),
  ],
  [
    ss("5.1 Fraud and Consumer Awareness", 14, "How are people cheated in digital finance?", [
      "identify common digital financial frauds and how they work",
      "demonstrate the steps to take when a fraud is suspected",
      "show alertness to offers that promise quick riches",
    ], [
      "Learners examine sample fraudulent messages and adverts",
      "Learners role-play reporting a fraud to a guardian and to a helpline",
      "Learners prepare awareness materials for the school",
    ]),
    ss("5.2 Data Protection and Privacy", 14, "Who owns the information kept about us?", [
      "explain personal data rights under Kenyan data protection law",
      "audit the personal data a sample service collects",
      "value the protection of personal data",
    ], [
      "Learners read a simplified summary of the Data Protection Act 2019",
      "Learners list the data a common app requests and why",
      "Learners debate whether each request is necessary",
    ]),
    ss("5.3 Technology and the Environment", 14, "What does running a large computer network cost the planet?", [
      "explain the energy demands of large computer networks",
      "compare the energy use of different record-keeping methods",
      "show concern for the environmental cost of technology",
    ], [
      "Learners research energy use of data centres and networks",
      "Learners compare figures in a table and interpret them",
      "Learners debate how to reduce the environmental cost",
    ]),
    ss("5.4 Community Uses of Shared Records", 13, "How can shared records help our community?", [
      "identify community problems that shared records could solve",
      "design a community solution that uses a shared record",
      "appreciate the contribution of technology to community welfare",
    ], [
      "Learners identify problems such as land records or school fees receipts",
      "Learners design a shared-record solution in groups",
      "Learners present designs and receive feedback",
    ]),
  ],
]);

export const grade8Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Properties of a Good Record System", 9, "What makes a record system dependable?", [
      "state the properties of a dependable record system",
      "evaluate sample record systems against the stated properties",
      "value dependability in systems that hold important information",
    ], [
      "Learners list properties such as accuracy, availability and permanence",
      "Learners score sample systems against each property",
      "Learners justify their scores in class discussion",
    ]),
    ss("1.2 Decentralisation", 9, "What changes when no single person is in charge?", [
      "explain the meaning of decentralisation in a record system",
      "compare centralised, shared and decentralised arrangements",
      "appreciate the trade-offs of decentralised systems",
    ], [
      "Learners simulate the three arrangements in groups",
      "Learners record speed, cost and reliability of each",
      "Learners tabulate the trade-offs observed",
    ]),
    ss("1.3 Digital Identity", 10, "How do we prove who we are online?", [
      "describe methods of proving identity online",
      "demonstrate secure sign-in practices on a sample service",
      "value the protection of one's own digital identity",
    ], [
      "Learners list identity methods such as passwords and codes sent to phones",
      "Learners practise creating strong passwords and enabling extra checks",
      "Learners discuss the dangers of sharing login details",
    ]),
  ],
  [
    ss("2.1 Hash Functions", 9, "Why can a fingerprint of data not be reversed?", [
      "explain the purpose and properties of a hash function",
      "compute hashes of short messages using an online tool",
      "appreciate the role of hashing in securing information",
    ], [
      "Learners hash short texts and compare the outputs",
      "Learners change one character and observe the new hash",
      "Learners verify a file by comparing published hashes",
    ]),
    ss("2.2 Public and Private Keys", 9, "How can a message prove who sent it?", [
      "explain the roles of a public key and a private key",
      "demonstrate signing and verifying a message with a key pair",
      "value the secrecy of a private key",
    ], [
      "Learners generate a demonstration key pair with teacher guidance",
      "Learners sign a message and let a partner verify it",
      "Learners discuss the consequences of losing a private key",
    ]),
    ss("2.3 Consensus Mechanisms", 10, "How does a network agree without a leader?", [
      "describe common consensus mechanisms and how they differ",
      "simulate a consensus mechanism as a class activity",
      "appreciate the role of agreement rules in a network",
    ], [
      "Learners simulate proof of work using a dice or puzzle race",
      "Learners simulate a stake-based selection of a recorder",
      "Learners compare the speed and energy of each simulation",
    ]),
  ],
  [
    ss("3.1 Wallets and Addresses", 9, "Where is digital value actually kept?", [
      "explain the meaning of a wallet, an address and a balance",
      "demonstrate reading a public ledger entry in a test environment",
      "show care when handling wallet information",
    ], [
      "Learners examine a public test-network explorer with the teacher",
      "Learners trace a sample transaction between two addresses",
      "Learners discuss why a real private key is never shared or displayed",
    ]),
    ss("3.2 Stable and Unstable Digital Value", 9, "Why does the value of some digital assets change so fast?", [
      "explain why the value of some digital assets rises and falls sharply",
      "interpret a price chart of a volatile digital asset",
      "show caution towards assets whose value changes sharply",
    ], [
      "Learners read prepared price charts and describe the movements",
      "Learners calculate percentage changes over given periods",
      "Learners discuss the risk of relying on such value for savings",
    ]),
    ss("3.3 Digital Payments and Remittances", 10, "How does money move between countries?", [
      "describe how payments and remittances move between countries",
      "compare the cost and speed of different remittance channels",
      "appreciate the impact of remittances on Kenyan households",
    ], [
      "Learners compare published fees of remittance services",
      "Learners tabulate cost and time for a sample amount",
      "Learners discuss who benefits from cheaper transfers",
    ]),
  ],
  [
    ss("4.1 Introduction to Smart Contracts", 9, "What is a smart contract?", [
      "explain the meaning and purpose of a smart contract",
      "read a simple smart contract and state what it does",
      "appreciate the certainty provided by automated agreements",
    ], [
      "Learners read a short annotated smart contract with the teacher",
      "Learners state the conditions and the actions in the contract",
      "Learners rewrite the contract conditions in plain language",
    ]),
    ss("4.2 Programming Logic for Contracts", 9, "How do we express an agreement as code?", [
      "describe the logic structures used in contract code",
      "write pseudocode for a simple conditional agreement",
      "show accuracy when expressing rules as code",
    ], [
      "Learners write pseudocode for a deposit-and-release agreement",
      "Learners exchange pseudocode and identify unclear conditions",
      "Learners correct their pseudocode after peer review",
    ]),
    ss("4.3 Applications Beyond Money", 10, "What else can a shared ledger be used for?", [
      "identify uses of shared ledgers in health, land, education and agriculture",
      "investigate one Kenyan use case and report on it",
      "appreciate the wider value of the technology beyond money",
    ], [
      "Learners research documented uses such as certificate verification",
      "Learners prepare a short report on one use case",
      "Learners present findings and answer questions",
    ]),
  ],
  [
    ss("5.1 Regulation of Digital Assets in Kenya", 14, "Who makes the rules for digital assets?", [
      "identify the Kenyan authorities that regulate financial and digital services",
      "summarise the purpose of key rules affecting digital assets",
      "appreciate the role of regulation in protecting the public",
    ], [
      "Learners research the roles of the Central Bank and the Capital Markets Authority",
      "Learners summarise published guidance in their own words",
      "Learners debate why regulators issue warnings about digital assets",
    ]),
    ss("5.2 Crime and Misuse", 14, "How is the technology misused?", [
      "describe how digital assets are misused in crime",
      "analyse a documented case of misuse and its consequences",
      "show commitment to lawful use of technology",
    ], [
      "Learners study reported cases of fraud and money laundering",
      "Learners identify the warning signs present in each case",
      "Learners present the consequences faced by offenders",
    ]),
    ss("5.3 Financial Responsibility", 14, "How should young people handle money and risk?", [
      "explain the meaning of financial risk and responsible saving",
      "prepare a simple personal budget and savings plan",
      "commit to responsible handling of personal money",
    ], [
      "Learners prepare a monthly budget from a sample income",
      "Learners compare saving with risky quick-return schemes",
      "Learners set a personal savings goal and a plan to reach it",
    ]),
    ss("5.4 Debating the Technology", 13, "Is the technology good for society?", [
      "state arguments for and against the wide use of digital assets",
      "conduct a structured class debate on the technology",
      "show respect for opposing views in debate",
    ], [
      "Learners research arguments on both sides",
      "Learners hold a structured debate with assigned positions",
      "Learners write a personal reflection after the debate",
    ]),
  ],
]);

export const grade9Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Distributed Systems", 9, "How do many computers work as one system?", [
      "explain how computers in a network share and copy information",
      "simulate message passing between nodes in a network",
      "appreciate the reliability gained from many copies",
    ], [
      "Learners simulate a network passing updates between groups",
      "Learners introduce a delayed group and observe the effect",
      "Learners record how the network recovers",
    ]),
    ss("1.2 Public, Private and Permissioned Networks", 9, "Should everybody be allowed to join a network?", [
      "distinguish between public, private and permissioned networks",
      "match given scenarios to the most suitable network type",
      "appreciate the reasons organisations restrict access",
    ], [
      "Learners tabulate features of each network type",
      "Learners match scenarios such as a hospital or a public ledger",
      "Learners justify each match in class discussion",
    ]),
    ss("1.3 Value, Scarcity and Supply", 10, "Why is something scarce considered valuable?", [
      "explain how scarcity and demand affect value",
      "analyse supply data for a given asset",
      "show objectivity when judging claims about value",
    ], [
      "Learners compare supply limits of different assets",
      "Learners interpret supply and demand graphs",
      "Learners evaluate marketing claims about scarcity",
    ]),
  ],
  [
    ss("2.1 Cryptographic Signatures in Practice", 9, "How does a network verify a transaction?", [
      "describe how a signed transaction is verified by a network",
      "demonstrate signing and verifying on a test network",
      "value integrity in digital transactions",
    ], [
      "Learners use a teacher-provided test wallet to sign a message",
      "Learners verify a partner's signature and identify a forged one",
      "Learners record the verification steps in their notebooks",
    ]),
    ss("2.2 Mining, Validation and Fees", 9, "Who does the work of maintaining the network?", [
      "explain the roles of validators and the purpose of transaction fees",
      "calculate the cost of sample transactions from published fee data",
      "appreciate that maintaining a network has real costs",
    ], [
      "Learners read published fee data and tabulate it",
      "Learners calculate the cost of sending given amounts",
      "Learners discuss who pays and who receives the fees",
    ]),
    ss("2.3 Security Threats and Attacks", 10, "How can a network be attacked?", [
      "describe common attacks on networks and wallets",
      "assess a scenario and identify the attack being attempted",
      "show vigilance in protecting digital systems",
    ], [
      "Learners study attacks such as phishing and key theft",
      "Learners analyse scenario cards and name the attack",
      "Learners propose protective measures for each scenario",
    ]),
  ],
  [
    ss("3.1 Wallet Management and Key Safety", 9, "How is a digital wallet kept safe?", [
      "explain safe storage of keys and recovery phrases",
      "demonstrate secure setup of a test wallet under supervision",
      "commit to protecting keys and recovery information",
    ], [
      "Learners set up a test-network wallet with teacher guidance",
      "Learners practise secure recording of a recovery phrase offline",
      "Learners discuss the permanence of losing a key",
    ]),
    ss("3.2 Tokens, Coins and Unique Assets", 9, "How do different digital assets differ?", [
      "distinguish between coins, utility tokens, stablecoins and unique assets",
      "classify given assets into the correct category",
      "show discernment when evaluating new digital assets",
    ], [
      "Learners tabulate the features of each category",
      "Learners classify real examples using published information",
      "Learners identify assets whose category is unclear and explain why",
    ]),
    ss("3.3 Consumer Protection and Investment Risk", 10, "Why do regulators warn people about digital assets?", [
      "explain the risks of speculation and unregulated platforms",
      "analyse a failed platform and identify the warning signs",
      "show caution towards promises of guaranteed returns",
    ], [
      "Learners study documented collapses of digital asset platforms",
      "Learners list the warning signs present before each collapse",
      "Learners prepare a consumer protection checklist",
    ]),
  ],
  [
    ss("4.1 Reading and Testing Smart Contracts", 9, "What exactly does this contract do?", [
      "describe the structure of a smart contract",
      "trace the execution of a given contract for sample inputs",
      "show thoroughness when examining contract behaviour",
    ], [
      "Learners read annotated contracts of increasing length",
      "Learners trace execution with given inputs and predict outputs",
      "Learners compare predictions with actual test results",
    ]),
    ss("4.2 Building a Simple Contract", 9, "Can we write an agreement that runs itself?", [
      "state the steps in writing and deploying a simple contract",
      "write and test a simple contract in a browser test environment",
      "show persistence when correcting errors in code",
    ], [
      "Learners write a storage or voting contract in a test environment",
      "Learners deploy to a test network and call its functions",
      "Learners correct errors identified during testing",
    ]),
    ss("4.3 Decentralised Applications", 10, "How does an app connect to a shared ledger?", [
      "describe how an application interacts with a shared ledger",
      "demonstrate use of a sample decentralised application on a test network",
      "appreciate the design of applications without a central server",
    ], [
      "Learners use a teacher-approved test-network application",
      "Learners map the steps from user action to ledger record",
      "Learners compare the app with an ordinary online service",
    ]),
  ],
  [
    ss("5.1 Law and Compliance", 14, "What does the law require of digital asset users?", [
      "summarise Kenyan legal requirements affecting digital assets and data",
      "apply the requirements to given scenarios",
      "commit to compliance with the law",
    ], [
      "Learners study summaries of relevant Kenyan laws and guidance",
      "Learners judge scenarios as compliant or non-compliant",
      "Learners justify their judgements with reference to the rules",
    ]),
    ss("5.2 Identity, Inclusion and Exclusion", 14, "Who is left out of digital finance?", [
      "identify groups excluded from digital financial services",
      "investigate barriers to inclusion in the local community",
      "show concern for equitable access to digital services",
    ], [
      "Learners survey barriers such as cost, literacy and network coverage",
      "Learners tabulate findings by group",
      "Learners propose measures to improve inclusion",
    ]),
    ss("5.3 Sustainability of Networks", 14, "Can these networks be run sustainably?", [
      "compare the energy demands of different consensus mechanisms",
      "evaluate published sustainability claims of a network",
      "show responsibility towards sustainable technology use",
    ], [
      "Learners gather published energy data for two networks",
      "Learners compare the figures per transaction",
      "Learners evaluate the claims made by each network",
    ]),
    ss("5.4 Project: A Ledger Solution for the Community", 13, "How can we solve a local problem with a shared ledger?", [
      "state the requirements of a community problem suited to a shared ledger",
      "develop and present a prototype or detailed design",
      "show teamwork and initiative in project work",
    ], [
      "Learners select a local problem and gather requirements",
      "Learners build a prototype or a detailed design document",
      "Learners present the project to a panel of teachers and peers",
    ]),
  ],
]);
