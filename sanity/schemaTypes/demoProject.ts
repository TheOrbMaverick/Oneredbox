import { defineField, defineType } from "sanity";

export const demoProject = defineType({
  name: "demoProject",
  title: "Demo Project",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectTitle",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceType",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Land Acquisition", value: "land-acquisition" },
          { title: "Building Design", value: "building-design" },
          {
            title: "Construction Supervision",
            value: "construction-supervision",
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
          { title: "On Hold", value: "on-hold" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "estimatedCompletion",
      title: "Estimated Completion",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completionPercentage",
      title: "Completion Percentage",
      type: "number",
      validation: (rule) => rule.min(0).max(100).required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        defineField({ name: "address", type: "string", title: "Address" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "country", type: "string", title: "Country" }),
        defineField({
          name: "coordinates",
          title: "Coordinates",
          type: "object",
          fields: [
            defineField({ name: "lat", type: "number", title: "Latitude" }),
            defineField({ name: "lng", type: "number", title: "Longitude" }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "financials",
      title: "Financials",
      type: "projectFinancials",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [{ type: "projectMilestone" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "projectMedia" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectManager",
      title: "Project Manager",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "phone", type: "string", title: "Phone" }),
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "image", type: "image", title: "Image" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "object",
      fields: [
        defineField({ name: "landSize", type: "string", title: "Land Size" }),
        defineField({
          name: "buildingType",
          type: "string",
          title: "Building Type",
        }),
        defineField({ name: "bedrooms", type: "number", title: "Bedrooms" }),
        defineField({ name: "bathrooms", type: "number", title: "Bathrooms" }),
        defineField({ name: "floors", type: "number", title: "Floors" }),
        defineField({
          name: "plotNumber",
          type: "string",
          title: "Plot Number",
        }),
      ],
    }),
  ],
});
