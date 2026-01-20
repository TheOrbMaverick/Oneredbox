"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize,
  Calendar,
  Hash,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Building2,
  CircleAlert,
} from "lucide-react";
import { PropertyImageCarousel } from "@/components/property-image-carousel";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";

// export async function generateStaticParams() {
//   return properties.map((property) => ({
//     id: property.id.toString(),
//   }));
// }

export default function PropertyDetailsPage() {
  // const { id } = await params;
  // const property = getPropertyById(Number.parseInt(id, 10));
  const { id } = useParams();
  console.log("page Id", id);
  const {
    data: property,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      try {
        const res = await client.fetch(
          `*[_type=="property" && _id=="${id}"][0]`,
          {
            id,
          }
        );

        if (!res) throw new Error("Not Found", { cause: "Invalid Id" });
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  if (isLoading)
    return (
      <main className="min-h-screen bg-background">
        <section className="pt-24 lg:pt-32 px-4 lg:px-16 pb-16">
          <Skeleton className="h-[250px] lg:h-[500px] rounded-2xl bg-slate-200 mb-8" />
          <div className="flex gap-3 mb-12">
            <Skeleton className="w-36 h-8 bg-slate-200 rounded-lg" />
            <Skeleton className="w-36 h-8 bg-slate-200 rounded-lg" />
            <Skeleton className="w-36 h-8 bg-slate-200 rounded-lg" />
          </div>
          <Skeleton className="h-12 bg-slate-200 w-1/2" />
        </section>
      </main>
    );

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <section className="pt-24 lg:pt-32 px-4 lg:px-16 pb-16 flex items-center justify-center h-dvh border rounded-2xl">
          <div className="flex items-center text-center flex-col gap-4">
            <div className="">
              <p>An Error Occured</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant={"outline"} asChild>
                <Link href={"/for-sale"}>
                  <ArrowLeft /> Back to Projects Listing
                </Link>
              </Button>

              <Button onClick={() => refetch()}>
                Retry <CircleAlert />
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // if (!property) {
  //   notFound();
  // }

  if (property)
    return (
      <main className="min-h-screen bg-background">
        {/* <InnerPageHeader /> */}

        {/* Breadcrumb & Actions */}
        <section className="pt-24 lg:pt-28 pb-4 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button variant={"outline"} asChild>
                <Link
                  href="/for-sale"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Properties
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Carousel */}
        {property.images && (
          <section className="py-6 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 lg:px-8">
              <PropertyImageCarousel
                images={property.images}
                title={property.title}
              />
            </div>
          </section>
        )}

        {/* Property Details */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className="bg-red-600 text-white">
                      {property.status}
                    </Badge>
                    <Badge variant="secondary">{property.type}</Badge>
                    {property.featured && (
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-600"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span className="text-lg">{property.address}</span>
                  </div>
                </div>

                {/* Price & Quick Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl lg:text-4xl font-bold text-red-600">
                      {property.price}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    {property.beds && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <BedDouble className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{property.beds}</p>
                          <p className="text-xs text-muted-foreground">
                            Bedrooms
                          </p>
                        </div>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <Bath className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{property.baths}</p>
                          <p className="text-xs text-muted-foreground">
                            Bathrooms
                          </p>
                        </div>
                      </div>
                    )}
                    {property.parking && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <Car className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{property.parking}</p>
                          <p className="text-xs text-muted-foreground">
                            Parking
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <Maximize className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{property.sqft}</p>
                        <p className="text-xs text-muted-foreground">Size</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Property Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((feature: any, index: any) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Amenities */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Amenities & Nearby
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.amenities.map((amenity: any, index: any) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Property Details */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Property Details
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Property ID
                        </p>
                        <p className="font-medium">{property.propertyId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Property Type
                        </p>
                        <p className="font-medium">{property.type}</p>
                      </div>
                    </div>
                    {property.yearBuilt && (
                      <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Year Built
                          </p>
                          <p className="font-medium">{property.yearBuilt}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <Maximize className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Land Size
                        </p>
                        <p className="font-medium">{property.sqft}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Location
                        </p>
                        <p className="font-medium">{property.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Agent Card */}
                <Card className="sticky top24">
                  <CardContent className="p6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                        <span className="text-xl font-bold text-zinc-500">
                          {property.agent.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{property.agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Property Agent
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb6">
                      <a
                        href={`tel:${property.agent.phone}`}
                        className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-red-600" />
                        <span>{property.agent.phone}</span>
                      </a>
                      <a
                        href={`mailto:${property.agent.email}`}
                        className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-red-600" />
                        <span>{property.agent.email}</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badge */}
                <Card className="bg-zinc-900 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-8 w-8 text-red-500" />
                      <h3 className="font-semibold text-lg">
                        Verified Property
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      This property has been verified by Oneredbox. All
                      documents have been checked and the property is
                      legitimate.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Title documents verified</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Physical inspection done</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Seller identity confirmed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Diaspora CTA */}
                <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      Based Outside Nigeria?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We specialize in helping Nigerians in the diaspora acquire
                      properties safely and transparently.
                    </p>
                    <Button
                      asChild
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Link href="/book-service">Schedule Consultation</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
