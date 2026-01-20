"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { urlFor } from "@/sanity/lib/image";

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
}

export function PropertyImageCarousel({
  images,
  title,
}: PropertyImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<SwiperRef>(null);
  const [photosThumbsSwiper, setPhotoThumbsSwiper] = useState<any>(null);

  return (
    <>
      {/* Main Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-16/10 lg:aspect-16/8 overflow-hidden rounded-xl bg-zinc-100">
          <Swiper
            ref={carouselRef}
            className="border4 h-full border-red-500"
            modules={[Navigation, FreeMode, Thumbs]}
            thumbs={{ swiper: photosThumbsSwiper }}
            navigation={{
              enabled: true,
              prevEl: ".property-image-carousel-prev",
              nextEl: ".property-image-carousel-next",
            }}
          >
            {images.map((image) => (
              <SwiperSlide>
                <Image
                  src={image ? urlFor(image).url() : "/placeholder.svg"}
                  fill
                  alt={`${title} - Image ${currentIndex + 1}`}
                  className="object-cover"
                />
                <div className="absolute inset-0 z-2 bg-linear-to-b from-black/40 via-transparent to-transparent" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-2 property-image-carousel-prev left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-2 property-image-carousel-next right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-4">
          <Swiper
            onSwiper={setPhotoThumbsSwiper}
            spaceBetween={12}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper py-5"
            style={{ paddingInline: 12, paddingBlock: 12 }}
          >
            {images.map((image) => (
              <SwiperSlide className="w-auto! [&.swiper-slide-thumb-active]:opacity-100 opacity-60 border-2 [&.swiper-slide-thumb-active]:border-accent/80 [&.swiper-slide-thumb-active]:shadow-[6px_6px_8px_rgba(0,0,0,0.2)] transition-all duration-500 lg:rounded-none roundedlg overflow-hidden relative p-0!">
                <Image
                  src={image ? urlFor(image).url() : "/placeholder.svg"}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  className="objectcover border-4 w-28 h-16 roundedxl"
                  width={1000}
                  height={1000}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
