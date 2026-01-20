// TypeScript interfaces derived from Sanity schema

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

export interface ProjectLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ProjectManager {
  name: string;
  phone: string;
  email: string;
  image?: string;
}

export interface ProjectSpecifications {
  landSize?: string;
  buildingType?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  plotNumber?: string;
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
  location: ProjectLocation;
  financials: ProjectFinancials;
  milestones: ProjectMilestone[];
  media: ProjectMedia[];
  projectManager: ProjectManager;
  specifications?: ProjectSpecifications;
}

export const clientProjects: ClientProject[] = [
  {
    id: "proj-001",
    clientName: "Adaeze Okonkwo",
    projectTitle: "Lekki Phase 1 Residential Plot Acquisition",
    serviceType: "land-acquisition",
    status: "completed",
    startDate: "2024-03-15",
    estimatedCompletion: "2024-06-30",
    completionPercentage: 100,
    summary:
      "Successfully acquired a 650sqm corner plot in a prime location within Lekki Phase 1. The property includes C of O documentation and is fully fenced with gate. Perfect for residential development with excellent road network access.",
    location: {
      address: "Plot 24, Chief Collins Street",
      city: "Lekki Phase 1",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.4378,
        lng: 3.4707,
      },
    },
    financials: {
      totalFees: 85000000,
      amountPaid: 85000000,
      outstanding: 0,
      lastPaidAmount: 25000000,
      lastPaidDate: "2024-06-15",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Initial Consultation",
        date: "2024-03-15",
        completed: true,
        description: "Discussed client requirements and budget",
      },
      {
        title: "Property Search",
        date: "2024-03-25",
        completed: true,
        description: "Identified 5 potential properties matching criteria",
      },
      {
        title: "Site Inspection",
        date: "2024-04-10",
        completed: true,
        description: "Client virtually toured selected properties",
      },
      {
        title: "Due Diligence",
        date: "2024-05-01",
        completed: true,
        description: "Verified land title, survey, and ownership documents",
      },
      {
        title: "Transaction Completed",
        date: "2024-06-15",
        completed: true,
        description: "All payments made and documents transferred",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/empty-land-plot-lekki-lagos-nigeria.jpg",
        caption: "Front view of the acquired plot",
        date: "2024-06-15",
      },
      {
        type: "photo",
        url: "/fenced-land-plot-with-gate-nigeria.jpg",
        caption: "Perimeter fencing completed",
        date: "2024-06-20",
      },
      {
        type: "photo",
        url: "/street-view-residential-area-lagos.jpg",
        caption: "Street access view",
        date: "2024-06-15",
      },
    ],
    projectManager: {
      name: "Chisom Eze",
      phone: "+234 803 456 7890",
      email: "chisom.eze@oneredbox.com",
      image: "/professional-nigerian-woman.jpg",
    },
    specifications: {
      landSize: "650 sqm",
      plotNumber: "Plot 24",
    },
  },
  {
    id: "proj-002",
    clientName: "Emeka Nwosu",
    projectTitle: "4-Bedroom Duplex Design - Abuja",
    serviceType: "building-design",
    status: "in-progress",
    startDate: "2024-08-01",
    estimatedCompletion: "2024-12-15",
    completionPercentage: 65,
    summary:
      "Comprehensive architectural design for a modern 4-bedroom detached duplex in Gwarinpa, Abuja. The design incorporates contemporary Nigerian architecture with sustainable features including solar panel provisions and rainwater harvesting systems.",
    location: {
      address: "Plot 112, 4th Avenue",
      city: "Gwarinpa",
      state: "FCT Abuja",
      country: "Nigeria",
      coordinates: {
        lat: 9.1021,
        lng: 7.4033,
      },
    },
    financials: {
      totalFees: 4500000,
      amountPaid: 3150000,
      outstanding: 1350000,
      lastPaidAmount: 1500000,
      lastPaidDate: "2024-10-05",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Design Brief",
        date: "2024-08-01",
        completed: true,
        description: "Collected client requirements and preferences",
      },
      {
        title: "Concept Design",
        date: "2024-08-20",
        completed: true,
        description: "Initial concept sketches and 3D visualization",
      },
      {
        title: "Schematic Design",
        date: "2024-09-15",
        completed: true,
        description: "Detailed floor plans and elevations",
      },
      {
        title: "Structural Design",
        date: "2024-10-20",
        completed: true,
        description: "Structural engineering drawings",
      },
      {
        title: "MEP Design",
        date: "2024-11-15",
        completed: false,
        description: "Mechanical, Electrical, and Plumbing designs",
      },
      {
        title: "Final Documentation",
        date: "2024-12-15",
        completed: false,
        description: "Complete construction documents and BOQ",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/modern-duplex-3d-render-nigeria.jpg",
        caption: "3D exterior render - front elevation",
        date: "2024-09-01",
      },
      {
        type: "photo",
        url: "/architectural-floor-plan-duplex.jpg",
        caption: "Ground floor plan",
        date: "2024-09-15",
      },
      {
        type: "photo",
        url: "/modern-living-room-interior-design-render.jpg",
        caption: "Living room interior concept",
        date: "2024-10-01",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/3d-walkthrough-video-thumbnail.jpg",
        caption: "3D walkthrough animation",
        date: "2024-10-15",
      },
    ],
    projectManager: {
      name: "Architect Tunde Bakare",
      phone: "+234 805 678 9012",
      email: "tunde.bakare@oneredbox.com",
      image: "/professional-nigerian-architect-man.jpg",
    },
    specifications: {
      landSize: "500 sqm",
      buildingType: "Detached Duplex",
      bedrooms: 4,
      bathrooms: 5,
      floors: 2,
      plotNumber: "Plot 112",
    },
  },
  {
    id: "proj-003",
    clientName: "Olumide Adeyemi",
    projectTitle: "Construction Supervision - Magodo Estate",
    serviceType: "construction-supervision",
    status: "in-progress",
    startDate: "2024-05-01",
    estimatedCompletion: "2025-08-30",
    completionPercentage: 45,
    summary:
      "Full construction supervision services for a 5-bedroom mansion in Magodo GRA Phase 2. We are ensuring quality control, material verification, and progress documentation for a client-appointed contractor. Weekly site visits and detailed reports provided.",
    location: {
      address: "18 CMD Road",
      city: "Magodo GRA Phase 2",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.6194,
        lng: 3.3792,
      },
    },
    financials: {
      totalFees: 8500000,
      amountPaid: 5100000,
      outstanding: 3400000,
      lastPaidAmount: 1700000,
      lastPaidDate: "2024-11-01",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Project Handover",
        date: "2024-05-01",
        completed: true,
        description: "Received project documents and met with contractor",
      },
      {
        title: "Foundation Inspection",
        date: "2024-06-15",
        completed: true,
        description: "Verified foundation work and concrete quality",
      },
      {
        title: "Block Work Inspection",
        date: "2024-08-20",
        completed: true,
        description: "Supervised block laying and lintel casting",
      },
      {
        title: "First Floor Decking",
        date: "2024-10-15",
        completed: true,
        description: "Inspected decking and reinforcement before casting",
      },
      {
        title: "Roofing Stage",
        date: "2025-01-15",
        completed: false,
        description: "Roof truss installation and covering",
      },
      {
        title: "Finishing Stage",
        date: "2025-05-01",
        completed: false,
        description: "Plastering, tiling, and electrical fittings",
      },
      {
        title: "Final Handover",
        date: "2025-08-30",
        completed: false,
        description: "Final inspection and client handover",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/construction-site-foundation-work-nigeria.jpg",
        caption: "Foundation stage completed",
        date: "2024-06-15",
      },
      {
        type: "photo",
        url: "/building-construction-block-work-progress.jpg",
        caption: "Block work in progress",
        date: "2024-08-20",
      },
      {
        type: "photo",
        url: "/concrete-decking-construction-site.jpg",
        caption: "First floor decking",
        date: "2024-10-15",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/construction-progress-video-thumbnail.jpg",
        caption: "October progress update",
        date: "2024-10-30",
      },
      {
        type: "photo",
        url: "/building-second-floor-construction-nigeria.jpg",
        caption: "Second floor block work",
        date: "2024-11-10",
      },
    ],
    projectManager: {
      name: "Engr. Femi Ogundimu",
      phone: "+234 806 789 0123",
      email: "femi.ogundimu@oneredbox.com",
      image: "/professional-nigerian-engineer-man.jpg",
    },
    specifications: {
      landSize: "800 sqm",
      buildingType: "Detached Mansion",
      bedrooms: 5,
      bathrooms: 6,
      floors: 2,
      plotNumber: "18",
    },
  },
  {
    id: "proj-004",
    clientName: "Funke Williams",
    projectTitle: "Ibeju-Lekki Land Acquisition",
    serviceType: "land-acquisition",
    status: "in-progress",
    startDate: "2024-10-01",
    estimatedCompletion: "2025-02-28",
    completionPercentage: 35,
    summary:
      "Acquiring a 1000sqm plot in the fast-developing Ibeju-Lekki corridor near the new Dangote Refinery. This is an investment purchase with excellent appreciation potential given the ongoing infrastructure developments in the area.",
    location: {
      address: "Eleko Beach Road",
      city: "Ibeju-Lekki",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.4698,
        lng: 4.0012,
      },
    },
    financials: {
      totalFees: 35000000,
      amountPaid: 15000000,
      outstanding: 20000000,
      lastPaidAmount: 15000000,
      lastPaidDate: "2024-10-15",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Initial Consultation",
        date: "2024-10-01",
        completed: true,
        description: "Discussed investment goals and budget",
      },
      {
        title: "Property Identification",
        date: "2024-10-20",
        completed: true,
        description: "Shortlisted 4 potential plots",
      },
      {
        title: "Site Inspection",
        date: "2024-11-05",
        completed: false,
        description: "Virtual tour of shortlisted properties",
      },
      {
        title: "Due Diligence",
        date: "2024-12-15",
        completed: false,
        description: "Title verification and land survey",
      },
      {
        title: "Transaction Completion",
        date: "2025-02-28",
        completed: false,
        description: "Final payment and documentation",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Aerial view of the area",
        date: "2024-10-20",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Ongoing road development nearby",
        date: "2024-10-20",
      },
    ],
    projectManager: {
      name: "Chisom Eze",
      phone: "+234 803 456 7890",
      email: "chisom.eze@oneredbox.com",
      image: "/professional-nigerian-woman.jpg",
    },
    specifications: {
      landSize: "1000 sqm",
      plotNumber: "TBD",
    },
  },
  {
    id: "proj-005",
    clientName: "Dr. Chukwuemeka Obi",
    projectTitle: "Medical Clinic Design - Port Harcourt",
    serviceType: "building-design",
    status: "completed",
    startDate: "2024-01-15",
    estimatedCompletion: "2024-05-30",
    completionPercentage: 100,
    summary:
      "Specialized architectural design for a 10-bed private medical clinic in Port Harcourt. The design includes consultation rooms, a minor theatre, pharmacy, and laboratory spaces. Compliant with Nigerian healthcare facility standards.",
    location: {
      address: "45 Ada George Road",
      city: "Port Harcourt",
      state: "Rivers",
      country: "Nigeria",
      coordinates: {
        lat: 4.8156,
        lng: 7.0498,
      },
    },
    financials: {
      totalFees: 7500000,
      amountPaid: 7500000,
      outstanding: 0,
      lastPaidAmount: 2500000,
      lastPaidDate: "2024-05-25",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Healthcare Requirements Gathering",
        date: "2024-01-15",
        completed: true,
        description: "Specialized medical facility requirements",
      },
      {
        title: "Concept Design",
        date: "2024-02-10",
        completed: true,
        description: "Initial design concepts with medical workflow",
      },
      {
        title: "Regulatory Review",
        date: "2024-03-01",
        completed: true,
        description: "Compliance check with healthcare standards",
      },
      {
        title: "Detailed Design",
        date: "2024-04-15",
        completed: true,
        description: "Complete architectural and MEP drawings",
      },
      {
        title: "Final Documentation",
        date: "2024-05-30",
        completed: true,
        description: "Construction documents delivered",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Clinic exterior render",
        date: "2024-03-15",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Reception area design",
        date: "2024-04-01",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Ground floor plan",
        date: "2024-04-15",
      },
    ],
    projectManager: {
      name: "Architect Tunde Bakare",
      phone: "+234 805 678 9012",
      email: "tunde.bakare@oneredbox.com",
      image: "/professional-nigerian-architect-man.jpg",
    },
    specifications: {
      landSize: "1200 sqm",
      buildingType: "Medical Facility",
      floors: 2,
      plotNumber: "45",
    },
  },
  {
    id: "proj-006",
    clientName: "Babatunde Afolabi",
    projectTitle: "Luxury Villa Supervision - Banana Island",
    serviceType: "construction-supervision",
    status: "on-hold",
    startDate: "2024-02-01",
    estimatedCompletion: "2025-12-31",
    completionPercentage: 25,
    summary:
      "Construction supervision for an ultra-luxury 7-bedroom waterfront villa on Banana Island. Project currently on hold due to material importation delays. We have completed foundation and ground floor structure supervision.",
    location: {
      address: "Plot 7, Ocean Parade",
      city: "Banana Island",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.4589,
        lng: 3.4234,
      },
    },
    financials: {
      totalFees: 25000000,
      amountPaid: 12500000,
      outstanding: 12500000,
      lastPaidAmount: 6250000,
      lastPaidDate: "2024-06-01",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Project Initiation",
        date: "2024-02-01",
        completed: true,
        description: "Contract signing and site mobilization",
      },
      {
        title: "Foundation Works",
        date: "2024-04-15",
        completed: true,
        description: "Pile foundation and ground beams",
      },
      {
        title: "Ground Floor Structure",
        date: "2024-06-30",
        completed: true,
        description: "Ground floor columns and slab",
      },
      {
        title: "First Floor Structure",
        date: "2024-09-30",
        completed: false,
        description: "On hold - awaiting imported materials",
      },
      {
        title: "Roofing & Finishing",
        date: "2025-06-30",
        completed: false,
        description: "Pending",
      },
      {
        title: "Final Handover",
        date: "2025-12-31",
        completed: false,
        description: "Pending",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Pile foundation works",
        date: "2024-03-15",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Ground floor structure",
        date: "2024-06-30",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=200&width=300",
        caption: "Drone footage - June progress",
        date: "2024-06-30",
      },
    ],
    projectManager: {
      name: "Engr. Femi Ogundimu",
      phone: "+234 806 789 0123",
      email: "femi.ogundimu@oneredbox.com",
      image: "/professional-nigerian-engineer-man.jpg",
    },
    specifications: {
      landSize: "1500 sqm",
      buildingType: "Waterfront Villa",
      bedrooms: 7,
      bathrooms: 8,
      floors: 3,
      plotNumber: "7",
    },
  },
  {
    id: "proj-007",
    clientName: "Grace Adekunle",
    projectTitle: "Ajah Residential Land Purchase",
    serviceType: "land-acquisition",
    status: "completed",
    startDate: "2024-06-01",
    estimatedCompletion: "2024-09-30",
    completionPercentage: 100,
    summary:
      "Successful acquisition of a 450sqm residential plot in Ajah for a first-time diaspora investor. The property is in a gated estate with 24-hour security, good road network, and all basic amenities. Ideal for future development or resale.",
    location: {
      address: "Plot 56, Pearl Gardens Estate",
      city: "Ajah",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.4667,
        lng: 3.5833,
      },
    },
    financials: {
      totalFees: 22000000,
      amountPaid: 22000000,
      outstanding: 0,
      lastPaidAmount: 10000000,
      lastPaidDate: "2024-09-15",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Client Onboarding",
        date: "2024-06-01",
        completed: true,
        description: "First-time buyer consultation",
      },
      {
        title: "Estate Selection",
        date: "2024-06-20",
        completed: true,
        description: "Identified suitable gated estates",
      },
      {
        title: "Virtual Inspection",
        date: "2024-07-10",
        completed: true,
        description: "Video call site tour",
      },
      {
        title: "Legal Verification",
        date: "2024-08-05",
        completed: true,
        description: "Governor's consent and title search",
      },
      {
        title: "Purchase Completed",
        date: "2024-09-15",
        completed: true,
        description: "Deed of assignment executed",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Estate entrance gate",
        date: "2024-07-10",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "The acquired plot",
        date: "2024-09-15",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=200&width=300",
        caption: "Virtual tour recording",
        date: "2024-07-10",
      },
    ],
    projectManager: {
      name: "Chisom Eze",
      phone: "+234 803 456 7890",
      email: "chisom.eze@oneredbox.com",
      image: "/professional-nigerian-woman.jpg",
    },
    specifications: {
      landSize: "450 sqm",
      plotNumber: "56",
    },
  },
  {
    id: "proj-008",
    clientName: "Samuel Johnson",
    projectTitle: "3-Bedroom Bungalow Design - Ibadan",
    serviceType: "building-design",
    status: "in-progress",
    startDate: "2024-09-15",
    estimatedCompletion: "2025-01-31",
    completionPercentage: 50,
    summary:
      "Retirement home design for a US-based client returning to Nigeria. Simple yet elegant 3-bedroom bungalow with emphasis on accessibility, natural ventilation, and low maintenance. Includes a detached BQ for staff accommodation.",
    location: {
      address: "Plot 8, Jericho GRA",
      city: "Ibadan",
      state: "Oyo",
      country: "Nigeria",
      coordinates: {
        lat: 7.3878,
        lng: 3.8963,
      },
    },
    financials: {
      totalFees: 2800000,
      amountPaid: 1680000,
      outstanding: 1120000,
      lastPaidAmount: 840000,
      lastPaidDate: "2024-11-01",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Requirements Gathering",
        date: "2024-09-15",
        completed: true,
        description: "Accessibility and retirement living needs",
      },
      {
        title: "Concept Design",
        date: "2024-10-05",
        completed: true,
        description: "Initial bungalow concepts",
      },
      {
        title: "Design Development",
        date: "2024-11-01",
        completed: true,
        description: "Detailed floor plans approved",
      },
      {
        title: "Technical Drawings",
        date: "2024-12-15",
        completed: false,
        description: "Structural and MEP drawings",
      },
      {
        title: "Final Documentation",
        date: "2025-01-31",
        completed: false,
        description: "BOQ and construction documents",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Bungalow exterior concept",
        date: "2024-10-05",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Floor plan layout",
        date: "2024-11-01",
      },
    ],
    projectManager: {
      name: "Architect Tunde Bakare",
      phone: "+234 805 678 9012",
      email: "tunde.bakare@oneredbox.com",
      image: "/professional-nigerian-architect-man.jpg",
    },
    specifications: {
      landSize: "600 sqm",
      buildingType: "Bungalow with BQ",
      bedrooms: 3,
      bathrooms: 3,
      floors: 1,
      plotNumber: "8",
    },
  },
  {
    id: "proj-009",
    clientName: "Ngozi Chidozie",
    projectTitle: "Commercial Plaza Supervision - Enugu",
    serviceType: "construction-supervision",
    status: "in-progress",
    startDate: "2024-04-01",
    estimatedCompletion: "2025-10-31",
    completionPercentage: 55,
    summary:
      "Construction supervision for a 2-storey commercial plaza in Enugu metropolis. The building will house 12 shop units on the ground floor and office spaces on the first floor. Currently at roofing stage with MEP rough-ins ongoing.",
    location: {
      address: "123 Ogui Road",
      city: "Enugu",
      state: "Enugu",
      country: "Nigeria",
      coordinates: {
        lat: 6.4412,
        lng: 7.4943,
      },
    },
    financials: {
      totalFees: 6000000,
      amountPaid: 4200000,
      outstanding: 1800000,
      lastPaidAmount: 1200000,
      lastPaidDate: "2024-10-15",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Project Commencement",
        date: "2024-04-01",
        completed: true,
        description: "Site handover and baseline documentation",
      },
      {
        title: "Foundation Stage",
        date: "2024-05-30",
        completed: true,
        description: "Foundation inspection and approval",
      },
      {
        title: "Ground Floor Structure",
        date: "2024-07-15",
        completed: true,
        description: "Columns, beams, and first floor slab",
      },
      {
        title: "First Floor & Parapet",
        date: "2024-09-30",
        completed: true,
        description: "First floor structure completed",
      },
      {
        title: "Roofing",
        date: "2024-11-30",
        completed: false,
        description: "Roof structure and covering",
      },
      {
        title: "Finishing Works",
        date: "2025-06-30",
        completed: false,
        description: "Plastering, tiling, and painting",
      },
      {
        title: "Final Inspection",
        date: "2025-10-31",
        completed: false,
        description: "Handover and defect liability period",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Foundation stage",
        date: "2024-05-30",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Ground floor structure",
        date: "2024-07-15",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "First floor completed",
        date: "2024-09-30",
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=200&width=300",
        caption: "September drone footage",
        date: "2024-09-30",
      },
    ],
    projectManager: {
      name: "Engr. Chinedu Okwu",
      phone: "+234 807 890 1234",
      email: "chinedu.okwu@oneredbox.com",
      image: "/placeholder.svg?height=100&width=100",
    },
    specifications: {
      landSize: "900 sqm",
      buildingType: "Commercial Plaza",
      floors: 2,
      plotNumber: "123",
    },
  },
  {
    id: "proj-010",
    clientName: "Kehinde Fashola",
    projectTitle: "Epe Waterfront Land Acquisition",
    serviceType: "land-acquisition",
    status: "in-progress",
    startDate: "2024-11-01",
    estimatedCompletion: "2025-04-30",
    completionPercentage: 20,
    summary:
      "Acquiring a rare 2000sqm waterfront plot in Epe for a diaspora client planning to build a weekend getaway home. The location offers serene lagoon views and is part of an emerging luxury development corridor.",
    location: {
      address: "Lagoon View Estate",
      city: "Epe",
      state: "Lagos",
      country: "Nigeria",
      coordinates: {
        lat: 6.5844,
        lng: 3.9833,
      },
    },
    financials: {
      totalFees: 65000000,
      amountPaid: 20000000,
      outstanding: 45000000,
      lastPaidAmount: 20000000,
      lastPaidDate: "2024-11-10",
      currency: "NGN",
    },
    milestones: [
      {
        title: "Client Briefing",
        date: "2024-11-01",
        completed: true,
        description: "Waterfront property requirements discussed",
      },
      {
        title: "Property Search",
        date: "2024-11-20",
        completed: true,
        description: "Identified 3 waterfront options",
      },
      {
        title: "Site Inspection",
        date: "2024-12-15",
        completed: false,
        description: "Virtual drone tour of properties",
      },
      {
        title: "Due Diligence",
        date: "2025-02-01",
        completed: false,
        description: "Waterfront rights and title verification",
      },
      {
        title: "Transaction Completion",
        date: "2025-04-30",
        completed: false,
        description: "Final payment and handover",
      },
    ],
    media: [
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Lagoon view from property",
        date: "2024-11-15",
      },
      {
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        caption: "Aerial view of the area",
        date: "2024-11-15",
      },
    ],
    projectManager: {
      name: "Chisom Eze",
      phone: "+234 803 456 7890",
      email: "chisom.eze@oneredbox.com",
      image: "/professional-nigerian-woman.jpg",
    },
    specifications: {
      landSize: "2000 sqm",
      plotNumber: "TBD",
    },
  },
];
