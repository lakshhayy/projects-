export interface Subject {
  id: string;
  code: string;
  name: string;
  semester: number;
  type: "Core" | "Elective" | "Lab" | "Project" | "Internship";
  credits: number;
  description: string;
}

export const subjects: Subject[] = [
  // FIRST SEMESTER
  {
    id: "mth24101",
    code: "MTH 24101",
    name: "Mathematics I",
    semester: 1,
    type: "Core",
    credits: 4,
    description: "Calculus including limits, continuity, differentiation, and integration."
  },
  {
    id: "phy24102",
    code: "PHY 24102",
    name: "Physics",
    semester: 1,
    type: "Core",
    credits: 3,
    description: "Engineering physics covering mechanics, waves, and optics."
  },
  {
    id: "chy24107",
    code: "CHY 24107",
    name: "Engineering Chemistry",
    semester: 1,
    type: "Core",
    credits: 3,
    description: "Chemical principles and applications in engineering."
  },
  {
    id: "ce24103",
    code: "CE 24103",
    name: "Engineering Mechanics",
    semester: 1,
    type: "Core",
    credits: 4,
    description: "Statics, dynamics, and mechanics of rigid bodies."
  },
  {
    id: "ee24108",
    code: "EE 24108",
    name: "Basic Electrical & Electronics Engineering",
    semester: 1,
    type: "Core",
    credits: 4,
    description: "Electrical circuits, semiconductors, and basic electronics."
  },
  {
    id: "me24104",
    code: "ME 24104",
    name: "Engineering Graphics",
    semester: 1,
    type: "Core",
    credits: 1,
    description: "Orthographic projection, technical drawing, and visualization."
  },
  {
    id: "me24109",
    code: "ME 24109",
    name: "Manufacturing Science",
    semester: 1,
    type: "Core",
    credits: 1,
    description: "Manufacturing processes and industrial production methods."
  },
  {
    id: "cse24105",
    code: "CSE 24105",
    name: "Computer Programming & Problem Solving",
    semester: 1,
    type: "Core",
    credits: 2,
    description: "Introduction to programming concepts and problem-solving techniques."
  },
  {
    id: "chy24110",
    code: "CHY 24110",
    name: "Environmental Science",
    semester: 1,
    type: "Core",
    credits: 2,
    description: "Environmental awareness, pollution, and sustainability."
  },
  {
    id: "hum24106",
    code: "HUM 24106",
    name: "Communication Skills",
    semester: 1,
    type: "Core",
    credits: 1,
    description: "Technical communication and professional writing skills."
  },
  {
    id: "bse24111",
    code: "BSE 24111",
    name: "Biology for Engineers",
    semester: 1,
    type: "Core",
    credits: 2,
    description: "Basic biology concepts relevant to engineering."
  },
  {
    id: "ce24121",
    code: "CE 24121",
    name: "Engineering Mechanics Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Laboratory experiments on mechanical principles."
  },
  {
    id: "ee24125",
    code: "EE 24125",
    name: "Basic Electrical & Electronics Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Practical work on electrical circuits and electronic components."
  },
  {
    id: "phy24122",
    code: "PHY 24122",
    name: "Physics Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Physics laboratory experiments."
  },
  {
    id: "chy24126",
    code: "CHY 24126",
    name: "Engineering Chemistry Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Chemistry laboratory work and experiments."
  },
  {
    id: "me24123",
    code: "ME 24123",
    name: "Engineering Graphics Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Practical application of drawing and design principles."
  },
  {
    id: "me24127",
    code: "ME 24127",
    name: "Manufacturing Science Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Laboratory work on manufacturing processes."
  },
  {
    id: "cse24124",
    code: "CSE 24124",
    name: "Computer Programming Lab",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Programming practice and coding exercises."
  },
  {
    id: "hum24128",
    code: "HUM 24128",
    name: "Language Laboratory",
    semester: 1,
    type: "Lab",
    credits: 1,
    description: "Language and communication practice sessions."
  },
  {
    id: "sas24141",
    code: "SAS 24141",
    name: "Life Skill Management / Physical",
    semester: 1,
    type: "Core",
    credits: 1,
    description: "Life skills development and physical fitness activities."
  },
  {
    id: "sas24142",
    code: "SAS 24142",
    name: "NSS / Yoga",
    semester: 1,
    type: "Core",
    credits: 1,
    description: "National Service Scheme activities and yoga practice."
  },
  {
    id: "ncc24151",
    code: "NCC 24151",
    name: "National Cadet Corps I",
    semester: 1,
    type: "Core",
    credits: 2,
    description: "NCC training and development program."
  },

  // SECOND SEMESTER
  {
    id: "mth24102",
    code: "MTH 24102",
    name: "Mathematics II",
    semester: 2,
    type: "Core",
    credits: 4,
    description: "Advanced calculus, differential equations, and linear algebra basics."
  },
  {
    id: "chy24107b",
    code: "CHY 24107",
    name: "Engineering Chemistry",
    semester: 2,
    type: "Core",
    credits: 3,
    description: "Chemical principles and applications in engineering."
  },
  {
    id: "phy24102b",
    code: "PHY 24102",
    name: "Physics",
    semester: 2,
    type: "Core",
    credits: 3,
    description: "Engineering physics covering mechanics, waves, and optics."
  },
  {
    id: "ee24108b",
    code: "EE 24108",
    name: "Basic Electrical & Electronics Engineering",
    semester: 2,
    type: "Core",
    credits: 4,
    description: "Electrical circuits, semiconductors, and basic electronics."
  },
  {
    id: "ce24103b",
    code: "CE 24103",
    name: "Engineering Mechanics",
    semester: 2,
    type: "Core",
    credits: 4,
    description: "Statics, dynamics, and mechanics of rigid bodies."
  },
  {
    id: "me24109b",
    code: "ME 24109",
    name: "Manufacturing Science",
    semester: 2,
    type: "Core",
    credits: 1,
    description: "Manufacturing processes and industrial production methods."
  },
  {
    id: "me24104b",
    code: "ME 24104",
    name: "Engineering Graphics",
    semester: 2,
    type: "Core",
    credits: 1,
    description: "Orthographic projection, technical drawing, and visualization."
  },
  {
    id: "chy24110b",
    code: "CHY 24110",
    name: "Environmental Science",
    semester: 2,
    type: "Core",
    credits: 2,
    description: "Environmental awareness, pollution, and sustainability."
  },
  {
    id: "cse24105b",
    code: "CSE 24105",
    name: "Computer Programming & Problem Solving",
    semester: 2,
    type: "Core",
    credits: 2,
    description: "Introduction to programming concepts and problem-solving techniques."
  },
  {
    id: "bse24111b",
    code: "BSE 24111",
    name: "Biology for Engineers",
    semester: 2,
    type: "Core",
    credits: 2,
    description: "Basic biology concepts relevant to engineering."
  },
  {
    id: "hum24106b",
    code: "HUM 24106",
    name: "Communication Skills",
    semester: 2,
    type: "Core",
    credits: 1,
    description: "Technical communication and professional writing skills."
  },
  {
    id: "chy24125",
    code: "CHY 24125",
    name: "Engineering Chemistry Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Chemistry laboratory work and experiments."
  },
  {
    id: "phy24121",
    code: "PHY 24121",
    name: "Physics Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Physics laboratory experiments."
  },
  {
    id: "ee24126",
    code: "EE 24126",
    name: "Basic Electrical & Electronics Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Practical work on electrical circuits and electronic components."
  },
  {
    id: "ce24122",
    code: "CE 24122",
    name: "Engineering Mechanics Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Laboratory experiments on mechanical principles."
  },
  {
    id: "me24127b",
    code: "ME 24127",
    name: "Manufacturing Science / Engineering Graphics Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Laboratory work on manufacturing processes and technical drawing."
  },
  {
    id: "me24123b",
    code: "ME 24123",
    name: "Engineering Graphics Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Practical application of drawing and design principles."
  },
  {
    id: "hum24128b",
    code: "HUM 24128",
    name: "Language Laboratory",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Language and communication practice sessions."
  },
  {
    id: "cse24124b",
    code: "CSE 24124",
    name: "Computer Programming Lab",
    semester: 2,
    type: "Lab",
    credits: 1,
    description: "Programming practice and coding exercises."
  },
  {
    id: "sas24143",
    code: "SAS 24143",
    name: "NSS / Yoga",
    semester: 2,
    type: "Core",
    credits: 1,
    description: "National Service Scheme activities and yoga practice."
  },
  {
    id: "sas24144",
    code: "SAS 24144",
    name: "Life Skill Management / Physical",
    semester: 2,
    type: "Core",
    credits: 1,
    description: "Life skills development and physical fitness activities."
  },
  {
    id: "ncc24152",
    code: "NCC 24152",
    name: "National Cadet Corps II",
    semester: 2,
    type: "Core",
    credits: 2,
    description: "NCC training and development program."
  },

  // THIRD SEMESTER (CSE Specific)
  {
    id: "cse24231",
    code: "CSE 24231",
    name: "Discrete Mathematics",
    semester: 3,
    type: "Core",
    credits: 4,
    description: "Mathematical foundations for computer science including logic, sets, and graph theory."
  },
  {
    id: "me24252",
    code: "ME 24252",
    name: "Fundamental of Design Methods",
    semester: 3,
    type: "Core",
    credits: 3,
    description: "Design methodology and principles for engineering applications."
  },
  {
    id: "cse24211",
    code: "CSE 24211",
    name: "Data Structures",
    semester: 3,
    type: "Core",
    credits: 3,
    description: "Arrays, linked lists, stacks, queues, trees, and graphs with practical implementations."
  },
  {
    id: "cse24212",
    code: "CSE 24212",
    name: "Data Base Management Systems",
    semester: 3,
    type: "Core",
    credits: 3,
    description: "Database design, normalization, SQL, and transaction management."
  },
  {
    id: "cse24213",
    code: "CSE 24213",
    name: "Principles of Programming Languages",
    semester: 3,
    type: "Core",
    credits: 3,
    description: "Language design concepts, paradigms, syntax, and semantics."
  },
  {
    id: "cse24214",
    code: "CSE 24214",
    name: "Digital Circuit Design",
    semester: 3,
    type: "Core",
    credits: 3,
    description: "Digital logic, combinational circuits, sequential circuits, and hardware design."
  },
  {
    id: "cse24215",
    code: "CSE 24215",
    name: "Data Structures Lab",
    semester: 3,
    type: "Lab",
    credits: 1,
    description: "Practical implementation of data structures in C/C++."
  },
  {
    id: "cse24216",
    code: "CSE 24216",
    name: "Database Management Systems Lab",
    semester: 3,
    type: "Lab",
    credits: 1,
    description: "Hands-on experience with SQL and database design using various tools."
  },
  {
    id: "cse24217",
    code: "CSE 24217",
    name: "Programming Languages & Digital Circuits Lab",
    semester: 3,
    type: "Lab",
    credits: 1,
    description: "Lab work on programming language concepts and digital circuit design."
  },
  {
    id: "cse24218",
    code: "CSE 24218",
    name: "Professional Practices",
    semester: 3,
    type: "Core",
    credits: 2,
    description: "Professional ethics, communication, and industry practices in software development."
  },

  // FOURTH SEMESTER (CSE Specific)
  {
    id: "hum24251",
    code: "HUM 24251",
    name: "Fundamentals of Entrepreneurship",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "Business planning, venture creation, and entrepreneurial mindset development."
  },
  {
    id: "cse24221",
    code: "CSE 24221",
    name: "Software Engineering",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "Software development lifecycle, requirements analysis, design patterns, and testing."
  },
  {
    id: "cse24222",
    code: "CSE 24222",
    name: "Computer System Organization",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "CPU architecture, memory hierarchy, instruction sets, and I/O systems."
  },
  {
    id: "cse24223",
    code: "CSE 24223",
    name: "Theory of Computation",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "Automata theory, formal languages, Turing machines, and computational complexity."
  },
  {
    id: "cse24224",
    code: "CSE 24224",
    name: "Data Communication",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "Signal transmission, protocols, and fundamentals of data communication networks."
  },
  {
    id: "cse24225",
    code: "CSE 24225",
    name: "Algorithm Design & Analysis",
    semester: 4,
    type: "Core",
    credits: 3,
    description: "Algorithm design techniques, complexity analysis, sorting, searching, and dynamic programming."
  },
  {
    id: "cse24226",
    code: "CSE 24226",
    name: "Algorithm Design & Analysis Lab",
    semester: 4,
    type: "Lab",
    credits: 1,
    description: "Implementation and analysis of algorithms with performance evaluation."
  },
  {
    id: "cse24227",
    code: "CSE 24227",
    name: "Computer System Organization Lab",
    semester: 4,
    type: "Lab",
    credits: 1,
    description: "Practical work on processor architecture and system design."
  },
  {
    id: "cse24228",
    code: "CSE 24228",
    name: "Project Phase 1",
    semester: 4,
    type: "Project",
    credits: 2,
    description: "First phase of capstone project development."
  },

  // FIFTH SEMESTER (CSE Specific)
  {
    id: "cse24310",
    code: "CSE 24310",
    name: "Artificial Intelligence",
    semester: 5,
    type: "Core",
    credits: 3,
    description: "AI fundamentals, search algorithms, knowledge representation, and reasoning systems."
  },
  {
    id: "cse24311",
    code: "CSE 24311",
    name: "Data Warehousing & Mining",
    semester: 5,
    type: "Core",
    credits: 3,
    description: "Data warehouse architecture, ETL processes, data mining techniques, and pattern discovery."
  },
  {
    id: "cse24312",
    code: "CSE 24312",
    name: "Operating Systems",
    semester: 5,
    type: "Core",
    credits: 3,
    description: "Process management, memory management, file systems, and concurrency control."
  },
  {
    id: "cse24313",
    code: "CSE 24313",
    name: "Statistical Models for Data Interpretation & Analysis",
    semester: 5,
    type: "Core",
    credits: 3,
    description: "Probability distributions, statistical testing, regression, and data analysis."
  },
  {
    id: "cse24314",
    code: "CSE 24314",
    name: "Computer Networks",
    semester: 5,
    type: "Core",
    credits: 3,
    description: "OSI model, TCP/IP, routing algorithms, switching, and network protocols."
  },
  {
    id: "cse24315",
    code: "CSE 24315",
    name: "AI & Data Warehousing/Mining Lab",
    semester: 5,
    type: "Lab",
    credits: 1,
    description: "Practical implementation of AI and data mining algorithms."
  },
  {
    id: "cse24316",
    code: "CSE 24316",
    name: "Operating Systems Lab",
    semester: 5,
    type: "Lab",
    credits: 1,
    description: "Hands-on experience with OS concepts and system programming."
  },
  {
    id: "cse24317",
    code: "CSE 24317",
    name: "Computer Networks Lab",
    semester: 5,
    type: "Lab",
    credits: 1,
    description: "Network simulation and protocol implementation practice."
  },
  {
    id: "cse24318",
    code: "CSE 24318",
    name: "Internship / Industrial Training",
    semester: 5,
    type: "Internship",
    credits: 1,
    description: "Industrial training and hands-on experience with industry practices."
  },
  {
    id: "cse24319",
    code: "CSE 24319",
    name: "Project Phase 2",
    semester: 5,
    type: "Project",
    credits: 2,
    description: "Second phase of capstone project development."
  },

  // SIXTH SEMESTER (CSE Specific)
  {
    id: "me24351",
    code: "ME 24351",
    name: "Engineering Management",
    semester: 6,
    type: "Core",
    credits: 3,
    description: "Project management, resource planning, and organizational management."
  },
  {
    id: "cse24321",
    code: "CSE 24321",
    name: "Network & System Securities",
    semester: 6,
    type: "Core",
    credits: 3,
    description: "Security threats, cryptography, firewalls, and secure system design."
  },
  {
    id: "cse24322",
    code: "CSE 24322",
    name: "Compiler Design",
    semester: 6,
    type: "Core",
    credits: 3,
    description: "Lexical analysis, parsing, code generation, and optimization techniques."
  },
  {
    id: "cse24323",
    code: "CSE 24323",
    name: "Machine Learning",
    semester: 6,
    type: "Core",
    credits: 3,
    description: "Supervised and unsupervised learning, neural networks, and classification algorithms."
  },
  {
    id: "cse24324",
    code: "CSE 24324",
    name: "Machine Learning Lab",
    semester: 6,
    type: "Lab",
    credits: 1,
    description: "Implementation of machine learning algorithms using popular libraries."
  },
  {
    id: "cse24325",
    code: "CSE 24325",
    name: "Compiler Design Lab",
    semester: 6,
    type: "Lab",
    credits: 1,
    description: "Practical implementation of compiler design concepts."
  },
  {
    id: "cse24326",
    code: "CSE 24326",
    name: "Network & System Securities Lab",
    semester: 6,
    type: "Lab",
    credits: 1,
    description: "Hands-on practice with security tools and protocols."
  },
  {
    id: "cse24327",
    code: "CSE 24327",
    name: "Project Phase 3",
    semester: 6,
    type: "Project",
    credits: 2,
    description: "Third phase of capstone project development."
  },

  // SEVENTH SEMESTER (CSE Specific)
  {
    id: "hum24451",
    code: "HUM 24451",
    name: "Engineering Economics and IPR",
    semester: 7,
    type: "Core",
    credits: 3,
    description: "Economic analysis, cost estimation, and intellectual property rights."
  },
  {
    id: "cse24411",
    code: "CSE 24411",
    name: "Computer Vision & Image Processing",
    semester: 7,
    type: "Core",
    credits: 3,
    description: "Image processing techniques, feature extraction, and computer vision applications."
  },
  {
    id: "cse24412",
    code: "CSE 24412",
    name: "Computer Vision & Image Processing Lab",
    semester: 7,
    type: "Lab",
    credits: 1,
    description: "Practical implementation of computer vision and image processing algorithms."
  },
  {
    id: "cse24413",
    code: "CSE 24413",
    name: "Project Phase 4",
    semester: 7,
    type: "Project",
    credits: 2,
    description: "Fourth phase of capstone project development."
  },
  {
    id: "cse24414",
    code: "CSE 24414",
    name: "Industrial / Field Training",
    semester: 7,
    type: "Internship",
    credits: 1,
    description: "Field training and practical industrial experience."
  },

  // ELECTIVES - THIRD YEAR (Departmental)
  {
    id: "cse24351",
    code: "CSE 24351",
    name: "Advanced Computer Architecture",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Advanced concepts in processor design and system architecture."
  },
  {
    id: "cse24352",
    code: "CSE 24352",
    name: "Computer Graphics",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Graphics rendering, transformations, curves, surfaces, and animation."
  },
  {
    id: "cse24353",
    code: "CSE 24353",
    name: "UNIX Internals & Shell Programming",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "UNIX operating system internals and shell script programming."
  },
  {
    id: "cse24354",
    code: "CSE 24354",
    name: "Randomized Algorithms",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Probabilistic algorithms and randomized complexity analysis."
  },
  {
    id: "cse24355",
    code: "CSE 24355",
    name: "Object-Oriented Design & Modelling",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "OOP principles, design patterns, and UML modeling."
  },
  {
    id: "cse24356",
    code: "CSE 24356",
    name: "Cybercrime and Information Warfare",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Cybercrime investigation, security threats, and defensive strategies."
  },
  {
    id: "cse24357",
    code: "CSE 24357",
    name: "Advanced Data Structures",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Advanced data structures like B-trees, heaps, and hash tables."
  },
  {
    id: "cse24358",
    code: "CSE 24358",
    name: "Data Science",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Data analysis, visualization, and predictive modeling techniques."
  },
  {
    id: "cse24359",
    code: "CSE 24359",
    name: "Cryptography",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Encryption algorithms, digital signatures, and cryptographic protocols."
  },
  {
    id: "cse24360",
    code: "CSE 24360",
    name: "Recommender Systems",
    semester: 5,
    type: "Elective",
    credits: 3,
    description: "Collaborative filtering and personalized recommendation algorithms."
  },

  // ELECTIVES - FOURTH YEAR (Departmental)
  {
    id: "cse24451",
    code: "CSE 24451",
    name: "Parallel Algorithms",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Parallel computing concepts and algorithm parallelization techniques."
  },
  {
    id: "cse24452",
    code: "CSE 24452",
    name: "Ethical Hacking",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Penetration testing, security vulnerability assessment, and ethical hacking practices."
  },
  {
    id: "cse24453",
    code: "CSE 24453",
    name: "Big Data Technologies",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Hadoop, Spark, and distributed computing frameworks for big data."
  },
  {
    id: "cse24454",
    code: "CSE 24454",
    name: "Internet of Things",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "IoT architecture, sensors, protocols, and real-world applications."
  },
  {
    id: "cse24455",
    code: "CSE 24455",
    name: "Web Search and Information Retrieval",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Search engines, indexing, ranking algorithms, and IR systems."
  },
  {
    id: "cse24456",
    code: "CSE 24456",
    name: "TCP/IP and Web Technology",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "TCP/IP protocols, web technologies, and internet architecture."
  },
  {
    id: "cse24457",
    code: "CSE 24457",
    name: "Mobile Computing",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Mobile application development and mobile network technologies."
  },
  {
    id: "cse24458",
    code: "CSE 24458",
    name: "Information Theory & Coding",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Information entropy, error correction codes, and data compression."
  },
  {
    id: "cse24459",
    code: "CSE 24459",
    name: "Distributed Systems",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Distributed computing, consensus algorithms, and fault tolerance."
  },
  {
    id: "cse24460",
    code: "CSE 24460",
    name: "High Performance Computing",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "HPC systems, GPU computing, and performance optimization."
  },
  {
    id: "cse24461",
    code: "CSE 24461",
    name: "Embedded Systems",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Embedded system design, microcontrollers, and real-time systems."
  },
  {
    id: "cse24462",
    code: "CSE 24462",
    name: "Natural Language Processing",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Text processing, language models, and NLP applications."
  },
  {
    id: "cse24463",
    code: "CSE 24463",
    name: "Quantum Computing",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Quantum bits, quantum algorithms, and quantum computing principles."
  },
  {
    id: "cse24464",
    code: "CSE 24464",
    name: "Optimization Techniques",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Linear and non-linear optimization, metaheuristic algorithms."
  },
  {
    id: "cse24465",
    code: "CSE 24465",
    name: "Software Testing",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Test automation, quality assurance, and software verification."
  },
  {
    id: "cse24466",
    code: "CSE 24466",
    name: "Wireless Networks",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Wireless communication, mobile networks, and 5G technology."
  },
  {
    id: "cse24467",
    code: "CSE 24467",
    name: "Biometrics",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Biometric authentication, fingerprint recognition, and identity verification."
  },
  {
    id: "cse24468",
    code: "CSE 24468",
    name: "Software Defined Networks",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "SDN architecture, OpenFlow, and network virtualization."
  },
  {
    id: "cse24469",
    code: "CSE 24469",
    name: "Generative AI",
    semester: 7,
    type: "Elective",
    credits: 3,
    description: "Generative models, GANs, language models, and creative AI applications."
  },

  // EIGHTH SEMESTER
  {
    id: "cse24421",
    code: "CSE 24421",
    name: "Internship / Project Phase 5",
    semester: 8,
    type: "Project",
    credits: 8,
    description: "Final internship or capstone project phase with extensive hands-on experience."
  },
  {
    id: "cse24422",
    code: "CSE 24422",
    name: "General Proficiency",
    semester: 8,
    type: "Core",
    credits: 1,
    description: "General proficiency evaluation and skill assessment."
  },
  {
    id: "nptel24801",
    code: "NPTEL 24801",
    name: "Programme Elective-5 (NPTEL/SWAYAM Courses)",
    semester: 8,
    type: "Elective",
    credits: 3,
    description: "Online courses from NPTEL or SWAYAM platform as per department selection."
  },
  {
    id: "nptel24802",
    code: "NPTEL 24802",
    name: "Programme Elective-6 (NPTEL/SWAYAM Courses)",
    semester: 8,
    type: "Elective",
    credits: 3,
    description: "Additional online courses from NPTEL or SWAYAM platform."
  }
];
