import mo1 from '$lib/assets/mo1.png';
import mo2 from '$lib/assets/mo2.png';

import pr1 from '$lib/assets/pr1.png';
import pr2 from '$lib/assets/pr2.png';

import in1 from '$lib/assets/in1.png';
import in2 from '$lib/assets/in2.png';

import su1 from '$lib/assets/su1.png';
import su2 from '$lib/assets/su2.png';

import de1 from '$lib/assets/de1.png';
import de2 from '$lib/assets/de2.png';

import se1 from '$lib/assets/se1.png';
import se2 from '$lib/assets/se2.png';

export const projects = [
  {
    id: 1,
    title: 'Mood Tracker',
    slug: 'mood-tracker',
    role: 'Full Stack Developer',
    description: 'Minimalist mental wellness web app focused on emotional awareness through mood logging, AI-generated affirmations, and personalized daily reflections. Features responsive design, clean UI, and seamless user experience across devices.',
    tech: ['Next.js', 'TailwindCSS', 'ConvexDB', 'OpenAI'],
    images: [mo1, mo2],
    link: 'https://mood-mocha-iota.vercel.app/',
    keyFeatures: [
      'Sentiment analysis on daily reflections using OpenAI',
      'Real-time data synchronization with ConvexDB',
      'Interactive mood-trend visualization charts'
    ],
    highlights: [
      'Designed a glassmorphic UI to reduce cognitive load',
      'Implemented an AI affirmation engine that adapts to user input'
    ],
    problemSolved: 'Provides a focused, noise-free environment to encourage consistent emotional check-ins without the clutter of traditional wellness apps.',
    challenges: [
      'Integrating real-time AI streaming without UI lag',
      'Ensuring absolute privacy for sensitive mental health logs'
    ]
  },
  {
    id: 2,
    title: 'ProMart Ecommerce',
    slug: 'promart-ecommerce',
    role: 'Frontend Engineer',
    description: 'Responsive and scalable e-commerce platform with real-time cart functionality, dynamic product browsing, Stripe payment integration, and optimized user experience for modern online shopping.',
    tech: ['Next.js', 'TailwindCSS', 'ConvexDB', 'TypeScript'],
    images: [pr1, pr2],
    link: 'https://promart-nu.vercel.app/',
    keyFeatures: [
      'Dynamic product filtering and instant search',
      'Persistent shopping cart logic across sessions',
      'Stripe-powered secure checkout flow'
    ],
    highlights: [
      'Achieved high performance scores with Next.js optimization',
      'Built custom product detail transitions for premium feel'
    ],
    problemSolved: 'Solves inventory desynchronization by using reactive backend listeners that update stock status in real-time.',
    challenges: [
      'Managing complex global state for the shopping cart',
      'Handling secure third-party payment webhooks'
    ]
  },
  {
    id: 3,
    title: 'Invoice Generator',
    slug: 'invoice-generator',
    role: 'Frontend Developer',
    description: 'Responsive invoice management application with full CRUD functionality, allowing users to create, edit, update, and delete invoices efficiently. Includes modern UI, dark and light mode support, form validation, and organized invoice tracking.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Context API'],
    images: [in1, in2],
    link: 'https://hng-invoice.vercel.app/',
    keyFeatures: [
      'Full CRUD operations for digital invoice management',
      'Real-time total calculations and tax adjustments',
      'State-aware theme switching (Dark/Light mode)'
    ],
    highlights: [
      'Built a highly reusable form component system',
      'Strict TypeScript implementation for invoice data safety'
    ],
    problemSolved: 'Streamlines the administrative burden for freelancers by providing a quick, validatable way to generate and track billing.',
    challenges: [
      'Managing complex form validation for multiple line items',
      'Ensuring layout consistency across print and screen views'
    ]
  },
  {
    id: 4,
    title: 'Secure Message App',
    slug: 'secure-message-app',
    role: 'Frontend Developer',
    description: 'Private real-time messaging application built with end-to-end encryption for secure communication. Users can authenticate using generated public and private keys, chat securely, and enjoy a fully responsive and modern messaging interface.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Socket.io'],
    images: [su1, su2],
    link: 'https://sumchat-hng.vercel.app/',
    keyFeatures: [
      'End-to-end encryption for all message payloads',
      'Real-time communication using Socket.io bi-directional pipes',
      'Cryptographic key generation for user authentication'
    ],
    highlights: [
      'Implemented custom encryption logic on the client side',
      'Designed a sleek, "hacker-style" dark UI'
    ],
    problemSolved: 'Addresses privacy concerns in modern messaging by ensuring the server never sees the plain-text content of user chats.',
    challenges: [
      'Handling real-time synchronization across multiple tabs',
      'Managing public/private key pairs securely within the browser'
    ]
  },
  {
    id: 5,
    title: 'Public Health Brand Portfolio',
    slug: 'public-health-brand-portfolio',
    role: 'Frontend Developer',
    description: 'Professional and responsive portfolio website built for a public health brand to showcase services, achievements, projects, and brand identity. Designed with clean layouts, smooth navigation, and strong visual storytelling.',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    images: [de1, de2],
    link: 'https://deborahonuegbu.vercel.app/',
    keyFeatures: [
      'Interactive service showcases with Framer Motion',
      'Dynamic project gallery with filtered views',
      'Optimized image loading for high-resolution assets'
    ],
    highlights: [
      'Created a narrative-driven user flow to explain brand impact',
      'Smooth scroll integration for premium navigational feel'
    ],
    problemSolved: 'Provides a clean, authoritative digital presence for a health organization to build trust with stakeholders.',
    challenges: [
      'Balancing high-quality visual media with fast load times',
      'Creating complex scroll-triggered animations without performance lag'
    ]
  },
  {
    id: 6,
    title: 'Mini Search Engine',
    slug: 'mini-search-engine',
    role: 'Frontend Developer',
    description: 'Lightweight and visually appealing search engine interface that allows users to search and display web-based results dynamically. Features responsive layouts, clean UI design, and smooth search interactions.',
    tech: ['JavaScript', 'React', 'TailwindCSS', 'REST API'],
    images: [se1, se2],
    link: 'https://pro-search-ten.vercel.app/',
    keyFeatures: [
      'Dynamic API data fetching for real-time results',
      'Debounced search input to minimize API overhead',
      'Responsive result grid with pagination'
    ],
    highlights: [
      'Focused on sub-second search result rendering',
      'Clean, Google-esque minimalist design language'
    ],
    problemSolved: 'Simplifies data discovery by providing a fast, focused interface for querying external web-based data.',
    challenges: [
      'Handling inconsistent data structures from external REST APIs',
      'Managing loading and empty states for a better UX'
    ]
  }
];