import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beds",
      title: "Beds",
      type: "number",
    }),
    defineField({
      name: "baths",
      title: "Baths",
      type: "number",
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "number",
    }),
    defineField({
      name: "sqft",
      title: "Sqft",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image", // Using Sanity image type
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "string",
    }),
    defineField({
      name: "propertyId",
      title: "Property ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "agent",
      title: "Agent",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "phone", type: "string", title: "Phone" }),
        defineField({ name: "email", type: "string", title: "Email" }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
