import { defineField, defineType } from "sanity";

export const portfolioGalleryType = defineType({
  name: "portfolioGallery",
  title: "Portfolio Gallery",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "altText",
          title: "Alternate Text",
          type: "string",
        }),
      ],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    // defineField({ name: "size", title: "Category", type: "string" }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Tall", value: "tall" },
          { title: "Large", value: "large" },
        ],
      },
    }),
  ],
});
