"use client";

import { useState } from "react";
import { CircleAlert, RotateCwIcon, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "./ui/skeleton";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";

const galleryImages = [
  {
    id: 1,
    src: "/modern-office-glass.png",
    alt: "Modern Office Building",
    category: "Commercial",
    size: "large",
  },
  {
    id: 2,
    src: "/luxury-home-exterior-with-pool.jpg",
    alt: "Luxury Residence",
    category: "Residential",
    size: "small",
  },
  {
    id: 3,
    src: "/industrial-warehouse-interior.jpg",
    alt: "Industrial Warehouse",
    category: "Industrial",
    size: "small",
  },
  {
    id: 4,
    src: "/construction-site-aerial.png",
    alt: "Construction Site",
    category: "In Progress",
    size: "medium",
  },
  {
    id: 5,
    src: "/shopping-mall-interior-modern.jpg",
    alt: "Shopping Mall",
    category: "Commercial",
    size: "medium",
  },
  {
    id: 6,
    src: "/high-rise-apartment-building-sunset.jpg",
    alt: "High-Rise Apartments",
    category: "Residential",
    size: "tall",
  },
  {
    id: 7,
    src: "/hospital-building-exterior-modern.jpg",
    alt: "Healthcare Facility",
    category: "Commercial",
    size: "tall",
  },
  {
    id: 8,
    src: "/factory-building-industrial-exterior.jpg",
    alt: "Manufacturing Plant",
    category: "Industrial",
    size: "medium",
  },
];

// const imageGridMap = {tall: ""}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<Record<
    string,
    any
  > | null>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolio-gallery"],
    queryFn: async () => {
      try {
        const res = await client.fetch(`*[_type=="portfolioGallery"]`);
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <section id="portfolio-gallery" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-[0.2rem] [word-spacing:6px] border shadow-[0px_0px_4px_rgba(0,0,0,0.4)] -2 px-4 py-2 rounded-lg border-accent bg-accent/10">
            Our Portfolio
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Projects That Define Excellence
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our diverse portfolio of completed projects, showcasing our
            expertise across residential, commercial, and industrial
            construction.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-4 flex flex-col lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {error && (
            <div className="flex justify-center items-center py-8 col-span-9">
              <div className="flex flex-col items-center text-center border p-6 rounded-xl gap-3">
                <CircleAlert />
                <span>An Error Occured</span>
                <Button onClick={() => refetch()} className="bg-accent">
                  Retry <RotateCwIcon />
                </Button>
              </div>
            </div>
          )}
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="col-span2 bg-slate-200 rounded-lg"
              />
            ))}
          {data &&
            data.map((image: any) => (
              <div
                key={image._id}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "relative group cursor-pointer max-h-[200px] col-span-2 md:row-span-2 sm:max-h-full rounded-lg overflow-hidden",
                  image.size === "large" && "col-span-2 row-span-2",
                  image.size === "tall" && "row-span-2 col-span-2",
                  image.size === "medium" && "col-span-2 row-span-2",
                )}
              >
                <img
                  src={
                    image.image ? urlFor(image.image).url() : "/placeholder.svg"
                  }
                  alt={image.image.altText}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <ZoomIn className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                    <p className="text-primary-foreground font-semibold">
                      {image.image.altText}
                    </p>
                    <span className="text-primary-foreground/70 text-sm">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-primary/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-primary-foreground hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                selectedImage.image
                  ? urlFor(selectedImage.image).url()
                  : "/placeholder.svg"
              }
              alt={selectedImage.image.altText}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-primary-foreground text-xl font-semibold">
                {selectedImage.image.altText}
              </p>
              <span className="text-accent">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
