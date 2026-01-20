import { defineField, defineType } from "sanity";

export const landAcquisition = defineType({
  name: "landAcquisition",
  title: "Land Acquisition",
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
      name: "countryOfResidence",
      title: "Country of Residence",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preferredContactMethod",
      title: "Preferred Contact Method",
      type: "string",
      options: {
        list: [
          { title: "Call", value: "call" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Email", value: "email" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buyerType",
      title: "Buyer Type",
      type: "string",
      options: {
        list: [
          { title: "Direct Buyer", value: "direct" },
          { title: "Representative", value: "representative" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relationshipToBuyer",
      title: "Relationship to Buyer",
      type: "string",
      hidden: ({ document }) => document?.buyerType !== "representative",
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
      name: "preferredLocation",
      title: "Preferred Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minLandSize",
      title: "Min Land Size",
      type: "string",
    }),
    defineField({
      name: "maxLandSize",
      title: "Max Land Size",
      type: "string",
    }),
    defineField({
      name: "landShape",
      title: "Land Shape",
      type: "string",
    }),
    defineField({
      name: "purpose",
      title: "Purpose",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minBudget",
      title: "Min Budget",
      type: "string",
    }),
    defineField({
      name: "maxBudget",
      title: "Max Budget",
      type: "string",
    }),
    defineField({
      name: "preferredLandTitle",
      title: "Preferred Land Title",
      type: "string",
    }),
    defineField({
      name: "installmentPayment",
      title: "Installment Payment",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
    }),

    // Step 3
    defineField({
      name: "roadAccess",
      title: "Road Access",
      type: "string",
    }),
    defineField({
      name: "proximityPreferences",
      title: "Proximity Preferences",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "floodFree",
      title: "Flood Free",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "gatedCommunity",
      title: "Gated Community",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "securityPriority",
      title: "Security Priority",
      type: "string",
    }),

    // Step 4
    defineField({
      name: "verifyDocuments",
      title: "Verify Documents",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "checkOwnership",
      title: "Check Ownership",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "siteVisit",
      title: "Site Visit",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "negotiation",
      title: "Negotiation",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),

    // Step 5
    defineField({
      name: "surveyService",
      title: "Survey Service",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "perfection",
      title: "Perfection",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "fencing",
      title: "Fencing",
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
  ],
});
