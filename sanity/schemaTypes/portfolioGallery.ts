import { defineField, defineType } from "sanity";

export const portfolioGalleryType = defineType({
  name: "portfolioGallery",
  title: "Portfolio Gallery",
  type: "document",
  fields: [
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "images",
      title: "Media Gallery (Images & Videos)",
      type: "array",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one media item is required.")
          .custom((items) => {
            if (!items || items.length === 0) {
              return "At least one media item is required.";
            }
            // Check if first item is an image
            const firstItem = items[0] as any;
            if (firstItem && firstItem.video) {
              return "The first item must be an image, not a video.";
            }
            return true;
          }),
      of: [
        {
          type: "object",
          name: "mediaItem",
          title: "Media Item",
          fields: [
            defineField({
              name: "img",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              hidden: ({ parent }) => !!parent?.video,
            }),
            defineField({
              name: "video",
              title: "Video",
              type: "file",
              options: {
                accept: "video/*",
              },
              hidden: ({ parent }) => !!parent?.img,
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
              video: "video",
            },
            prepare({ title, media, video }) {
              return {
                title: title || (video ? "Video" : "Image"),
                media: media,
                subtitle: video ? "Video file" : "Image",
              };
            },
          },
        },
      ],
    }),
  ],
});
