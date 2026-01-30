import { defineField, defineType } from "sanity";

export const buildingDesign = defineType({
  name: "buildingDesign",
  title: "Building Design",
  type: "document",
  fields: [
    // Step 1
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "projectAddress",
      title: "Project Address",
      type: "string",
    }),
    defineField({
      name: "landSize",
      title: "Land Size",
      type: "string",
    }),
    defineField({
      name: "landTitle",
      title: "Land Title",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Consultation Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Consultation Time",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    // Step 2
    defineField({
      name: "buildingCategory",
      title: "Building Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "residentialType",
      title: "Residential Type",
      type: "string",
    }),
    defineField({
      name: "commercialType",
      title: "Commercial Type",
      type: "string",
    }),
    defineField({
      name: "specialType",
      title: "Special Type",
      type: "string",
    }),

    // Step 3
    defineField({
      name: "floors",
      title: "Floors",
      type: "string",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "string",
    }),
    defineField({
      name: "livingRooms",
      title: "Living Rooms",
      type: "string",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "string",
    }),
    defineField({
      name: "kitchenType",
      title: "Kitchen Type",
      type: "string",
    }),
    defineField({
      name: "guestToilet",
      title: "Guest Toilet",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "specialSpaces",
      title: "Special Spaces",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "string",
    }),
    defineField({
      name: "buildingStyle",
      title: "Building Style",
      type: "string",
    }),
    defineField({
      name: "inspiration",
      title: "Inspiration",
      type: "string",
    }),

    // Step 4
    defineField({
      name: "soilTestAvailable",
      title: "Soil Test Available",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "needSoilTest",
      title: "Need Soil Test",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "structuralSystem",
      title: "Structural System",
      type: "string",
    }),
    defineField({
      name: "solar",
      title: "Solar",
      type: "boolean",
    }),
    defineField({
      name: "borehole",
      title: "Borehole",
      type: "boolean",
    }),
    defineField({
      name: "drainage",
      title: "Drainage",
      type: "boolean",
    }),

    // Step 5
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "finishingLevel",
      title: "Finishing Level",
      type: "string",
    }),
    defineField({
      name: "materialPreferences",
      title: "Material Preferences",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Step 6
    defineField({
      name: "projectManagement",
      title: "Project Management",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "approvalSubmission",
      title: "Approval Submission",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "boqPreparation",
      title: "BOQ Preparation",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),

    // Step 7
    defineField({
      name: "interiorDesign",
      title: "Interior Design",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "landscapeDesign",
      title: "Landscape Design",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "render3d",
      title: "3D Render",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "additionalNotes",
      title: "Additional Notes",
      type: "text",
    }),
    defineField({
      name: "referralSource",
      title: "How did you hear about us?",
      type: "string",
      options: {
        list: [
          { title: "Social Media (Facebook, Instagram, Twitter)", value: "social-media" },
          { title: "Google Search", value: "google-search" },
          { title: "Friend/Family Referral", value: "friend-referral" },
          { title: "Previous Client", value: "previous-client" },
          { title: "Advertisement", value: "advertisement" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "optInVideoUpdates",
      title: "Opt in for Live Site Video Updates",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
