"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HiColorSwatch } from "react-icons/hi";

import {
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  Car,
  Heart,
  Search,
  Filter,
  ArrowRight,
  Phone,
  CircleAlert,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Property } from "@/lib/properties-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForSalePage() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["properties-sale"],
    queryFn: async () => {
      try {
        const res = await client.fetch(
          `*[_type=="property"]{_id,location,title,price,image,baths,beds,parking,sqft,feature,type}`,
        );
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Properties For Sale
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Browse our curated selection of verified properties across
              Nigeria. Each listing is thoroughly vetted by our team to ensure
              legitimacy and value.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="overflow-hidden group hover:shadow-lg not-first:hidden sm:not-first:flex transition-shadow duration-300 p-2 rounded-2xl border-none"
                >
                  <Skeleton className="h-56 bg-slate-200 rounded-xl" />
                  <CardContent className=" px-2 py-0">
                    <Skeleton className="bg-slate-200 h-5 w-5/12 rounded-sm mb-2" />
                    <Skeleton className="h-6 w-10/12 mb-4 bg-slate-200" />
                    <Skeleton className="h-8 w-40 mb-6 rounded-lg bg-slate-200" />

                    <Skeleton className="h-10 bg-slate-200" />
                  </CardContent>
                </Card>
              ))}
            {data ? (
              data.length > 0 ? (
                data.map((property: Property & Record<string, any>) => (
                  <Card
                    key={property._id}
                    className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-2 rounded-2xl border-none"
                  >
                    <div className="relative h-56 overflow-hidden rounded-xl">
                      <Image
                        src={
                          property.image
                            ? urlFor(property.image).url()
                            : "/placeholder.svg"
                        }
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {property.featured && (
                          <Badge className="bg-accent text-white">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="secondary">{property.type}</Badge>
                      </div>
                    </div>
                    <CardContent className="py-0 px-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{property.location}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hovertext-accent transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-2xl font-bold text-accent mb-4">
                        {property.price}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {property.beds && (
                          <div className="flex items-center gap-1">
                            <BedDouble className="h-4 w-4" />
                            <span>{property.beds} Beds</span>
                          </div>
                        )}
                        {property.baths && (
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{property.baths} Baths</span>
                          </div>
                        )}
                        {property.parking && (
                          <div className="flex items-center gap-1">
                            <Car className="h-4 w-4" />
                            <span>{property.parking}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Maximize className="h-4 w-4" />
                          <span>{property.sqft}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className=" px-0 pt-0">
                      <Button
                        onClick={() => router.push(`/for-sale/${property.id}`)}
                        className="w-full bg-zinc-900 border-2 hover:text-zinc-900 font-semibold transition-all duration-300 text-base md:text-lg border-zinc-900 hover:bg-transparent text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 py-6 rounded-xl"
                        asChild
                      >
                        <Link href={`/for-sale/${property._id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="border rounded-2xl px-4 text-center py-12 shadow md:col-span-2 lg:col-span-3 flex justify-center items-center min-h-[200px]">
                  <div className="flex items-center flex-col justify-center">
                    <HiColorSwatch className="size-10 md:size-20 text-slate-600" />

                    <p className="text-2xl mt-3 mb-2 font-semibold">
                      No Property
                    </p>
                    <p>
                      There are no properties listed for sale at this current
                      time
                    </p>
                  </div>
                </div>
              )
            ) : (
              error && (
                <section className=" px-4 lg:col-span-3 col-span-2 flex items-center justify-center min-h-40 border rounded-2xl">
                  <div className="flex items-center text-center flex-col gap-4">
                    <div className="">
                      <p>An Error Occured</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button onClick={() => refetch()}>
                        Retry <CircleAlert />
                      </Button>
                    </div>
                  </div>
                </section>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
