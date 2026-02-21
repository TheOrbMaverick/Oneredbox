import { defineField, defineType } from "sanity";

export const projectManager = defineType({
  name: "projectManager",
  title: "Project Manager",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name", validation: (rule) => rule.required() }),
    defineField({ name: "phone", type: "string", title: "Phone", validation: (rule) => rule.required() }),
    defineField({ name: "email", type: "string", title: "Email", validation: (rule) => rule.required() }),
    defineField({ name: "image", type: "image", title: "Image", validation: (rule) => rule.required() }),
  ],
});
