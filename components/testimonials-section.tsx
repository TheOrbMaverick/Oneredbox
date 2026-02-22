"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { urlFor } from "@/sanity/lib/image";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Don't just take our word for it. Hear from the clients who have
            trusted us with their most important projects.
          </p>
        </div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["section-testimonials"],
    queryFn: async () => {
      try {
        const data = await client.fetch(
          `*[_type == "testimonial"]{name,role,project,quote,clientAvatar}`,
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-primary-foreground/10 animate-pulse">
          <div className="h-8 bg-primary-foreground/10 rounded w-full md:w-3/4 mb-4"></div>
          <div className="h-8 bg-primary-foreground/10 rounded w-full md:w-5/6 mb-8"></div>
          <div className="h-8 bg-primary-foreground/10 rounded w-2/3 mb-12"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border-2 border-primary-foreground/5"></div>
            <div className="space-y-3">
              <div className="h-5 bg-primary-foreground/10 rounded w-32"></div>
              <div className="h-4 bg-primary-foreground/10 rounded w-48"></div>
              <div className="h-4 bg-primary-foreground/10 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="">
      <Swiper
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        modules={[Navigation]}
        navigation={{
          enabled: true,
          nextEl: ".section-testimonials-next",
          prevEl: ".section-testimonials-prev",
        }}
      >
        {data && data.map((testimonial: Record<string, any>) => (
          <SwiperSlide>
            <div key={testimonial.id} className="max-w-4xl mx-auto">
              <div className="relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-primary-foreground/10">
                <Quote className="absolute top-8 left-8 h-12 w-12 text-red-500/30" />

                <div className="relative">
                  <blockquote className="textxl lg:text-2xl leading-relaxed mb-8">
                    &Prime;{testimonial.quote}&Prime;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <img
                      src={
                        testimonial.clientAvatar
                          ? urlFor(testimonial?.clientAvatar).url()
                          : "/person.png"
                      }
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-primary-foreground/70 text-sm">
                        {testimonial?.role}, {testimonial?.company}
                      </p>
                      <p className="text-red-500 text-sm mt-1">
                        {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-1.5">
            {data&& data.map((_: any, index: number) => (
              <span
                key={index}
                className={cn(
                  "size-2 bg-white/50 rounded-full block transition-all duration-500",
                  activeIndex === index && "w-4 bg-red-500",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button className="section-testimonials-prev p-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="section-testimonials-next p-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Swiper>
    </div>
  );
}
