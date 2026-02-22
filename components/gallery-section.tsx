"use client";

import { useState } from "react";
import { CircleAlert, RotateCwIcon, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "./ui/skeleton";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";

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
  const [selectedSection, setSelectedSection] = useState<Record<
    string,
    any
  > | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolio-gallery"],
    queryFn: async () => {
      try {
        const res = await client.fetch(
          `*[_type=="portfolioGallery"]{
            _id,
            category,
            size,
            images[]{
              title,
              "image": img,
              "videoUrl": video.asset->url,
              "isVideo": defined(video)
            }
          }`,
        );
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
          <span className="text-red-500 font-semibold text-sm uppercase tracking-[0.2rem] [word-spacing:6px] border shadow-[0px_0px_12px_rgba(0,0,0,0.1)] -2 px-4 py-2 rounded-lg border-red-500 bg-red-500/10">
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
            <>
            {/* <div className="flex justify-center items-center py-8 col-span-9">
              <div className="flex flex-col items-center text-center border p-6 rounded-xl gap-3">
                <CircleAlert />
                <span className="text-red-500">An Error Occured</span>
                <Button onClick={() => refetch()} className="bg-red-500">
                  Retry <RotateCwIcon />
                </Button>
              </div>
            </div> */}
             <div className="max-w-4xl mx-auto">
        <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-primary-foreground/10 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
            <svg xmlns="http://www.w3.org/2007/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xl font-semibold mb-2 text-primary-foreground">Unable to load testimonials</p>
          <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">We couldn't retrieve the client testimonials at this moment. Please check your connection or try refreshing the page.</p>
          <button 
            onClick={() =>refetch()} 
            className="px-6 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground rounded-full transition-colors border border-primary-foreground/20"
          >
            Try Again
          </button>
        </div>
      </div>
            </>
          )}
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="col-span2 bg-slate-200 rounded-lg"
              />
            ))}
          {data &&
            data.map((section: any) => {
              // Use the first image as the cover (first item is always an image per validation)
              const coverImage = section.images?.[0]?.image;
              if (!coverImage) return null;

              // Count images and videos
              const imageCount = section.images?.filter((item: any) => !item.isVideo).length || 0;
              const videoCount = section.images?.filter((item: any) => item.isVideo).length || 0;

              return (
                <div
                  key={section._id}
                  onClick={() => setSelectedSection(section)}
                  className={cn(
                    "relative group cursor-pointer max-h-[200px] col-span-2 md:row-span-2 sm:max-h-full rounded-lg overflow-hidden",
                  )}
                >
                  <img
                    src={urlFor(coverImage).url()}
                    alt={section.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <ZoomIn className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                      <p className="text-primary-foreground font-semibold">
                        {section.category}
                      </p>
                      <span className="text-primary-foreground/70 text-sm">
                        {imageCount} Photo{imageCount !== 1 ? 's' : ''}
                        {videoCount > 0 && ` • ${videoCount} Video${videoCount !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Lightbox / Carousel Modal */}
      {selectedSection && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedSection(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50"
            onClick={() => setSelectedSection(null)}
          >
            <X className="h-8 w-8" />
          </button>

          <div
            className="w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-full rounded-lg"
              spaceBetween={30}
              slidesPerView={1}
            >
              {selectedSection.images?.map((mediaItem: any, idx: number) => (
                <SwiperSlide
                  key={idx}
                  className="flex items-center justify-center bg-black"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {mediaItem.isVideo ? (
                      <video
                        src={mediaItem.videoUrl}
                        controls
                        className="max-w-full max-h-full object-contain"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={urlFor(mediaItem.image).url()}
                        alt={mediaItem.title || selectedSection.category}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                    {mediaItem.title && (
                      <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2">
                        <p className="text-lg font-medium">{mediaItem.title}</p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
}

