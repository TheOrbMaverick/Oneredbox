import { defineField, defineType } from "sanity";

export const sectionTestimonial = defineType({
  name: "sectionTestimonials",
  title: "Section Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "image", title: "User Avatar", type: "image" }),
    defineField({
      name: "quote",
      title: "User Testimony",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "project",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
