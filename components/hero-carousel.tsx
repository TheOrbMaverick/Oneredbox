"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Controller,
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { firstHeroVideoUrl } from "@/constants/info";

export interface TestimonialType {
  id: number;
  name: string;
  role?: string;
  quote: string;
  project: string;
  videoUrl: string;
  countryCode: string;
}

export function HeroCarousel() {
  // const [controlledSwiper, setControlledSwiper] = useState<any>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const videosRef = useRef<HTMLVideoElement[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero-testimonials"],
    queryFn: async function () {
      try {
        const data = await client.fetch(
          `*[_type == "testimonial"]{...,"video":video.asset->}`,
        );
        return data;
      } catch (error) {
        // console.error("An Error Occured while fetching hero testimonials");
        return Promise.reject(new Error("Hero Testimonial Error"));
      }
    },
    retry: false,
  });
  useEffect(() => {
    if (videosRef.current[0]) {
      videosRef.current[0].play();
    }
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <div className="relative">
        <div className="flex items-center  gap-2 absolute bottom-18 sm:bottom-24 right-10 z-4">
          <Button
            variant={"outline"}
            className="p-3 bg-transparent relative z-3 hover:text-white/80 hero-carousel-prev rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              if (swiperRef.current?.swiper.activeIndex === data.length) {
                swiperRef.current?.swiper.slideTo(0);
              }
            }}
            className="p-3 bg-transparent relative z-3 hover:text-white/80 hero-carousel-next rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <Swiper
        onTouchStart={() => swiperRef.current?.swiper.autoplay.pause()}
        onTouchEnd={() => swiperRef.current?.swiper.autoplay.resume()}
          ref={swiperRef}
          onSlideChange={(swiper) => {
            // Pause and reset all videos
            videosRef.current.forEach((videoRef, i) => {
              if (videoRef && i !== swiper.activeIndex) {
                videoRef.pause();
                videoRef.currentTime = 0;
              }
            });

            // Play the current active slide's video
            const currentVideo = videosRef.current[swiper.activeIndex];
            if (currentVideo) {
              currentVideo.play();
            }
          }}
          className="h-dvh! relative [&_.swiper-pagination-bullet]:bg-slate-300! [&_.swiper-pagination-bullet-active]:w-4! [&_.swiper-pagination-bullet-active]:rounded-full!"
          modules={[Navigation, EffectFade, Controller, Pagination, Autoplay]}
          pagination={{ enabled: true }}
          // controller={{ control: controlledSwiper }}
          // effect="fade"
          navigation={{
            enabled: true,
            nextEl: ".hero-carousel-next",
            prevEl: ".hero-carousel-prev",
          }}
          autoplay={{
            delay: 5000,
            // disableOnInteraction: true,
            // pauseOnMouseEnter: true,

          }}
        >
          <SwiperSlide style={{ height: "100dvh" }} className=" h-dvh relative">
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 h-full! w-full",
              )}
            >
              <video
                onCanPlay={() => {
                  if (0 === swiperRef.current?.swiper.activeIndex) {
                    videosRef.current[0].play();
                  }
                }}
                onEnded={() => {
                  if (swiperRef.current?.swiper.isEnd) {
                    swiperRef.current.swiper.slideTo(0);
                  } else {
                    swiperRef.current?.swiper.slideNext();
                  }
                }}
                ref={(el) => {
                  videosRef.current[0] = el!;
                }}
                muted
                playsInline
                className="absolute inset-0 w-full h-dvh! object-cover"
                src={firstHeroVideoUrl}
              />
              <div className="absolute h-dvh w-full bg-linear-to-r from-primary/50 via-primary/40 to-primary/50" />
            </div>

            <div className="absolute bottom-44 flex items-end -translate-y1/2 left-4 right-4 lg:left-10 z-2 ">
              <div className="">
                <div className="lg:max-w-3xl">
                  {/* Project Tag */}
                  <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    We Build
                  </div>

                  {/* Quote */}
                  <div className="relative mb8">
                    <Quote className="absolute -top-4 left-0 h-12 w-12 text-red-500/30 z-1" />
                    <p className="text-4xl sm:text-6xl   font-bold text-primary-foreground leading-tight lg:pl-8 z-2 relative">
                      Build Your Dream Property in Nigeria—From Anywhere in the
                      World
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 lg:pl-8">
                    <div className="w-12 h-12 overflow-hidden relative flex items-center justify-center text-accent-foreground font-bold text-lg">
                      <Image
                        src={`https://flagcdn.com/ng.svg`}
                        height={"1000"}
                        width={"1000"}
                        // alt={testimonial.countryCode}
                        alt=""
                        className="rounded-xs"
                      />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-semibold text-lg">
                        OneredBox
                      </p>
                      {/* <p className="text-primary-foreground/70 text-sm">
                        testimonial.role
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {data &&
            data.map((testimonial: any, index: any) => (
              <SwiperSlide
                style={{ height: "100%" }}
                className=" h-dvh relative"
              >
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000 h-full w-full",
                  )}
                >
                  <video
                    onCanPlay={() => {
                      if (index + 1 === swiperRef.current?.swiper.activeIndex) {
                        videosRef.current[index + 1].play();
                      }
                    }}
                    onEnded={() => {
                      if (swiperRef.current?.swiper.isEnd) {
                        swiperRef.current.swiper.slideTo(0);
                      } else {
                        swiperRef.current?.swiper.slideNext();
                      }
                    }}
                    ref={(el) => {
                      videosRef.current[index + 1] = el!;
                    }}
                    // autoPlay
                    muted
                    // loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src={testimonial.video.url}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary/50 via-primary/40 to-primary/50" />
                </div>

                {/*  */}
                <div className="absolute bottom-20_ lg:bottom-10_ top-1/2 -translate-y-1/4 left-4 right-4 lg:left-10 z-2 ">
                  <div key={index} className="h-auto! items-end flex!">
                    <div className="lg:max-w-3xl self-end">
                      {/* Project Tag */}
                      <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {testimonial.project}
                      </div>

                      {/* Quote */}
                      <div className="relative mb-8">
                        <Quote className="absolute -top-4 left-4 h-12 w-12 text-red-500/30" />
                        <p className="text2xl md:text-2xl text-white sm:leading-[150%] lg:pl-8">
                          {testimonial.quote}
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4 lg:pl-8 mb-12">
                        <div className="w-12 h-12 overflow-hidden relative bgaccent flex items-center justify-center text-accent-foreground font-bold text-lg">
                          {/* {currentTestimonial.name.charAt(0)} */}
                          <Image
                            src={`https://flagcdn.com/${testimonial.countryCode.toLowerCase()}.svg`}
                            height={"1000"}
                            width={"1000"}
                            alt={testimonial.countryCode}
                            className="rounded-xs"
                          />
                        </div>
                        <div>
                          <p className="text-primary-foreground font-semibold text-lg">
                            {testimonial.name}
                          </p>
                          <p className="text-primary-foreground/70 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="absolute left-4 bottom-18 smbottom-24 sm:bottom-24 sm:left-18 z-10">
          <div className="flex gap-3 flex-col sm:flex-row">
            <Link href={"/book-service"}>
              <Button
                size="lg"
                className="bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                Start Your Project
              </Button>
            </Link>
            <Link
              href={"/demo-dashboard"}
            >
              <Button
                size="lg"
                variant="outline"
                className="text-white  hover:text-white hover:bg-red-500/30 bg-white/5 backdrop-blur-xs border-2 rounded-lg border-red-500 font-semibold cursor-pointer"
              >
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
