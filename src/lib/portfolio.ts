export const profile = {
  name: 'Mohammed Shahid',
  role: 'Senior Software Engineer',
  location: 'Kerala, India',
  email: 'hello@mohammedshahid.in',
  phone: '+91 81294 90227',
  phoneHref: 'tel:+918129490227',
  github: 'https://github.com/pkshahid',
  linkedin: 'https://www.linkedin.com/in/mohammed-shahid-8456b218b/',
  resume: '/Mohammed_Shahid_resume.pdf',
  focus: ['Backend', 'System Design', 'Microservices', 'Monolith', 'Distributed Systems', 'AI', 'LLM', 'RAG'],
  introduction:
    'I build backend systems with Python and Go—from APIs and background workers to the databases and infrastructure behind them. 5+ years of hands-on production experience.',
  about:
    'My work lives behind the interface: the API that connects a product, the worker that handles a background task, and the database query that needs to be faster. At Epixel, I build and maintain backend systems across commerce, CRM, learning, and customer support.',
  aboutSecond:
    'I stay involved beyond the implementation—from requirements and schema design to releases and production incidents. Along the way, I review code, mentor junior engineers, and work directly with clients.',
} as const;

export const stats = [
  { value: '5+', label: 'Years in backend engineering' },
  { value: '17+', label: 'Production applications delivered & maintained' },
  { value: '10k+', label: 'Users & their data migrated' },
] as const;

export type Work = {
  id: string;
  category: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  context: string;
  contribution: string;
  outcome: string;
  visual: 'query' | 'services' | 'platform';
};

export const works: Work[] = [
  {
    id: 'query-performance',
    category: 'DATABASE PERFORMANCE',
    title: 'Database query optimization',
    summary:
      'A critical production query reduced from nearly two minutes to five milliseconds.',
    metric: '5 ms',
    metricLabel: 'from nearly 2 minutes',
    tags: ['Query optimization', 'Indexing'],
    context: 'A critical production query took nearly two minutes to execute.',
    contribution:
      'Optimized the query and its indexing strategy to address the slow execution time.',
    outcome: 'Reduced execution time to 5 milliseconds.',
    visual: 'query',
  },
  {
    id: 'distributed-services',
    category: 'DISTRIBUTED SYSTEMS',
    title: 'APIs & asynchronous services',
    summary:
      'Python and Go services supporting asynchronous processing and event-driven workflows.',
    metric: '8',
    metricLabel: 'microservices built',
    tags: ['Python', 'Go', 'REST APIs', 'gRPC'],
    context:
      'Production applications needed APIs and services to support asynchronous and event-driven workflows.',
    contribution:
      'Developed and maintained 50+ REST APIs and built 8 microservices. Built background workers, cron jobs, WebSocket services, and gRPC-based services.',
    outcome:
      'Delivered backend services for asynchronous and event-driven application workflows.',
    visual: 'services',
  },
  {
    id: 'business-platforms',
    category: 'PLATFORM ENGINEERING',
    title: 'Multi-module business platforms',
    summary:
      'Backend work across accounts, wallets, commissions, subscriptions, and payments.',
    metric: '18',
    metricLabel: 'modules in the platform',
    tags: ['Backend systems', 'Payments', 'Data migration'],
    context:
      'A multi-module platform brought together user management, network structures, transactions, reporting, and notifications.',
    contribution:
      'Customized and enhanced an 18-module platform and independently delivered ticketing, notification, and customer support modules. Migrated more than 10,000 users and associated transactional data across production environments.',
    outcome:
      'Delivered platform enhancements, independently owned modules, and completed production data migrations.',
    visual: 'platform',
  },
];

export const expertise = [
  {
    number: '01',
    title: 'Backend & architecture',
    description: 'Services, interfaces, and the systems connecting them.',
    skills: [
      'Python',
      'Go',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'Gin',
      'Microservices',
      'REST APIs',
      'gRPC',
      'WebSockets',
    ],
  },
  {
    number: '02',
    title: 'Data & async processing',
    description: 'From database performance to background workloads.',
    skills: [
      'PostgreSQL',
      'Redis',
      'Elasticsearch',
      'RabbitMQ',
      'Celery',
      'Go workers',
      'PgBouncer',
    ],
  },
  {
    number: '03',
    title: 'Infrastructure & delivery',
    description: 'Shipping software and keeping it running in production.',
    skills: [
      'AWS EC2',
      'Docker',
      'Docker Compose',
      'Nginx',
      'GitHub Actions',
      'Jenkins',
      'Sentry',
    ],
  },
  {
    number: '04',
    title: 'Integrations & beyond',
    description:
      'Connecting payment, identity, and AI services to products.',
    skills: [
      'Stripe',
      'PayPal',
      'Razorpay',
      'OAuth',
      'SSO',
      'OpenAI API',
      'Gemini API',
      'Claude API',
      'React',
      'Next.js',
      'TypeScript',
    ],
  },
] as const;

export const openToWork = {
  headline: 'Open to backend & AI engineering roles.',
  summary:
    'I’m looking for my next role building reliable APIs, services, and data systems with Python and Go—including the backend behind AI and LLM products.',
  availability: '30-day notice period',
  employment: ['Full-time', 'Contract'],
  workModes: ['Remote', 'Hybrid', 'On-site'],
  relocation: 'Open to relocation',
  roles: [
    {
      title: 'Senior Backend Engineer',
      description:
        'Owning backend systems end to end—from API and schema design to production releases, reliability, and mentoring engineers.',
      focus: ['System design', 'Microservices', 'PostgreSQL', 'Production ownership'],
    },
    {
      title: 'Backend Engineer (Python / Go)',
      description:
        'Hands-on development of APIs, background workers, and services with Django, FastAPI, Gin, and Go.',
      focus: ['Python', 'Go', 'REST APIs', 'gRPC', 'Async processing'],
    },
    {
      title: 'AI / LLM Engineer',
      description:
        'Building the backend behind AI features—LLM integrations, RAG pipelines, and the APIs and infrastructure that serve them.',
      focus: ['LLM integrations', 'RAG', 'OpenAI, Gemini & Claude APIs', 'Prompt engineering'],
    },
  ],
  highlights: [
    '5+ years building and maintaining production backend systems',
    '17+ production applications delivered and maintained',
    '50+ REST APIs and 8 microservices built with Python and Go',
    'Cut a critical query from nearly 2 minutes to 5 milliseconds',
    'Mentored 3 junior engineers within a 15-developer team',
  ],
} as const;

export const whatsapp = {
  number: '918129490227',
  greeting: 'Hi! Thanks for visiting my portfolio. What would you like to talk about?',
  suggestions: [
    { label: 'Looking to hire', message: 'Hi Mohammed, I came across your portfolio and I’m hiring for a backend engineering role. Could we discuss the opportunity?' },
    { label: 'Looking for a developer', message: 'Hi Mohammed, I’m looking for a developer to help with a project. Are you available to discuss it?' },
    { label: 'Let’s have a quick chat', message: 'Hi Mohammed, I saw your portfolio and would love to have a quick chat. When would be a good time?' },
    { label: 'Contract opportunity', message: 'Hi Mohammed, I have a contract opportunity and would like to know if you’re interested.' },
    { label: 'AI / LLM project', message: 'Hi Mohammed, I’m working on an AI/LLM product and would like to talk about the backend.' },
  ],
} as const;

export const certifications = [
  'Go Programming Language',
  'Python',
  'Academy Accreditation — Generative AI Fundamentals',
] as const;
