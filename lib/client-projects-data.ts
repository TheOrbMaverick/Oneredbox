export interface ProjectMedia {
  type: "photo" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
  date: string;
}

export interface ProjectFinancials {
  totalFees: number;
  amountPaid: number;
  outstanding: number;
  lastPaidAmount: number;
  lastPaidDate: string;
  currency: string;
}

export interface ProjectMilestone {
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface ClientProject {
  id: string;
  clientName: string;
  projectTitle: string;
  serviceType:
    | "land-acquisition"
    | "building-design"
    | "construction-supervision";
  status: "in-progress" | "completed" | "on-hold";
  startDate: string;
  estimatedCompletion: string;
  completionPercentage: number;
  summary: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  financials: ProjectFinancials;
  milestones: ProjectMilestone[];
  media: ProjectMedia[];
  projectManager: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  specifications?: {
    landSize?: string;
    buildingType?: string;
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    plotNumber?: string;
  };
}

export const clientProjects: ClientProject[] = [
  {
    id: "proj-001",
    clientName: "Adebayo Johnson",
    projectTitle: "Lekki Phase 2 Residential Development",
    serviceType: "building-design",
    status: "in-progress",
    startDate: "2024-06-15",
    estimatedCompletion: "2025-08-30",
    completionPercentage: 45,
    summary:
      "A modern 5-bedroom duplex development in Lekki Phase 2, Lagos. The project includes architectural design, structural engineering, and construction supervision. The design features contemporary Nigerian architecture with sustainable elements including solar panels and rainwater harvesting systems.",
    location: {
      address: "Plot 24, Admiralty Way",
      city: "Lekki Phase 2",
      state: "Lagos",
      country: "Nigeria",
    },
    financials: {
      totalFees: 45000000,
      amountPaid: 27000000,
      outstanding: 18000000,
      lastPaidAmount: 9000000,
      lastPaidDate: "2024-11-20",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Project Kickoff & Site Survey",
        date: "2024-06-20",
        completed: true,
        description: "Initial site assessment and survey completed",
      },
      {
        title: "Architectural Design Approval",
        date: "2024-07-30",
        completed: true,
        description: "Final architectural drawings approved by client",
      },
      {
        title: "Foundation Work",
        date: "2024-09-15",
        completed: true,
        description: "Foundation laying and reinforcement completed",
      },
      {
        title: "Structural Framework",
        date: "2024-11-30",
        completed: true,
        description: "Main building structure erected",
      },
      {
        title: "Roofing & External Works",
        date: "2025-02-28",
        completed: false,
        description: "Roof installation and external finishing",
      },
      {
        title: "Interior Finishing",
        date: "2025-05-30",
        completed: false,
        description: "Plastering, tiling, and interior works",
      },
      {
        title: "Final Inspection & Handover",
        date: "2025-08-30",
        completed: false,
        description: "Quality inspection and key handover",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/construction-site-foundation-work-lagos-nigeria.jpg",
        caption: "Foundation laying - September 2024",
        date: "2024-09-15",
      },
      {
        type: "photo",
        url: "/building-structural-framework-construction-progres.jpg",
        caption: "Structural framework in progress",
        date: "2024-10-20",
      },
      {
        type: "photo",
        url: "/modern-duplex-construction-site-block-work.jpg",
        caption: "Block work completion - Ground floor",
        date: "2024-11-05",
      },
      {
        type: "photo",
        url: "/construction-site-first-floor-decking-concrete.jpg",
        caption: "First floor decking",
        date: "2024-11-18",
      },
      {
        type: "photo",
        url: "/building-construction-second-floor-progress-nigeri.jpg",
        caption: "Second floor construction",
        date: "2024-12-01",
      },
      {
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "/construction-timelapse-video-thumbnail.jpg",
        caption: "Monthly progress timelapse - November 2024",
        date: "2024-11-30",
      },
      {
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "/drone-footage-construction-site-aerial-view.jpg",
        caption: "Drone footage - Site overview",
        date: "2024-12-02",
      },
    ],
    projectManager: {
      name: "Chukwuemeka Obi",
      phone: "+234 803 456 7890",
      email: "chukwuemeka@oneredbox.com",
      image: "/professional-nigerian-man-project-manager.jpg",
    },
    specifications: {
      landSize: "650 sqm",
      buildingType: "5-Bedroom Duplex",
      bedrooms: 5,
      bathrooms: 6,
      floors: 2,
      plotNumber: "Plot 24",
    },
  },
  {
    id: "proj-002",
    clientName: "Adebayo Johnson",
    projectTitle: "Abuja Land Acquisition - Katampe Extension",
    serviceType: "land-acquisition",
    status: "completed",
    startDate: "2024-03-10",
    estimatedCompletion: "2024-07-15",
    completionPercentage: 100,
    summary:
      "Successfully acquired a 1,200 sqm residential plot in Katampe Extension, Abuja. Full documentation and C of O obtained.",
    location: {
      address: "Plot 45, Katampe Extension",
      city: "Katampe",
      state: "Abuja FCT",
      country: "Nigeria",
    },
    financials: {
      totalFees: 8500000,
      amountPaid: 8500000,
      outstanding: 0,
      lastPaidAmount: 2500000,
      lastPaidDate: "2024-07-10",
      currency: "NGN",
    },
    milestones: [
      { title: "Initial Consultation", date: "2024-03-10", completed: true },
      { title: "Land Search & Selection", date: "2024-04-01", completed: true },
      { title: "Due Diligence", date: "2024-05-15", completed: true },
      {
        title: "Documentation & Transfer",
        date: "2024-06-30",
        completed: true,
      },
      { title: "C of O Processing", date: "2024-07-15", completed: true },
    ],
    media: [
      {
        type: "photo",
        url: "/land-plot-for-sale-nigeria.jpg",
        caption: "Land plot - Katampe",
        date: "2024-04-01",
      },
    ],
    projectManager: {
      name: "Ngozi Adekunle",
      phone: "+234 805 123 4567",
      email: "ngozi@oneredbox.com",
      image: "/professional-nigerian-woman.jpg",
    },
    specifications: {
      landSize: "1,200 sqm",
      plotNumber: "Plot 45",
    },
  },
  {
    id: "proj-003",
    clientName: "Adebayo Johnson",
    projectTitle: "Port Harcourt Commercial Building Supervision",
    serviceType: "construction-supervision",
    status: "in-progress",
    startDate: "2024-09-01",
    estimatedCompletion: "2025-12-15",
    completionPercentage: 25,
    summary:
      "Quality control and construction supervision for a 3-storey commercial building in Port Harcourt. Weekly site inspections and progress reports.",
    location: {
      address: "12 Trans-Amadi Industrial Layout",
      city: "Port Harcourt",
      state: "Rivers",
      country: "Nigeria",
    },
    financials: {
      totalFees: 15000000,
      amountPaid: 7500000,
      outstanding: 7500000,
      lastPaidAmount: 3750000,
      lastPaidDate: "2024-11-01",
      currency: "NGN",
    },
    milestones: [
      { title: "Initial Site Assessment", date: "2024-09-05", completed: true },
      { title: "Contractor Evaluation", date: "2024-09-20", completed: true },
      { title: "Foundation Inspection", date: "2024-10-30", completed: false },
      { title: "Structural Inspection", date: "2025-03-15", completed: false },
      { title: "MEP Systems Review", date: "2025-07-30", completed: false },
      {
        title: "Final Handover Inspection",
        date: "2025-12-15",
        completed: false,
      },
    ],
    media: [
      {
        type: "photo",
        url: "/commercial-construction.png",
        caption: "Site overview",
        date: "2024-09-10",
      },
    ],
    projectManager: {
      name: "Emeka Nwankwo",
      phone: "+234 809 876 5432",
      email: "emeka@oneredbox.com",
      image: "/professional-nigerian-engineer-man.jpg",
    },
    specifications: {
      landSize: "800 sqm",
      buildingType: "Commercial (3-Storey)",
      floors: 3,
    },
  },
];

export function getProjectById(id: string): ClientProject | undefined {
  return clientProjects.find((project) => project.id === id);
}

export function formatCurrency(amount: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
