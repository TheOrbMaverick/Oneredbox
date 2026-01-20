import { defineField, defineType } from "sanity";

export const constructionSupervision = defineType({
  name: "constructionSupervision",
  title: "Construction Supervision",
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
      name: "projectLocation",
      title: "Project Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ownerType",
      title: "Owner Type",
      type: "string",
      options: {
        list: [
          { title: "Owner", value: "owner" },
          { title: "Representative", value: "representative" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contractorName",
      title: "Contractor Name",
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
      name: "projectType",
      title: "Project Type",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "constructionStage",
      title: "Construction Stage",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "string",
    }),
    defineField({
      name: "soilTest",
      title: "Soil Test",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
          { title: "Unknown", value: "unknown" },
        ],
      },
    }),

    // Step 3
    defineField({
      name: "drawings",
      title: "Drawings",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "hasApprovals",
      title: "Has Approvals",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
          { title: "In Progress", value: "in-progress" },
        ],
      },
    }),
    defineField({
      name: "contractorScope",
      title: "Contractor Scope",
      type: "string",
    }),

    // Step 4
    defineField({
      name: "supervisionLevel",
      title: "Supervision Level",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photoReporting",
      title: "Photo Reporting",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "materialVerification",
      title: "Material Verification",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "stageApproval",
      title: "Stage Approval",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "boqAudit",
      title: "BOQ Audit",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "remeasure",
      title: "Remeasure",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "safetyOversight",
      title: "Safety Oversight",
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
      name: "qualityChecks",
      title: "Quality Checks",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Step 6
    defineField({
      name: "costEstimation",
      title: "Cost Estimation",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "progressReports",
      title: "Progress Reports",
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
