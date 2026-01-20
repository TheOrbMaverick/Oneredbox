import {
  Building,
  Compass,
  Factory,
  Globe,
  HardHat,
  Home,
  MapPin,
  Ruler,
  Shield,
  Users,
  Wrench,
} from "lucide-react";

export const footerDescription =
  "Building excellence since 1985. We transform visions into reality with precision, quality, and unwavering commitment to our clients.";

export const aboutUs = {
  header: "Building Excellence Since 1985",
  description:
    "For over four decades, Oneredbox Construction has been at the forefront of the construction industry, delivering exceptional projects that stand the test of time. Our commitment to quality, innovation, and client satisfaction has made us the trusted partner for residential, commercial, and industrial construction needs.",
};

export const servicesWeOffer = [
  {
    icon: Building,
    title: "Commercial Construction",
    description:
      "From office buildings to retail spaces, we deliver commercial projects that combine functionality with architectural excellence.",
    features: ["Office Buildings", "Retail Centers", "Hotels & Hospitality"],
  },
  {
    icon: Home,
    title: "Residential Construction",
    description:
      "Custom homes and residential developments built with precision, quality materials, and attention to every detail.",
    features: ["Custom Homes", "Multi-Family Units", "Luxury Estates"],
  },
  {
    icon: Factory,
    title: "Industrial Construction",
    description:
      "Specialized industrial facilities designed for efficiency, safety, and long-term operational success.",
    features: ["Manufacturing Plants", "Warehouses", "Distribution Centers"],
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with our comprehensive renovation services, from minor updates to complete overhauls.",
    features: [
      "Complete Renovations",
      "Historic Restoration",
      "Space Optimization",
    ],
  },
  {
    icon: HardHat,
    title: "Project Management",
    description:
      "End-to-end project management ensuring your construction project stays on schedule and within budget.",
    features: ["Planning & Scheduling", "Budget Management", "Quality Control"],
  },
  {
    icon: Ruler,
    title: "Design & Build",
    description:
      "Integrated design-build services that streamline the construction process from concept to completion.",
    features: ["Architectural Design", "Engineering", "Turnkey Solutions"],
  },
];

export const bookServices = [
  {
    id: "land-acquisition",
    title: "Land Acquisition",
    description:
      "We help you secure prime landed properties across Nigeria with full legal backing and documentation.",
    icon: MapPin,
    href: "/book-service/land-acquisition",
    features: [
      "Property verification & due diligence",
      "Legal documentation assistance",
      "Survey & title registration",
      "Negotiation on your behalf",
      "Remote property inspection via video",
    ],
  },
  {
    id: "building-design",
    title: "Building Design",
    description:
      "Professional architectural and structural designs tailored to your vision, budget, and Nigerian building codes.",
    icon: Compass,
    href: "/book-service/building-design",
    features: [
      "Custom architectural designs",
      "3D visualization & walkthroughs",
      "Structural engineering plans",
      "Building permit documentation",
      "Material specification & costing",
    ],
  },
  {
    id: "construction-supervision",
    title: "Construction Supervision",
    description:
      "Quality control and project oversight to ensure your construction meets standards, even when you're abroad.",
    icon: HardHat,
    href: "/book-service/construction-supervision",
    features: [
      "Regular site inspections",
      "Weekly progress reports with photos/videos",
      "Quality control checks",
      "Budget & timeline monitoring",
      "Direct communication with contractors",
    ],
  },
];

export const bookServicesTrustPoints = [
  {
    icon: Shield,
    title: "Registered in US & Nigeria",
    description: "Legally registered in both countries for your protection",
  },
  {
    icon: Globe,
    title: "Diaspora Focused",
    description: "Built specifically for Nigerians living abroad",
  },
  {
    icon: Users,
    title: "Trusted Partners",
    description: "Vetted network of lawyers, surveyors, and contractors",
  },
];
