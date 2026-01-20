// sanityImageUrl.ts
import { client } from "@/sanity/lib/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
