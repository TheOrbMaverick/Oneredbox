"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Compass,
  HardHat,
  Check,
  Shield,
  Globe,
  Users,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { bookServices, bookServicesTrustPoints } from "@/constants/contents";

export default function BookServicePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* <InnerPageHeader /> */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-500 text-sm font-medium rounded-full mb-6">
              Trusted by Nigerians in the Diaspora
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-balance">
              Build Your Dream Property in Nigeria—From Anywhere in the World
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl">
              Oneredbox provides trusted construction and real estate services
              for Nigerians abroad. Own property in Nigeria without the stress,
              scams, or uncertainty. We handle everything on the ground while
              you stay informed every step of the way.
            </p>
            <div className="flex_ grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start flex-wrap gap-6">
              {bookServicesTrustPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-3">
                  <div className="size-10 min-w-10 min-h-10 rounded-full mt-1 bg-red-600/20 flex items-center justify-center">
                    <point.icon className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{point.title}</p>
                    <p className="text-sm text-zinc-400">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Selection */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Select a Service
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the service that matches your needs. You can combine
              multiple services for a complete solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {bookServices.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg py-5 rounded-2xl border-none`}
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-red-500/10`}
                  >
                    <service.icon className={`h-7 w-7 text-red-500`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link href={service.href}>
                      <Button className="w-full bg-transparent hover:bg-red-500/10 hovertext-white text-red-500 border-[1.5px] border-red-500 py-6 rounded-xl font-semibold">
                        Book a Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Form */}
        </div>
      </section>
      <Footer />
    </main>
  );
}
