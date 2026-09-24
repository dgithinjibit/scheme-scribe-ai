import type { StrandInfo } from "../types";
import { ss, build } from "./shared";

/**
 * Senior School Blockchain — Grades 10-12.
 * Grade 10: protocol internals and contract programming.
 * Grade 11: decentralised finance, tokenisation and application development.
 * Grade 12: enterprise systems, governance, regulation, capstone and careers.
 * Trading and speculation are studied as risk and regulation, never practised.
 */

export const grade10Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Architecture of Distributed Ledgers", 9, "How is a distributed ledger built?", [
      "describe the layers of a distributed ledger system",
      "draw and label the architecture of a named network",
      "appreciate the design decisions behind each layer",
    ], [
      "Learners study documentation of a named public network",
      "Learners draw labelled diagrams of its layers",
      "Learners compare two networks layer by layer",
    ]),
    ss("1.2 Network Nodes and Data Propagation", 9, "How does a transaction reach the whole network?", [
      "explain how transactions and blocks spread across nodes",
      "simulate propagation and measure delays in a class model",
      "value reliability in distributed communication",
    ], [
      "Learners model propagation with groups passing messages",
      "Learners measure the time for full propagation",
      "Learners discuss the effect of slow or dishonest nodes",
    ]),
    ss("1.3 Economics of Networks", 10, "What keeps participants honest?", [
      "explain the incentives that keep network participants honest",
      "analyse an incentive structure and identify its weak points",
      "appreciate the role of incentives in system design",
    ], [
      "Learners study reward and penalty structures of two networks",
      "Learners model outcomes of honest and dishonest behaviour",
      "Learners present the weak points they identified",
    ]),
  ],
  [
    ss("2.1 Applied Cryptography", 9, "Which cryptographic tools secure a ledger?", [
      "describe hashing, signatures and Merkle structures",
      "compute a Merkle root for a small set of transactions",
      "value precision in cryptographic work",
    ], [
      "Learners hash transactions and build a Merkle tree by hand",
      "Learners verify the inclusion of one transaction using a proof",
      "Learners repeat the exercise using a software tool",
    ]),
    ss("2.2 Consensus Algorithms Compared", 9, "Which consensus algorithm suits which purpose?", [
      "compare proof of work, proof of stake and permissioned consensus",
      "evaluate consensus algorithms against given requirements",
      "show objectivity when comparing competing designs",
    ], [
      "Learners tabulate security, speed, cost and energy for each",
      "Learners evaluate each against given case requirements",
      "Learners defend their recommendation in a class session",
    ]),
    ss("2.3 Scalability and Layered Solutions", 10, "How can a network serve millions of users?", [
      "explain scalability limits and the solutions used to overcome them",
      "analyse published throughput data for named networks",
      "appreciate the trade-offs between speed, cost and security",
    ], [
      "Learners gather throughput and fee data for named networks",
      "Learners plot and interpret the data",
      "Learners explain the trade-offs behind each solution",
    ]),
  ],
  [
    ss("3.1 Token Standards", 9, "What rules must a token follow?", [
      "describe common token standards and their purposes",
      "compare standards for interchangeable and unique tokens",
      "value standardisation in technology",
    ], [
      "Learners read documentation of common token standards",
      "Learners tabulate required functions of each standard",
      "Learners identify which standard fits given use cases",
    ]),
    ss("3.2 Stablecoins and Digital Currencies", 9, "Can a digital asset hold a steady value?", [
      "explain how stablecoins and central bank digital currencies are designed",
      "analyse the backing arrangements of a named stablecoin",
      "show discernment when assessing claims of stability",
    ], [
      "Learners study published reserve reports of a stablecoin",
      "Learners compare designs backed by reserves and by algorithms",
      "Learners explain how each design can fail",
    ]),
    ss("3.3 Markets, Risk and Regulation", 10, "Why are digital asset markets treated as high risk?", [
      "explain market risk, liquidity and the purpose of market regulation",
      "analyse historical market data and a documented market failure",
      "show caution and restraint towards speculative markets",
    ], [
      "Learners analyse prepared historical price and volume data",
      "Learners study a documented market failure and its causes",
      "Learners present investor protections that were missing",
    ]),
  ],
  [
    ss("4.1 Smart Contract Programming", 9, "How is a production contract written?", [
      "describe the syntax and structure of a smart contract language",
      "write contracts with state, functions and access control",
      "show discipline in writing clear and correct code",
    ], [
      "Learners write contracts in a browser development environment",
      "Learners add access control and events to their contracts",
      "Learners review one another's code against a checklist",
    ]),
    ss("4.2 Testing and Deployment", 9, "How do we know a contract is correct before release?", [
      "explain the stages of testing and deployment",
      "write and run unit tests for a contract on a test network",
      "value thorough testing before release",
    ], [
      "Learners write unit tests covering normal and edge cases",
      "Learners deploy to a test network and record results",
      "Learners document defects found and fixed",
    ]),
    ss("4.3 Contract Security", 10, "How are contracts exploited?", [
      "describe common smart contract vulnerabilities",
      "audit a vulnerable contract and repair the defects",
      "show responsibility for the security of released code",
    ], [
      "Learners study documented exploits and their causes",
      "Learners audit a deliberately vulnerable contract",
      "Learners repair the defects and retest",
    ]),
  ],
  [
    ss("5.1 Regulatory Frameworks", 14, "How are digital assets regulated in Kenya and abroad?", [
      "summarise Kenyan and international approaches to digital asset regulation",
      "compare two regulatory approaches against stated objectives",
      "appreciate the purpose of financial regulation",
    ], [
      "Learners research published Kenyan guidance and one foreign framework",
      "Learners tabulate obligations imposed by each",
      "Learners debate which approach better protects the public",
    ]),
    ss("5.2 Anti-Money Laundering and Traceability", 14, "Can transactions on a public ledger be traced?", [
      "explain how transactions are traced and how obligations apply to service providers",
      "trace a sample transaction chain on a public explorer",
      "commit to lawful and transparent use of the technology",
    ], [
      "Learners trace sample transaction chains on a public explorer",
      "Learners summarise obligations placed on service providers",
      "Learners discuss the limits of anonymity on public ledgers",
    ]),
    ss("5.3 Ethics of Decentralisation", 14, "Who is accountable when no one is in charge?", [
      "explain accountability challenges in decentralised systems",
      "analyse a case where accountability was unclear",
      "show ethical reasoning when technology outpaces the law",
    ], [
      "Learners study a case of a failed decentralised organisation",
      "Learners identify who should have been accountable",
      "Learners write a reasoned position paper",
    ]),
    ss("5.4 Environmental and Social Impact", 13, "What is the wider impact of these systems?", [
      "describe the environmental and social impacts of ledger networks",
      "assess the impact of a named network using published data",
      "show responsibility towards sustainable and fair technology",
    ], [
      "Learners gather published environmental data for a network",
      "Learners assess social impacts reported in credible sources",
      "Learners present a balanced impact assessment",
    ]),
  ],
]);

export const grade11Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Interoperability Between Networks", 9, "How do separate networks work together?", [
      "explain how assets and data move between networks",
      "compare bridging approaches and their risks",
      "appreciate the complexity of connecting systems",
    ], [
      "Learners study documentation of two bridging approaches",
      "Learners map the steps of a cross-network transfer",
      "Learners list the points at which failure could occur",
    ]),
    ss("1.2 Privacy Preserving Technologies", 9, "Can a transaction be private and verifiable?", [
      "explain privacy techniques including zero-knowledge proofs",
      "demonstrate a simple zero-knowledge proof analogy",
      "value the balance between privacy and accountability",
    ], [
      "Learners perform a classroom analogy of a zero-knowledge proof",
      "Learners read a simplified account of the technique",
      "Learners debate privacy against lawful oversight",
    ]),
    ss("1.3 Governance of Networks", 10, "Who decides how a network changes?", [
      "describe on-chain and off-chain governance mechanisms",
      "analyse a governance proposal and its outcome",
      "appreciate participatory decision-making",
    ], [
      "Learners read a published governance proposal",
      "Learners simulate a governance vote in class",
      "Learners evaluate the fairness of the process",
    ]),
  ],
  [
    ss("2.1 Advanced Contract Patterns", 9, "How are large contract systems organised?", [
      "describe common design patterns used in contract systems",
      "implement a pattern such as upgradeability or a factory",
      "show rigour in applying established patterns",
    ], [
      "Learners study documented contract design patterns",
      "Learners implement one pattern in a test environment",
      "Learners explain why the pattern was needed",
    ]),
    ss("2.2 Oracles and External Data", 9, "How does a contract learn about the outside world?", [
      "explain the role and risks of oracles",
      "build a contract that consumes data from a test oracle",
      "value accuracy of data used in automated decisions",
    ], [
      "Learners connect a test contract to a sample data feed",
      "Learners test contract behaviour with faulty data",
      "Learners propose safeguards against bad data",
    ]),
    ss("2.3 Performance and Cost Optimisation", 10, "How do we make a contract cheaper to run?", [
      "explain how execution cost is calculated",
      "optimise a contract to reduce its execution cost",
      "show efficiency-mindedness in engineering work",
    ], [
      "Learners measure execution cost of a sample contract",
      "Learners apply optimisations and measure again",
      "Learners document the savings achieved",
    ]),
  ],
  [
    ss("3.1 Decentralised Finance Mechanisms", 9, "How do lending and exchange work without a bank?", [
      "describe lending, exchange and liquidity mechanisms",
      "model the mechanics of an automated exchange using a spreadsheet",
      "show caution towards unregulated financial products",
    ], [
      "Learners model a constant-product exchange in a spreadsheet",
      "Learners simulate lending with collateral and liquidation",
      "Learners identify the risks borne by each participant",
    ]),
    ss("3.2 Tokenisation of Real Assets", 9, "Can land, shares or crops be represented as tokens?", [
      "explain tokenisation of physical and financial assets",
      "design a tokenisation scheme for a Kenyan asset class",
      "appreciate the legal requirements behind ownership claims",
    ], [
      "Learners study documented tokenisation projects",
      "Learners design a scheme for an asset such as warehouse receipts",
      "Learners identify the legal steps their scheme would require",
    ]),
    ss("3.3 Risk Analysis and Consumer Protection", 10, "How is risk measured and disclosed?", [
      "explain methods of measuring and disclosing financial risk",
      "prepare a risk assessment for a given digital finance product",
      "commit to honest disclosure of risk to others",
    ], [
      "Learners assess a documented product against a risk framework",
      "Learners prepare a plain-language risk disclosure",
      "Learners critique marketing material that hides risk",
    ]),
  ],
  [
    ss("4.1 Full Application Development", 9, "How is a complete decentralised application built?", [
      "describe the components of a decentralised application",
      "build an interface that reads from and writes to a test network",
      "show perseverance in completing a development task",
    ], [
      "Learners build a web interface connected to their contract",
      "Learners handle wallet connection and transaction states",
      "Learners test the full flow on a test network",
    ]),
    ss("4.2 Identity and Credentials", 9, "How can certificates be verified without a central office?", [
      "explain verifiable credentials and decentralised identity",
      "build a certificate verification prototype",
      "value integrity in the issuing of credentials",
    ], [
      "Learners design a school certificate verification scheme",
      "Learners implement issuing and verification on a test network",
      "Learners test forged and genuine certificates",
    ]),
    ss("4.3 Integration with Existing Systems", 10, "How does this technology fit into systems we already use?", [
      "describe integration of ledger systems with existing databases and payments",
      "design an integration for a named Kenyan service",
      "appreciate the constraints of existing infrastructure",
    ], [
      "Learners map an existing service and its data flows",
      "Learners design where a ledger component would fit",
      "Learners present the design with its risks and benefits",
    ]),
  ],
  [
    ss("5.1 Digital Asset Law in Practice", 14, "What must a business do to operate lawfully?", [
      "summarise licensing, reporting and tax obligations for digital asset businesses",
      "apply the obligations to a sample business plan",
      "commit to lawful conduct in enterprise",
    ], [
      "Learners research published obligations for service providers",
      "Learners audit a sample business plan against them",
      "Learners present a compliance checklist",
    ]),
    ss("5.2 Fraud Investigation", 14, "How are digital asset crimes investigated?", [
      "describe investigative techniques used to trace illicit transactions",
      "trace a prepared case study on a public explorer",
      "show integrity and objectivity in investigation",
    ], [
      "Learners follow a prepared case study transaction trail",
      "Learners document their findings in an investigation report",
      "Learners present conclusions supported by evidence",
    ]),
    ss("5.3 Digital Sovereignty and Development", 14, "What does this technology mean for Kenya?", [
      "explain the implications of digital assets for national development and sovereignty",
      "evaluate arguments for and against national adoption",
      "appreciate national interests in technology policy",
    ], [
      "Learners research national positions from credible sources",
      "Learners evaluate the arguments presented by each side",
      "Learners write a policy brief addressed to a ministry",
    ]),
    ss("5.4 Responsible Innovation", 13, "How do we innovate without harming people?", [
      "state principles of responsible technology innovation",
      "apply the principles to review a proposed product",
      "show commitment to protecting users of the technology built",
    ], [
      "Learners study published responsible innovation principles",
      "Learners review a proposed product against the principles",
      "Learners revise the proposal to address the gaps found",
    ]),
  ],
]);

export const grade12Blockchain: StrandInfo[] = build([
  [
    ss("1.1 Enterprise Ledger Systems", 9, "How do organisations use shared ledgers?", [
      "describe enterprise ledger platforms and their typical uses",
      "compare an enterprise platform with a public network",
      "appreciate the needs of organisations adopting the technology",
    ], [
      "Learners study documentation of an enterprise platform",
      "Learners tabulate differences from a public network",
      "Learners recommend a platform for given scenarios",
    ]),
    ss("1.2 Systems Thinking and Adoption", 9, "Why do good technologies fail to be adopted?", [
      "explain factors affecting technology adoption in organisations",
      "analyse a failed and a successful adoption case",
      "appreciate human factors in technology change",
    ], [
      "Learners study one successful and one failed adoption case",
      "Learners identify technical and human causes in each",
      "Learners present lessons for future projects",
    ]),
    ss("1.3 Research Methods in Technology", 10, "How do we investigate a technology question properly?", [
      "describe research methods suitable for technology investigations",
      "prepare a research plan for a chosen question",
      "value evidence-based conclusions",
    ], [
      "Learners frame a researchable question in the learning area",
      "Learners prepare a plan with methods and sources",
      "Learners present the plan for peer critique",
    ]),
  ],
  [
    ss("2.1 Protocol Design", 9, "How would we design a network of our own?", [
      "describe the decisions involved in designing a ledger protocol",
      "specify a protocol design for a stated requirement",
      "show creativity and rigour in design work",
    ], [
      "Learners state requirements for a chosen application domain",
      "Learners specify consensus, block structure and incentives",
      "Learners defend their design decisions to the class",
    ]),
    ss("2.2 Security Engineering", 9, "How do we secure a whole system, not just the code?", [
      "describe threat modelling for a ledger-based system",
      "conduct a threat model for a given system",
      "show responsibility for the safety of users and their assets",
    ], [
      "Learners apply a threat modelling method to a sample system",
      "Learners rank threats by likelihood and impact",
      "Learners propose controls for the highest ranked threats",
    ]),
    ss("2.3 Emerging Developments", 10, "What is changing in this field right now?", [
      "identify current developments in distributed ledger technology",
      "evaluate a recent development using credible sources",
      "show openness to continuous learning in a fast-changing field",
    ], [
      "Learners review recent credible publications and releases",
      "Learners evaluate one development and its likely impact",
      "Learners present findings with cited sources",
    ]),
  ],
  [
    ss("3.1 Digital Asset Enterprise", 9, "How is a lawful digital asset business built?", [
      "describe business models in the digital asset sector",
      "prepare a business model canvas for a lawful venture",
      "appreciate lawful and sustainable enterprise",
    ], [
      "Learners study business models of licensed service providers",
      "Learners prepare a business model canvas in groups",
      "Learners present the model and its revenue sources",
    ]),
    ss("3.2 Financial Reporting and Taxation", 9, "How are digital assets accounted for?", [
      "explain accounting and tax treatment of digital assets in Kenya",
      "prepare sample records and tax computations for given transactions",
      "commit to accurate financial reporting",
    ], [
      "Learners record sample transactions in a ledger",
      "Learners compute tax due using published rules",
      "Learners review one another's computations",
    ]),
    ss("3.3 Financial Inclusion and Development", 10, "Can this technology serve those left out?", [
      "explain how ledger technology can extend financial services",
      "evaluate a documented inclusion project",
      "show concern for equitable access to financial services",
    ], [
      "Learners study documented inclusion projects in Africa",
      "Learners evaluate outcomes against stated goals",
      "Learners propose improvements for the Kenyan context",
    ]),
  ],
  [
    ss("4.1 Capstone Project Planning", 9, "What will we build and why?", [
      "state the problem, users and requirements of a capstone project",
      "prepare a project plan with milestones and deliverables",
      "show initiative and planning discipline",
    ], [
      "Learners select a problem and gather user requirements",
      "Learners prepare a plan with milestones and responsibilities",
      "Learners submit the plan for approval",
    ]),
    ss("4.2 Capstone Development", 9, "Can we build it to a working standard?", [
      "describe the architecture of the solution being built",
      "build and test the capstone solution to the agreed plan",
      "show perseverance and teamwork through a long project",
    ], [
      "Learners build contracts, interface and tests iteratively",
      "Learners keep a development log and track defects",
      "Learners hold weekly progress reviews",
    ]),
    ss("4.3 Capstone Evaluation and Presentation", 10, "Does the solution meet the need?", [
      "state the criteria for evaluating the solution",
      "evaluate the solution with users and present the findings",
      "show openness to feedback and improvement",
    ], [
      "Learners test the solution with intended users",
      "Learners record feedback and measure against the criteria",
      "Learners present the project and evaluation to a panel",
    ]),
  ],
  [
    ss("5.1 Global Policy and Standards", 14, "How is the world governing this technology?", [
      "summarise international standards and policy positions",
      "compare national policies against international guidance",
      "appreciate cooperation in governing global technology",
    ], [
      "Learners study international standards and policy statements",
      "Learners compare two national approaches against them",
      "Learners present a comparative summary",
    ]),
    ss("5.2 Professional Ethics and Conduct", 14, "What conduct is expected of a professional?", [
      "state professional codes of conduct in computing and finance",
      "apply a code of conduct to given workplace dilemmas",
      "commit to professional integrity in future work",
    ], [
      "Learners study published professional codes",
      "Learners resolve dilemma cases using the code",
      "Learners write a personal statement of professional conduct",
    ]),
    ss("5.3 Careers and Pathways", 14, "Where can this learning lead?", [
      "identify careers, further study and certification pathways",
      "prepare a personal career pathway plan with a portfolio",
      "show ambition and realism in career planning",
    ], [
      "Learners research roles such as developer, analyst and compliance officer",
      "Learners prepare a portfolio of their projects",
      "Learners present a pathway plan with the next steps",
    ]),
    ss("5.4 The Future of Trust Technology", 13, "What should this technology become?", [
      "state informed predictions about the future of trust technologies",
      "defend a reasoned position on the future of the technology",
      "show critical and independent thinking about technology futures",
    ], [
      "Learners review credible forecasts and critiques",
      "Learners write a reasoned position paper",
      "Learners hold a closing symposium with invited guests",
    ]),
  ],
]);
