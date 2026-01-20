"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Camera,
  Video,
  Play,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectMedia } from "@/lib/client-projects-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface ProjectMediaGalleryProps {
  media: ProjectMedia[];
  projectTitle: string;
}

export function ProjectMediaGallery({ media }: ProjectMediaGalleryProps) {
  const [photosThumbsSwiper, setPhotoThumbsSwiper] = useState<any>(null);
  const [expandedPhotosThumbsSwiper, setExpandedPhotoThumbsSwiper] =
    useState<any>(null);
  const photos = media.filter((m) => m.type === "photo");
  const videos = media.filter((m) => m.type === "video");
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setExpanded(false);
              setExpandedPhotoThumbsSwiper(null);
            }}
            className="w-full h-dvh bg-black/80 z-10 fixed top-0 left-0 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" relative w-full lg:max-w-[800px] aspect-video"
            >
              <button
                onClick={() => {
                  setExpanded(false);
                  setExpandedPhotoThumbsSwiper(null);
                }}
                className="absolute top-1 right-1 z-2 bg-white h-10 w-10 flex items-center justify-center rounded-full"
              >
                <X size={20} />
              </button>
              <Swiper
                className="relative aspect-16/10"
                navigation={{
                  enabled: true,
                  nextEl: ".media-photos-next",
                  prevEl: ".media-photos-prev",
                }}
                thumbs={{ swiper: expandedPhotosThumbsSwiper }}
                modules={[Navigation, FreeMode, Thumbs]}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 sm:left-4 media-photos-prev top-1/2 z-2 -translate-y-1/2 lg:size-12 size-7 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 sm:right-4 media-photos-next top-1/2 z-2 -translate-y-1/2 lg:size-12 size-7 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                {photos.map((photo) => (
                  <SwiperSlide
                    // style={{ height: "100%" }}
                    className="size-full relative  rounded-2xl overflow-hidden"
                  >
                    <div className="absolute z-10 size-full bg-linear-to-b from-black/0 to-black/50 top-0 left-0" />
                    <Image
                      src={photo.image.url || "/placeholder.svg"}
                      alt={""}
                      fill
                      className="object-cover size-full"
                      // priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setExpandedPhotoThumbsSwiper}
                spaceBetween={12}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper py-5"
                style={{ paddingBlock: 20, paddingInline: 12 }}
              >
                {photos.map((photo) => (
                  <SwiperSlide className="w-auto! [&.swiper-slide-thumb-active]:opacity-100 opacity-60 border-2 [&.swiper-slide-thumb-active]:border-accent/80 [&.swiper-slide-thumb-active]:shadow-[8px_8px_8px_rgba(0,0,0,0.2)] transition-all duration-500 lg:rounded-xl rounded-lg overflow-hidden">
                    <img
                      src={photo.image.url}
                      alt=""
                      className="w-20 lg:w-[150px] h-10 lg:h-20"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Tabs
        onValueChange={(value) => {
          if (value === "videos") {
            setPhotoThumbsSwiper(null);
          }
        }}
        defaultValue="photos"
        className=""
      >
        <TabsList className="gap-2 bg-transparent  w-auto h-auto">
          <TabsTrigger
            value="photos"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 font-semibold transition-all bg-zinc-100 text-zinc-600 hover:bg-zinc-200 data-[state=active]:bg-accent/10 data-[state=active]:border-accent/50 data-[state=active]:text-accent"
          >
            <Camera className="h-4 w-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all bg-zinc-100 text-zinc-600 hover:bg-zinc-200 data-[state=active]:bg-accent/10 data-[state=active]:border-accent/50 border-2 data-[state=active]:text-accent"
          >
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className=" relative">
          {photos.length <= 0 ? (
            <div className="border rounded-3xl h-[250px] md:h-[400px] flex items-center justify-center">
              <div className="flex items-center flex-col gap-4">
                <FaCamera size={40} className="text-gray-500" />

                <div className="text-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    No Image Media
                  </p>
                  <p className="text-lg">
                    No photo content has been added to this project yet
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className=" relative">
              <button
                onClick={() => setExpanded(true)}
                className="absolute top-1 right-1 z-2 bg-white h-10 w-10 flex items-center justify-center rounded-full"
              >
                <Expand size={20} />
              </button>
              <Swiper
                className="relative h-[250px]! md:h-[400px]!"
                navigation={{
                  enabled: true,
                  nextEl: ".media-photos-next",
                  prevEl: ".media-photos-prev",
                }}
                thumbs={{ swiper: photosThumbsSwiper }}
                modules={[Navigation, FreeMode, Thumbs]}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 media-photos-prev top-1/2 z-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 media-photos-next top-1/2 z-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                {photos.map((photo) => (
                  <SwiperSlide
                    // style={{ height: "100%" }}
                    className="size-full relative  rounded-2xl overflow-hidden"
                  >
                    <div className="absolute z-10 size-full bg-linear-to-b from-black/0 to-black/50 top-0 left-0" />
                    <Image
                      src={photo.image.url || "/placeholder.svg"}
                      alt={""}
                      fill
                      className="object-cover size-full"
                      // priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setPhotoThumbsSwiper}
                spaceBetween={12}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper py-5"
                style={{ paddingBlock: 20, paddingInline: 12 }}
              >
                {photos.map((photo) => (
                  <SwiperSlide className="w-auto! [&.swiper-slide-thumb-active]:opacity-100 opacity-60 border-2 [&.swiper-slide-thumb-active]:border-accent/80 [&.swiper-slide-thumb-active]:shadow-[8px_8px_8px_rgba(0,0,0,0.2)] transition-all duration-500 lg:rounded-xl rounded-lg overflow-hidden">
                    <img
                      src={photo.image.url}
                      alt=""
                      className="w-20 lg:w-[150px] h-10 lg:h-20"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </TabsContent>
        <TabsContent value="videos">
          {videos.length <= 0 ? (
            <div className="border rounded-3xl h-[250px] md:h-[400px] flex items-center justify-center">
              <div className="flex items-center flex-col gap-4">
                <BsFillCameraReelsFill size={40} className="text-gray-500" />

                <div className="text-center">
                  <p className="text-xl md:text-2xl font-semibold">
                    No Video Media
                  </p>
                  <p className="text-lg">
                    No video content has been added to this project yet
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Swiper
              className="relative h-[250px]! md:h-[400px]!"
              modules={[Navigation]}
              navigation={{
                enabled: true,
                nextEl: ".media-videos-next",
                prevEl: ".media-videos-prev",
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 media-videos-prev top-1/2 z-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 media-videos-next top-1/2 z-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {videos.map((video) => (
                <SwiperSlide className="size-full relative  rounded-2xl overflow-hidden">
                  {/* <div className="absolute z-10 size-full bg-linear-to-b from-black/0 to-black/50 top-0 left-0" /> */}
                  <video
                    src={video.video.url}
                    // poster={vid.thumbnail}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
