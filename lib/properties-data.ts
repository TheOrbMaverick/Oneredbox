export interface Property {
  id: number;
  title: string;
  location: string;
  address: string;
  price: string;
  type: string;
  status: string;
  beds?: number;
  baths?: number;
  parking?: number;
  sqft: string;
  image: string;
  featured: boolean;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  yearBuilt?: string;
  propertyId: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    address: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
    price: "₦85,000,000",
    type: "Duplex",
    status: "For Sale",
    beds: 4,
    baths: 5,
    parking: 2,
    sqft: "350 sqm",
    image: "/modern-duplex-house-lagos-nigeria.jpg",
    featured: true,
    description:
      "This stunning modern duplex offers the perfect blend of luxury and functionality. Located in the prestigious Lekki Phase 1, this property features contemporary architecture, premium finishes, and thoughtful design throughout. The open-plan living areas are flooded with natural light, while the bedrooms offer private retreats with en-suite bathrooms. Perfect for families seeking comfort and style in one of Lagos's most sought-after neighborhoods.",
    features: [
      "Open-plan living and dining area",
      "Fully fitted modern kitchen with island",
      "Master bedroom with walk-in closet",
      "All bedrooms en-suite",
      "Boys quarters (BQ)",
      "24/7 security",
      "Treated water supply",
      "Backup generator",
    ],
    amenities: [
      "Swimming pool",
      "Private garden",
      "CCTV surveillance",
      "Intercom system",
      "Central air conditioning",
      "Marble flooring",
      "Smart home features",
      "Gated estate",
    ],
    images: [
      "/modern-duplex-exterior-lagos.jpg",
      "/luxury-living-room.png",
      "/modern-kitchen-island.png",
      "/master-bedroom-ensuite.png",
      "/modern-bathroom-luxury.jpg",
      "/swimming-pool-backyard.jpg",
    ],
    yearBuilt: "2022",
    propertyId: "ORB-LAG-001",
    agent: {
      name: "Adebayo Johnson",
      phone: "+234 801 234 5678",
      email: "adebayo@oneredbox.com",
    },
  },
  {
    id: 2,
    title: "Executive Land Plot",
    location: "Ibeju-Lekki, Lagos",
    address: "Along Lekki-Epe Expressway, Ibeju-Lekki, Lagos, Nigeria",
    price: "₦15,000,000",
    type: "Land",
    status: "For Sale",
    sqft: "600 sqm",
    image: "/land-plot-for-sale-nigeria.jpg",
    featured: false,
    description:
      "Prime land opportunity in the rapidly developing Ibeju-Lekki corridor. This 600 sqm plot is strategically located near the upcoming Dangote Refinery and Lekki Deep Sea Port, making it an excellent investment opportunity. The land is fully dry, properly surveyed, and comes with verified documentation. Ideal for residential development or long-term investment.",
    features: [
      "600 sqm plot size",
      "Fully dry land",
      "Proper survey and documentation",
      "C of O in progress",
      "Access road available",
      "Near major developments",
      "Fenced and gated estate",
      "Electricity infrastructure",
    ],
    amenities: [
      "Estate security",
      "Drainage system",
      "Street lights",
      "Perimeter fencing",
      "Good road network",
      "Near shopping centers",
      "Close to schools",
      "Hospital nearby",
    ],
    images: [
      "/land-plot-for-sale-lagos.jpg",
      "/surveyed-land-with-beacons.jpg",
      "/estate-entrance-gate-nigeria.jpg",
      "/road-infrastructure-development.jpg",
      "/aerial-view-land-estate.jpg",
    ],
    propertyId: "ORB-LAG-002",
    agent: {
      name: "Chioma Okafor",
      phone: "+234 802 345 6789",
      email: "chioma@oneredbox.com",
    },
  },
  {
    id: 3,
    title: "Luxury 5-Bedroom Mansion",
    location: "Banana Island, Lagos",
    address: "Plot 15, Banana Island Estate, Ikoyi, Lagos, Nigeria",
    price: "₦450,000,000",
    type: "Mansion",
    status: "For Sale",
    beds: 5,
    baths: 7,
    parking: 4,
    sqft: "800 sqm",
    image: "/luxury-mansion-banana-island-lagos.jpg",
    featured: true,
    description:
      "Experience unparalleled luxury in this magnificent Banana Island mansion. This architectural masterpiece spans 800 sqm of meticulously designed living space, featuring imported Italian finishes, smart home automation, and breathtaking waterfront views. The property includes a private cinema, wine cellar, and rooftop terrace. A rare opportunity to own one of Lagos's most prestigious addresses.",
    features: [
      "5 bedrooms all en-suite",
      "Private home cinema",
      "Wine cellar",
      "Rooftop terrace with lounge",
      "Staff quarters (3 rooms)",
      "Home office/study",
      "Gym and spa room",
      "Elevator access",
    ],
    amenities: [
      "Infinity pool",
      "Waterfront views",
      "Smart home automation",
      "Solar power backup",
      "Italian marble throughout",
      "Landscaped gardens",
      "4-car garage",
      "24/7 estate security",
    ],
    images: [
      "/luxury-mansion-banana-island-lagos.jpg",
      "/grand-living-room-chandelier.jpg",
      "/infinity-pool-waterfront-view.jpg",
      "/home-cinema-theater-room.jpg",
      "/luxury-master-suite-bedroom.jpg",
      "/wine-cellar-luxury-home.jpg",
      "/rooftop-terrace-city-view.jpg",
    ],
    yearBuilt: "2021",
    propertyId: "ORB-LAG-003",
    agent: {
      name: "Emeka Nwosu",
      phone: "+234 803 456 7890",
      email: "emeka@oneredbox.com",
    },
  },
  {
    id: 4,
    title: "3-Bedroom Bungalow",
    location: "Gwarinpa, Abuja",
    address: "45 3rd Avenue, Gwarinpa Estate, Abuja, Nigeria",
    price: "₦45,000,000",
    type: "Bungalow",
    status: "For Sale",
    beds: 3,
    baths: 3,
    parking: 1,
    sqft: "200 sqm",
    image: "/bungalow-house-abuja-nigeria.jpg",
    featured: false,
    description:
      "Charming 3-bedroom bungalow in the serene Gwarinpa Estate. This well-maintained property offers comfortable living with modern amenities in one of Abuja's most family-friendly neighborhoods. Features include a spacious compound, mature landscaping, and easy access to schools, hospitals, and shopping centers. Perfect for families or as an investment property.",
    features: [
      "3 spacious bedrooms",
      "All rooms en-suite",
      "Large living and dining area",
      "Fitted kitchen",
      "Boys quarters",
      "Spacious compound",
      "Mature garden",
      "Store room",
    ],
    amenities: [
      "Tarred road access",
      "Estate security",
      "Borehole water",
      "Prepaid meter",
      "Fence and gate",
      "Near shopping mall",
      "Close to schools",
      "Hospital within 5km",
    ],
    images: [
      "/bungalow-house-abuja-nigeria.jpg",
      "/living-room-bungalow-interior.jpg",
      "/bedroom-modern-simple.jpg",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    yearBuilt: "2018",
    propertyId: "ORB-ABJ-001",
    agent: {
      name: "Fatima Abdullahi",
      phone: "+234 804 567 8901",
      email: "fatima@oneredbox.com",
    },
  },
  {
    id: 5,
    title: "Commercial Land",
    location: "Victoria Island, Lagos",
    address: "Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
    price: "₦250,000,000",
    type: "Land",
    status: "For Sale",
    sqft: "1,200 sqm",
    image: "/commercial-land-victoria-island-lagos.jpg",
    featured: false,
    description:
      "Prime commercial land in the heart of Victoria Island's business district. This 1,200 sqm plot is ideal for corporate headquarters, hotel development, or mixed-use commercial projects. Located on Adeola Odeku Street with excellent visibility and access, the property comes with approved building plans for a 10-story development. A rare opportunity in Lagos's most prestigious commercial area.",
    features: [
      "1,200 sqm land size",
      "C of O available",
      "Approved building plans",
      "Corner piece",
      "Dual access roads",
      "Commercial zoning",
      "No restrictions",
      "Survey available",
    ],
    amenities: [
      "Prime business district",
      "Near major banks",
      "Close to hotels",
      "Easy airport access",
      "Public transport links",
      "High foot traffic",
      "24/7 area security",
      "All utilities available",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    propertyId: "ORB-LAG-004",
    agent: {
      name: "Tunde Bakare",
      phone: "+234 805 678 9012",
      email: "tunde@oneredbox.com",
    },
  },
  {
    id: 6,
    title: "Semi-Detached 4-Bedroom",
    location: "Ajah, Lagos",
    address: "Graceland Estate, Ajah, Lagos, Nigeria",
    price: "₦55,000,000",
    type: "Semi-Detached",
    status: "For Sale",
    beds: 4,
    baths: 4,
    parking: 2,
    sqft: "280 sqm",
    image: "/semi-detached-house-ajah-lagos.jpg",
    featured: false,
    description:
      "Beautiful semi-detached duplex in the well-planned Graceland Estate, Ajah. This 4-bedroom property offers excellent value in a rapidly appreciating area. Features include modern finishes, a functional layout, and a secure gated community with amenities. Ideal for young families looking for quality living at an accessible price point.",
    features: [
      "4 bedrooms (all en-suite)",
      "Guest toilet",
      "Spacious living areas",
      "Modern kitchen",
      "Boys quarters",
      "Family lounge upstairs",
      "Balcony",
      "Storage spaces",
    ],
    amenities: [
      "Gated estate",
      "24/7 security",
      "Children playground",
      "Green areas",
      "Good drainage",
      "Paved roads",
      "Near Ajah market",
      "Schools nearby",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    yearBuilt: "2020",
    propertyId: "ORB-LAG-005",
    agent: {
      name: "Grace Eze",
      phone: "+234 806 789 0123",
      email: "grace@oneredbox.com",
    },
  },
];

export function getPropertyById(id: number): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  const id = Number.parseInt(slug, 10);
  return getPropertyById(id);
}
