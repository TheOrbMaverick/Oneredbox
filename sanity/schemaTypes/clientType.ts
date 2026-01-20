import { defineType } from "sanity";

export const ClientType = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    { name: "clientId", type: "string" },
    {
      name: "clientName",
      type: "string",
      validation: (rule) => rule.required(),
    },
    { name: "email", type: "email" },
    { name: "phone", type: "string" },
    { name: "location", type: "string" },
    { name: "passcodeHash", type: "text" },
    {
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "clientProject" }] }],
    },
  ],
});
