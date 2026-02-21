import { defineField, defineType } from "sanity";

export const projectMedia = defineType({
  name: "projectMedia",
  title: "Project Media",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent.type !== "photo",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (
            (context.parent as Record<string, any>)?.type === "photo" &&
            !value
          ) {
            return "Image is required for photos";
          }
          return true;
        }),
    }),

    defineField({
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.type !== "video",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (
            (context.parent as Record<string, any>)?.type === "video" &&
            !value
          ) {
            return "Video file is required for videos";
          }
          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],
});

export const projectFinancials = defineType({
  name: "projectFinancials",
  title: "Project Financials",
  type: "object",
  fields: [
    defineField({
      name: "totalFees",
      title: "Total Fees",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amountPaid",
      title: "Amount Paid",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "outstanding",
      title: "Outstanding",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastPaidAmount",
      title: "Last Paid Amount",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastPaidDate",
      title: "Last Paid Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "NGN",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const projectMilestone = defineType({
  name: "projectMilestone",
  title: "Project Milestone",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completed",
      title: "Completed",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});

export const clientProject = defineType({
  name: "clientProject",
  title: "Client Project",
  type: "document",
  fields: [
    defineField({
      name: "clientRef",
      title: "Client Ref",
      type: "reference",
      to: [{ type: "client" }],
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: "clientName",
    //   title: "Client Name",
    //   type: "string",
    //   validation: (rule) => rule.required(),
    // }),
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
      type: "reference",
      to: [{ type: "projectManager" }],
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
