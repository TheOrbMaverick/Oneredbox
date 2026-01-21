import { defineField, defineType } from "sanity";

export const portfolioGalleryType = defineType({
  name: "portfolioGallery",
  title: "Portfolio Gallery",
  type: "document",
  fields: [
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one image is required."),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "img",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "img",
            },
          },
        },
      ],
    }),
  ],
});
