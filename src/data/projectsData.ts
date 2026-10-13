import { ASSETS } from '../constants/assets'
import { ProjectData } from '../components/projects/ProjectDetails'
import sanderiHeroImage from '../assets/sanderi-hero.png'
import sanderiTradeImage from '../assets/sanderi-trade.png'
import sanderiProductsImage from '../assets/sanderi-products.png'
import sanderiCategoriesImage from '../assets/sanderi-categories.png'
import sanderiFooterImage from '../assets/sanderi-footer.png'
import gajanandHeroImage from '../assets/gajanand-hero.png'
import gajanandProductsImage from '../assets/gajanand-products.png'
import gajanandProcessImage from '../assets/gajanand-process.png'
import gajanandFooterImage from '../assets/gajanand-footer.png'

export const PROJECTS_DATA: Record<string, ProjectData> = {
  'Gajanand Packaging Solutions': {
    id: 'gajanand-packaging-solutions',
    title: 'Gajanand Packaging Solutions',
    category: 'Industrial Machinery & Packaging Platform',
    date: 'January 15, 2024',
    image: gajanandHeroImage,
    gallery: [
      gajanandHeroImage,
      gajanandProductsImage,
      gajanandProcessImage,
      gajanandFooterImage,
    ],
    client: 'Gajanand Packaging Solutions (Rajkot, Gujarat)',
    duration: '3 Months',
    role: 'B2B Catalog Architecture, UI/UX Engineering, WhatsApp Lead Automation, Technical SEO',
    website: 'https://www.gajanandpakagingsolution.com/',
    summary: 'A high-converting B2B industrial machinery catalog and quotation platform designed for Rajkot’s leading packaging machine manufacturer—showcasing strapping, shrink tunnel, vacuum sealing, and band sealer machines with real-time WhatsApp inquiry capture.',
    challenge: 'Gajanand Packaging Solutions manufactures a wide spectrum of industrial packaging machines with dozens of specific models (11+ strapping models, 8+ vacuum sealers, 6+ shrink tunnels). Prospective factory buyers and industrial procurement teams struggled to compare technical capacities and find the right machinery through traditional static catalogs.',
    solution: 'Bytebly engineered a responsive, high-speed digital machinery showroom featuring category-level model comparison tables, a transparent 5-step working process (Inquiry -> Consultation -> Machine Selection -> Delivery & Installation -> After Sales Support), and persistent WhatsApp and call triggers for immediate engineer consultation.',
    results: [
      { value: '45+', label: 'Machinery Models Cataloged Online' },
      { value: '+210%', label: 'Inbound WhatsApp Buyer Enquiries' },
      { value: '4.9/5', label: 'Client & Dealer Trust Rating' },
    ],
    quote: {
      text: 'The digital catalog Bytebly created for us completely streamlined our sales pipeline. Industrial buyers can instantly see the exact machine models they need and connect directly with our engineers via WhatsApp.',
      author: 'Gajanand Packaging Solutions Management',
      title: 'Managing Director, Gajanand Packaging Solutions',
    },
    features: [
      'Industrial Machine Catalog (Strapping, Shrink Tunnels, Vacuum Packing, Band Sealers)',
      'Instant WhatsApp & Call Now Lead Generation Triggers',
      '5-Stage Interactive Working Process Flowchart',
      'Comprehensive Technical Model Specifications & Capacity Guides',
      'Mobile-Optimized Responsive Experience for Factory Floor Buyers',
      'Localized Rajkot & Pan-India Industrial Machinery SEO',
    ],
  },
  'Sanderi Exporters': {
    id: 'sanderi-exporters',
    title: 'Sanderi Exporters',
    category: 'Agricultural Export & Global Trade Platform',
    date: 'October 2024',
    image: sanderiHeroImage,
    gallery: [
      sanderiTradeImage,
      sanderiProductsImage,
      sanderiCategoriesImage,
      sanderiFooterImage,
    ],
    client: 'Sanderi Exporters',
    duration: '2.5 Months',
    role: 'Full-Stack Development, UI/UX Architecture, Global Trade Desk, SEO',
    website: 'https://sanderiexporters.com/',
    summary: 'A high-performance digital export platform built for Sanderi Exporters to connect international buyers across 40+ countries with premium Indian agricultural commodities—spanning rice, spices, oil seeds, peanuts, pulses, and fresh produce.',
    challenge: 'Sanderi Exporters supplies international commodity buyers across the Middle East, Southeast Asia, Europe, and the Americas. Their international communication previously relied on static PDF catalogs and slow correspondence, leading to elongated quotation cycles and difficulty demonstrating verified sourcing capability to new foreign importers.',
    solution: 'Bytebly engineered an intuitive, international-ready web architecture featuring a "Moving Export Desk" for product categories, direct WhatsApp trade enquiry buttons on every product card, transparent export packaging specs (bulk and private label), and clear company credentials (1,120+ shipments, 40+ countries served, established since 2010).',
    results: [
      { value: '40+', label: 'Global Trade Countries Reached' },
      { value: '1,120+', label: 'Verified Trade Shipments' },
      { value: '3.8x', label: 'Inbound Quote Request Conversion' },
    ],
    quote: {
      text: 'Bytebly understood the nuances of international commodity trading. The website immediately established credibility with foreign importers and streamlined our product inquiries tenfold.',
      author: 'Sanderi Exporters Management',
      title: 'Managing Director, Sanderi Exporters',
    },
    features: [
      'Interactive Product Desk (Rice, Spices, Peanuts, Sesame, Pulses)',
      'One-Click WhatsApp Trader Direct Connect',
      'Bulk & Private Label Packaging Specifications',
      'Sub-Second Global Edge Load Speeds',
      'Complete Responsive Layout & Mobile Trade Desk',
      'SEO Optimization for Agricultural Export Keywords',
    ],
  },
  'Market Branding': {
    id: 'market-branding',
    title: 'Market Branding',
    category: 'Brand Identity & Strategy',
    date: 'February 18, 2024',
    image: ASSETS.caseStudies.market,
    client: 'Aura Consumer Brands',
    duration: '3 Months',
    role: 'Brand Identity, Strategy, Packaging',
    website: 'https://bytebly.in',
    summary: 'A complete corporate brand transformation and packaging system engineered to command premium shelf space and digital prominence.',
    challenge: 'Aura Consumer Brands operated across 12 regional markets with disjointed visual assets, resulting in weak recognition among millennial shoppers and fragmented online ad performance.',
    solution: 'Bytebly engineered a cohesive brand ecosystem: a custom geometric typography system, vibrant brand color palettes, sustainable physical packaging specs, and a unified digital design system across all touchpoints.',
    results: [
      { value: '+142%', label: 'Direct Online Inquiries' },
      { value: '3.4x', label: 'Social Engagement Rate' },
      { value: '99.4%', label: 'Positive Brand Sentiment' },
    ],
    quote: {
      text: 'Bytebly translated our core ethos into a breathtaking visual identity that instantly unlocked retail expansion across 4 new global regions.',
      author: 'Elena Vance',
      title: 'Chief Marketing Officer, Aura Brands',
    },
    features: [
      'Comprehensive Brand Guidelines',
      'Custom Typography & Color Palette',
      'Sustainable Packaging Design',
      'High-Conversion E-Commerce Assets',
      'Omnichannel Social Media Toolkit',
      'Vector Iconography & Motion Kits',
    ],
  },
  'Motion Graphics': {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    category: '3D Motion & Interactive Media',
    date: 'January 15, 2024',
    image: ASSETS.caseStudies.motion,
    client: 'Kinetix Robotics Corp',
    duration: '2.5 Months',
    role: '3D Modeling, Storyboarding, UI Animation',
    website: 'https://bytebly.in',
    summary: 'High-fidelity cinematic 3D motion graphics and interactive UI micro-animations that simplify intricate hardware mechanics into clear, captivating visuals.',
    challenge: 'Kinetix needed to explain their proprietary robotic automation pipeline to enterprise venture investors and non-technical stakeholders without bogging them down in dry technical manuals.',
    solution: 'We produced a suite of photorealistic 3D product renders, dynamic exploded-view animations, and interactive web motion models that visually communicate technical speed, safety, and efficiency.',
    results: [
      { value: '5.2M+', label: 'Global Video Views' },
      { value: '+74%', label: 'Enterprise Demo Requests' },
      { value: '40%', label: 'Shorter Sales Conversion Cycles' },
    ],
    quote: {
      text: 'The 3D motion work delivered by Bytebly brought our robotics technology to life. Our enterprise close rates climbed immediately after launching the new materials.',
      author: 'Marcus Chen',
      title: 'VP of Product Innovation, Kinetix',
    },
    features: [
      'Cinema 4D & Octane 3D Renders',
      'Exploded-View Hardware Animations',
      'Interactive WebGL & Lottie Micro-interactions',
      'Investor Pitch Visual Walkthroughs',
      'Social Video Ad Cuts in 4K',
      'Sound Design & Audio Mastering',
    ],
  },
  'Creative Design': {
    id: 'creative-design',
    title: 'Creative Design',
    category: 'UI/UX Architecture & Product Design',
    date: 'August 24, 2024',
    image: ASSETS.caseStudies.creative,
    client: 'Velox Cloud Software',
    duration: '4 Months',
    role: 'UI/UX Architecture, Design System, Prototyping',
    website: 'https://bytebly.in',
    summary: 'An accessible, data-dense enterprise SaaS dashboard designed to provide instant operational clarity, intuitive workflows, and effortless user adoption.',
    challenge: 'Velox users were suffering from cognitive overload due to nested menus, legacy table layouts, and confusing telemetry metrics that triggered high support ticket volumes.',
    solution: 'Bytebly redesigned the full web application from the ground up: modular drag-and-drop dashboard widgets, real-time telemetry graphs, dark/light theme consistency, and rapid keyboard navigation.',
    results: [
      { value: '+88%', label: 'User Retention at 90 Days' },
      { value: '-62%', label: 'Customer Support Tickets' },
      { value: '4.9/5', label: 'Overall User Satisfaction' },
    ],
    quote: {
      text: 'Bytebly revamped our complex data engine into the sleekest, most enjoyable interface in our industry. Our users genuinely love using the dashboard every day.',
      author: 'Sophia Martinez',
      title: 'Head of Product, Velox Cloud',
    },
    features: [
      'Modular Dashboard Widget Framework',
      'Real-Time Telemetry & Data Visualizations',
      'WCAG 2.1 AAA Accessibility Compliance',
      'Dark & Light Mode Design Tokens',
      'High-Fidelity Interactive Figma Prototype',
      'React Tailwind Component Library Handover',
    ],
  },
}

// Aliases for alternate project card labels
PROJECTS_DATA['WebSite Development'] = PROJECTS_DATA['Market Branding']
