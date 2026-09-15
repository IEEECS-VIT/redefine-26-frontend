export interface Subtrack {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TrackSubtracksConfig {
  trackId: number;
  trackName: string;
  subtracks: Subtrack[];
}

export const TRACK_SUBTRACKS: Record<number, TrackSubtracksConfig> = {
  1: {
    trackId: 1,
    trackName: "E-Commerce",
    subtracks: [
      {
        id: "ecom-1",
        number: "01",
        title: "Next-Gen Checkout & Hyperlocal Delivery",
        description: "Zero-friction micro-checkouts and fast local fulfillment.",
      },
      {
        id: "ecom-2",
        number: "02",
        title: "AI Personalization & Smart Recommendations",
        description: "Adaptive catalog discovery tuned to real-time shopper intent.",
      },
      {
        id: "ecom-3",
        number: "03",
        title: "AR Virtual Try-On Experiences",
        description: "Immersive spatial previews reducing product return rates.",
      },
      {
        id: "ecom-4",
        number: "04",
        title: "Sustainable & Green Supply Chains",
        description: "Carbon-conscious routing and transparent ethical sourcing.",
      },
    ],
  },
  2: {
    trackId: 2,
    trackName: "Smart Education",
    subtracks: [
      {
        id: "edu-1",
        number: "01",
        title: "Adaptive Learning & AI Tutoring",
        description: "Personalized pacing and real-time comprehension guidance.",
      },
      {
        id: "edu-2",
        number: "02",
        title: "Gamified STEM & Virtual Classrooms",
        description: "Interactive simulations turning abstract concepts into play.",
      },
      {
        id: "edu-3",
        number: "03",
        title: "Accessible Tools for Diverse Learners",
        description: "Inclusive multi-sensory interfaces for neurodivergent students.",
      },
      {
        id: "edu-4",
        number: "04",
        title: "Automated Evaluation & Feedback",
        description: "Intelligent rubric scoring and instant actionable insights.",
      },
    ],
  },
  3: {
    trackId: 3,
    trackName: "Healthcare Companion",
    subtracks: [
      {
        id: "health-1",
        number: "01",
        title: "Preventive Care & Remote Patient Monitoring",
        description: "Continuous vital telemetry and early anomaly detection.",
      },
      {
        id: "health-2",
        number: "02",
        title: "Mental Wellness & Guided Therapy",
        description: "Empathetic check-ins and evidence-based coping exercises.",
      },
      {
        id: "health-3",
        number: "03",
        title: "Emergency Response & Fast Dispatch",
        description: "Triage automation and nearest-responder location routing.",
      },
      {
        id: "health-4",
        number: "04",
        title: "Smart Medication & Adherence Tracking",
        description: "Interactive schedule reminders and interaction warnings.",
      },
    ],
  },
  4: {
    trackId: 4,
    trackName: "Travel & Exploration",
    subtracks: [
      {
        id: "travel-1",
        number: "01",
        title: "Eco-Conscious Itinerary Planning",
        description: "Low-impact routes and local sustainability credits.",
      },
      {
        id: "travel-2",
        number: "02",
        title: "Immersive Local Culture & Heritage AR",
        description: "Geo-anchored historical narratives and artisan discoveries.",
      },
      {
        id: "travel-3",
        number: "03",
        title: "Real-Time Group Travel & Split Expense Sync",
        description: "Collaborative trip planning and automated currency settlements.",
      },
      {
        id: "travel-4",
        number: "04",
        title: "Off-Grid Navigation & SOS Safety",
        description: "Peer-to-peer mesh tracking for remote backcountry trails.",
      },
    ],
  },
  5: {
    trackId: 5,
    trackName: "Finance",
    subtracks: [
      {
        id: "fin-1",
        number: "01",
        title: "Micro-Investments & Financial Literacy",
        description: "Bite-sized roundups and intuitive wealth building.",
      },
      {
        id: "fin-2",
        number: "02",
        title: "Decentralized Credit Scoring & Fraud Detection",
        description: "Alternative data underwriting with cryptographic privacy.",
      },
      {
        id: "fin-3",
        number: "03",
        title: "Automated Budgeting & Smart Expense Insights",
        description: "Predictive cash flow forecasting and recurring bill optimization.",
      },
      {
        id: "fin-4",
        number: "04",
        title: "Cross-Border Remittances with Low Friction",
        description: "Near-instant settlements with transparent exchange rates.",
      },
    ],
  },
  6: {
    trackId: 6,
    trackName: "Social Impact Platform",
    subtracks: [
      {
        id: "impact-1",
        number: "01",
        title: "Disaster Relief Coordination & Resource Mapping",
        description: "Crowdsourced supply tracking and volunteer dispatch grids.",
      },
      {
        id: "impact-2",
        number: "02",
        title: "Civic Engagement & Hyperlocal Issue Reporting",
        description: "Direct community feedback loops with municipal services.",
      },
      {
        id: "impact-3",
        number: "03",
        title: "Surplus Food Redistribution & Zero Hunger",
        description: "Perishable item rescue logistics between donors and shelters.",
      },
      {
        id: "impact-4",
        number: "04",
        title: "Community Skill Sharing & Youth Mentorship",
        description: "Local knowledge exchange networks unlocking upward mobility.",
      },
    ],
  },
};

/**
 * Dynamically compute font sizing classes based on title length
 * Ensures text adjusts smoothly, remains legible, and keeps cards compact.
 */
export function getSubtrackTitleSize(text: string): string {
  const len = text.length;
  if (len < 26) {
    return "text-xs sm:text-sm xl:text-[15px]";
  }
  if (len < 40) {
    return "text-[11px] sm:text-xs xl:text-sm";
  }
  return "text-[10px] sm:text-[11px] xl:text-xs";
}
