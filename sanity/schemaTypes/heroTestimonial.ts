import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Hero Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countryCode",
      title: "Country Code",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientAvatar",
      title: "Client Avatar",
      type: "image",
    }),
  ],
});
