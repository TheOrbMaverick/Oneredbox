import { z } from "zod";

// ============================================
// LAND ACQUISITION FORM SCHEMAS
// ============================================

export const landAcquisitionStep1BaseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  countryOfResidence: z
    .string()
    .min(1, "Please enter your country of residence"),
  preferredContactMethod: z.enum(["call", "whatsapp", "email"], {
    required_error: "Please select a preferred contact method",
  }),
  buyerType: z.enum(["direct", "representative"], {
    required_error: "Please indicate if you are the direct buyer",
  }),
  relationshipToBuyer: z.string().optional(),
  date: z
    .string()
    .min(1, { message: "Select a date for the consultation meet" }),
  time: z.string().min(1, { message: "Select a for the consultation meet" }),
});

export const landAcquisitionRefinement = (data: {
  buyerType: "direct" | "representative";
  relationshipToBuyer?: string;
}) => {
  if (data.buyerType === "representative") {
    return !!data.relationshipToBuyer && data.relationshipToBuyer.length > 0;
  }
  return true;
};

export const landAcquisitionStep1Schema = landAcquisitionStep1BaseSchema.refine(
  landAcquisitionRefinement,
  {
    message: "Please specify your relationship to the buyer",
    path: ["relationshipToBuyer"],
  }
);

export const landAcquisitionStep2Schema = z.object({
  preferredLocation: z.string().min(1, "Please enter preferred location(s)"),
  minLandSize: z
    .string()
    .regex(/^(?:$|\d+(?:\.\d+)?$)/, {
      message: "Provide a positive numeric value",
    })
    .optional(),
  maxLandSize: z
    .string()
    .regex(/^(?:$|\d+(?:\.\d+)?$)/, {
      message: "Provide a positive numeric value",
    })
    .optional(),
  landShape: z.string().optional(),
  purpose: z.string().min(1, "Please select the purpose of the land"),
  minBudget: z
    .string()
    .regex(/^(?:$|\d+(?:\.\d+)?$)/, {
      message: "Provide a positive numeric value",
    })
    .optional(),
  maxBudget: z
    .string()
    .regex(/^(?:$|\d+(?:\.\d+)?$)/, {
      message: "Provide a positive numeric value",
    })
    .optional(),
  preferredLandTitle: z.string().optional(),
  installmentPayment: z.enum(["yes", "no"]).optional(),
  timeline: z.string().optional(),
});

export const landAcquisitionStep3Schema = z.object({
  roadAccess: z.string().optional(),
  proximityPreferences: z.array(z.string()).optional(),
  floodFree: z.enum(["yes", "no"]).optional(),
  gatedCommunity: z.enum(["yes", "no"]).optional(),
  securityPriority: z.string().optional(),
});

export const landAcquisitionStep4Schema = z.object({
  verifyDocuments: z.enum(["yes", "no"]).optional(),
  checkOwnership: z.enum(["yes", "no"]).optional(),
  siteVisit: z.enum(["yes", "no"]).optional(),
  negotiation: z.enum(["yes", "no"]).optional(),
});

export const landAcquisitionStep5Schema = z.object({
  surveyService: z.enum(["yes", "no"]).optional(),
  perfection: z.enum(["yes", "no"]).optional(),
  fencing: z.enum(["yes", "no"]).optional(),
  additionalNotes: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
});

// ============================================
// BUILDING DESIGN FORM SCHEMAS
// ============================================

export const buildingDesignStep1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectAddress: z.string().optional(),
  landSize: z.string().optional(),
  landTitle: z.string().optional(),
  date: z
    .string()
    .min(1, { message: "Select a date for the consultation meet" }),
  time: z.string().min(1, { message: "Select a for the consultation meet" }),
});

export const buildingDesignStep2Schema = z.object({
  buildingCategory: z.string().min(1, "Please select a building category"),
  residentialType: z.string().optional(),
  commercialType: z.string().optional(),
  specialType: z.string().optional(),
});

export const buildingDesignStep3Schema = z.object({
  floors: z.string().optional(),
  bedrooms: z.string().optional(),
  livingRooms: z.string().optional(),
  bathrooms: z.string().optional(),
  kitchenType: z.string().optional(),
  guestToilet: z.enum(["yes", "no"]).optional(),
  specialSpaces: z.array(z.string()).optional(),
  parking: z.number().optional(),
  buildingStyle: z.string().optional(),
  inspiration: z.string().optional(),
});

export const buildingDesignStep4Schema = z.object({
  soilTestAvailable: z.enum(["yes", "no"]).optional(),
  needSoilTest: z.enum(["yes", "no"]).optional(),
  structuralSystem: z.string().optional(),
  solar: z.boolean().optional(),
  borehole: z.boolean().optional(),
  drainage: z.boolean().optional(),
});

export const buildingDesignStep5Schema = z.object({
  budgetRange: z.string().optional(),
  finishingLevel: z.string().optional(),
  materialPreferences: z.array(z.string()).optional(),
});

export const buildingDesignStep6Schema = z.object({
  projectManagement: z.enum(["yes", "no"]).optional(),
  approvalSubmission: z.enum(["yes", "no"]).optional(),
  boqPreparation: z.enum(["yes", "no"]).optional(),
});

export const buildingDesignStep7Schema = z.object({
  interiorDesign: z.enum(["yes", "no"]).optional(),
  landscapeDesign: z.enum(["yes", "no"]).optional(),
  render3d: z.enum(["yes", "no"]).optional(),
  additionalNotes: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
});

// ============================================
// CONSTRUCTION SUPERVISION FORM SCHEMAS
// ============================================

export const constructionSupervisionStep1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectLocation: z.string().min(1, "Please enter the project location"),
  ownerType: z.enum(["owner", "representative"], {
    required_error: "Please indicate if you are the owner or representative",
  }),
  contractorName: z.string().optional(),
  date: z
    .string()
    .min(1, { message: "Select a date for the consultation meet" }),
  time: z.string().min(1, { message: "Select a for the consultation meet" }),
});

export const constructionSupervisionStep2Schema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
  constructionStage: z
    .string()
    .min(1, "Please select the current construction stage"),
  completionDate: z.string().optional(),
  soilTest: z.enum(["yes", "no", "unknown"]).optional(),
});

export const constructionSupervisionStep3Schema = z.object({
  drawings: z.array(z.string()).optional(),
  hasApprovals: z.enum(["yes", "no", "in-progress"]).optional(),
  contractorScope: z.string().optional(),
});

export const constructionSupervisionStep4Schema = z.object({
  supervisionLevel: z.string().min(1, "Please select a supervision level"),
  photoReporting: z.enum(["yes", "no"]).optional(),
  materialVerification: z.enum(["yes", "no"]).optional(),
  stageApproval: z.enum(["yes", "no"]).optional(),
  boqAudit: z.enum(["yes", "no"]).optional(),
  remeasure: z.enum(["yes", "no"]).optional(),
  safetyOversight: z.enum(["yes", "no"]).optional(),
});

export const constructionSupervisionStep5Schema = z.object({
  qualityChecks: z.array(z.string()).optional(),
});

export const constructionSupervisionStep6Schema = z.object({
  costEstimation: z.enum(["yes", "no"]).optional(),
  progressReports: z.enum(["yes", "no"]).optional(),
  additionalNotes: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
});

// Type exports
export type LandAcquisitionStep1 = z.infer<typeof landAcquisitionStep1Schema>;
export type LandAcquisitionStep2 = z.infer<typeof landAcquisitionStep2Schema>;
export type LandAcquisitionStep3 = z.infer<typeof landAcquisitionStep3Schema>;
export type LandAcquisitionStep4 = z.infer<typeof landAcquisitionStep4Schema>;
export type LandAcquisitionStep5 = z.infer<typeof landAcquisitionStep5Schema>;

export type BuildingDesignStep1 = z.infer<typeof buildingDesignStep1Schema>;
export type BuildingDesignStep2 = z.infer<typeof buildingDesignStep2Schema>;
export type BuildingDesignStep3 = z.infer<typeof buildingDesignStep3Schema>;
export type BuildingDesignStep4 = z.infer<typeof buildingDesignStep4Schema>;
export type BuildingDesignStep5 = z.infer<typeof buildingDesignStep5Schema>;
export type BuildingDesignStep6 = z.infer<typeof buildingDesignStep6Schema>;
export type BuildingDesignStep7 = z.infer<typeof buildingDesignStep7Schema>;

export type ConstructionSupervisionStep1 = z.infer<
  typeof constructionSupervisionStep1Schema
>;
export type ConstructionSupervisionStep2 = z.infer<
  typeof constructionSupervisionStep2Schema
>;
export type ConstructionSupervisionStep3 = z.infer<
  typeof constructionSupervisionStep3Schema
>;
export type ConstructionSupervisionStep4 = z.infer<
  typeof constructionSupervisionStep4Schema
>;
export type ConstructionSupervisionStep5 = z.infer<
  typeof constructionSupervisionStep5Schema
>;
export type ConstructionSupervisionStep6 = z.infer<
  typeof constructionSupervisionStep6Schema
>;
