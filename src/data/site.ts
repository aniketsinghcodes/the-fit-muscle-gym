// ============================================================
// THE FIT MUSCLE GYM — Verified Business Data & Configuration
// ============================================================

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceFormatted: string;
  features: string[];
}

export interface Machine {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
}

export interface Transformation {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const site = {
  name: "THE FIT MUSCLE GYM",
  tagline: "HEALTH. STRENGTH. TRANSFORMATION.",
  taglineHindi: "स्वास्थ्य। शक्ति। परिवर्तन।",
  supportingCopy: "A healthier you starts here.",
  phone: "+91 91406 61828",
  whatsappUrl: "https://wa.me/919140661828",
  instagramUrl: "https://www.instagram.com/the.fitmuscle",
  mapsUrl: "https://maps.app.goo.gl/tBvMGzGwE7eKeb447",
  address: {
    street: "Mishri Lal Chauraha, Dabauli West",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pincode: "208022",
    country: "India",
    full: "Mishri Lal Chauraha, Dabauli West, Kanpur, Uttar Pradesh 208022, India",
  },
  hours: {
    days: "Monday – Saturday",
    morning: "5:30 AM – 10:00 AM",
    evening: "5:00 PM – 10:00 PM",
  },
  trainer: {
    name: "Krishna Gupta",
    role: "Gym Trainer",
    experience: "5 Years of Experience",
    instagramUrl: "https://www.instagram.com/fit_crox/",
    whatsappUrl: "https://wa.me/919140661828",
    image: "/images/trainer/krishna.jpg",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Trainer", href: "#trainer" },
  { label: "Transformations", href: "#transformations" },
  { label: "Equipment", href: "#equipment" },
  { label: "Plans", href: "#plans" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    duration: "1 month",
    price: 600,
    priceFormatted: "₹600",
    features: [
      "Full Gym Floor Access",
      "All Strength & Cardio Machines",
      "Locker & Changing Area",
      "Trainer Guidance & Support",
      "Morning & Evening Batches",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: "3 months",
    price: 1600,
    priceFormatted: "₹1,600",
    features: [
      "Full Gym Floor Access",
      "All Strength & Cardio Machines",
      "Locker & Changing Area",
      "Trainer Guidance & Support",
      "Morning & Evening Batches",
    ],
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    duration: "6 months",
    price: 3000,
    priceFormatted: "₹3,000",
    features: [
      "Full Gym Floor Access",
      "All Strength & Cardio Machines",
      "Locker & Changing Area",
      "Trainer Guidance & Support",
      "Morning & Evening Batches",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    duration: "12 months",
    price: 5500,
    priceFormatted: "₹5,500",
    features: [
      "Full Gym Floor Access",
      "All Strength & Cardio Machines",
      "Locker & Changing Area",
      "Trainer Guidance & Support",
      "Morning & Evening Batches",
    ],
  },
];

export const machines: Machine[] = [
  {
    id: "cable-crossover",
    name: "Cable Crossover",
    category: "Chest & Functional",
    image: "/images/equipment/cable-crossover.png",
    alt: "Dual adjustable cable crossover machine with pulleys at The Fit Muscle Gym",
  },
  {
    id: "smith-machine",
    name: "Smith Machine",
    category: "Strength & Squats",
    image: "/images/equipment/smith-machine.png",
    alt: "Heavy duty Smith machine with barbell guide rails at The Fit Muscle Gym",
  },
  {
    id: "lat-pull-down",
    name: "Lat Pull Down",
    category: "Back & Upper Body",
    image: "/images/equipment/lat-pull-down.png",
    alt: "Lat pull down selectorized weight stack machine at The Fit Muscle Gym",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Legs & Quads",
    image: "/images/equipment/leg-press.png",
    alt: "Heavy 45-degree plate loaded leg press machine at The Fit Muscle Gym",
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Quadriceps Isolation",
    image: "/images/equipment/leg-extension.png",
    alt: "Seated leg extension machine with padded roller at The Fit Muscle Gym",
  },
  {
    id: "single-forearms-machine",
    name: "Single Forearms Machine",
    category: "Forearms & Grip",
    image: "/images/equipment/single-forearms-machine.png",
    alt: "Specialized forearm curl machine at The Fit Muscle Gym",
  },
  {
    id: "lateral-raises-machine",
    name: "Lateral Raises Machine",
    category: "Shoulders & Deltoids",
    image: "/images/equipment/lateral-raises-machine.png",
    alt: "Seated lateral raises shoulder machine at The Fit Muscle Gym",
  },
];

export const transformations: Transformation[] = [
  {
    id: "transformation-1",
    title: "Consistency & Dedication",
    caption: "Real member transformation achieved through disciplined workouts at The Fit Muscle Gym.",
    image: "/images/transformations/transformation-belief.png",
    alt: "Real member before and after physique transformation at The Fit Muscle Gym",
  },
  {
    id: "transformation-2",
    title: "Muscle Building Journey",
    caption: "2 Months transformation (67.5 kg to 71 kg) through focused hypertrophy training.",
    image: "/images/transformations/transformation-fitcrox-67to71.png",
    alt: "Physique progress journey showing weight gain from 67.5kg to 71kg",
  },
  {
    id: "transformation-3",
    title: "50-Day Transformation",
    caption: "Noticeable conditioning and strength progression achieved in 50 days of routine gym training.",
    image: "/images/transformations/transformation-50-days.png",
    alt: "50 day fitness transformation milestone at The Fit Muscle Gym",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "community-celebration",
    title: "Gym Family & Consistency",
    category: "Community",
    image: "/images/gallery/community-celebration.png",
    alt: "The Fit Muscle Gym community gathering under the Consistency wall banner",
  },
  {
    id: "community-powerlifting",
    title: "Strength Meet & Medal Ceremony",
    category: "Event",
    image: "/images/gallery/community-powerlifting.png",
    alt: "Gym members and medal winners with barbell at powerlifting meet",
  },
  {
    id: "trainer-krishna",
    title: "Trainer Krishna Gupta",
    category: "Coaching",
    image: "/images/trainer/krishna.jpg",
    alt: "Trainer Krishna Gupta on the gym floor at The Fit Muscle Gym",
  },
  {
    id: "cable-crossover-action",
    title: "Cable Crossover Training",
    category: "Equipment",
    image: "/images/equipment/cable-crossover.png",
    alt: "Athlete performing cable crossover exercise",
  },
  {
    id: "smith-machine-squats",
    title: "Smith Machine Strength Work",
    category: "Equipment",
    image: "/images/equipment/smith-machine.png",
    alt: "Squat workout on Smith Machine",
  },
  {
    id: "lat-pull-down-workout",
    title: "Lat Pull Down Session",
    category: "Equipment",
    image: "/images/equipment/lat-pull-down.png",
    alt: "Back workout on Lat Pull Down machine",
  },
];
