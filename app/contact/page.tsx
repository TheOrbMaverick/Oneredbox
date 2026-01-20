"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  MessageSquare,
  Globe,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import { Footer } from "@/components/footer";

const offices = [
  {
    country: "United States",
    address: "123 Business Ave, Suite 400",
    city: "Houston, TX 77001",
    phone: "+1 (555) 123-4567",
    email: "us@oneredbox.com",
    hours: "Mon-Fri: 9AM - 6PM CST",
  },
  {
    country: "Nigeria",
    address: "15 Victoria Island",
    city: "Lagos, Nigeria",
    phone: "+234 (1) 234-5678",
    email: "ng@oneredbox.com",
    hours: "Mon-Fri: 9AM - 5PM WAT",
  },
];

const contactReasons = [
  "General Inquiry",
  "Land Acquisition",
  "Building Design",
  "Construction Supervision",
  "Partnership Opportunity",
  "Media/Press",
  "Other",
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* <InnerPageHeader /> */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Have questions about our services? Ready to start your project?
              Our team is here to help. Reach out through any of the channels
              below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-background min-h-dvh border4 text-white">
        <div className="max-w-[1200px] mx-auto py16 pt-8 pt24 lg:pt32 px-4">
          <div className="">
            <div className=" py-8 rounded-3xl px4 md:px-8 grid  md:grid-cols-12 gap-x-8 md:bg-[rgba(0,0,0,0.1)]">
              <div className="col-start-1 col-end-3 row-start-1 md:col-end-6  py-8 px-4 rounded-3xl bg-whit bg[rgba(0,0,0,0.1)] flex flex-col items-start">
                <div className="px-6 py-2 border-2 text-primary border-black  rounded-full font-semibold">
                  CONTACT US
                </div>

                <div className="mt-4 md:mt-8 text-primary">
                  <p className="text-2xl mb-2 md:text-3xl font-semibold">
                    Reach Out to Us
                  </p>
                  <p className="font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur consequatur, distinctio maxime id impedit
                    veritatis?
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8 col-start-1 col-end-3 md:col-end-6">
                <div className="bordr shadow-md bg-primary flex items-center gap-4 px-4 py-4 rounded-2xl">
                  <div className=" w-12 h-12 bg-white/10 rounded-full flex justify-center items-center">
                    <MailIcon />
                  </div>
                  <div className="">
                    <p className="font-medium">Email Address</p>
                    <p className="text-md font-semibold">info@oneredbox.com</p>
                  </div>
                </div>

                <div className="bg-primary flex items-center gap-4 px-4 py-4 rounded-2xl">
                  <div className=" w-12 h-12 bg-white/10 rounded-full flex justify-center items-center">
                    <PhoneIcon />
                  </div>
                  <div className="">
                    <p className="font-medium">Phone Number</p>
                    <p className="text-md font-semibold">+1 234 5555 434</p>
                  </div>
                </div>

                <div className="bg-primary flex items-center gap-4 px-4 py-4 rounded-2xl">
                  <div className=" w-12 h-12 bg-white/10 rounded-full flex justify-center items-center">
                    <MapPinIcon />
                  </div>
                  <div className="">
                    <p className="font-medium">Our Office</p>
                    <p className="text-md font-semibold">+1 234 5555 434</p>
                  </div>
                </div>
              </div>

              <div className="col-start-1 md:col-start-6 row-start-2 md:row-start-1 row-end-3 w-full col-end-3 md:col-end-13 [&_label]:text-md [&_input]:text-primary [&_textarea]:text-primary [&_label]:text-primary [&_label]:font-semibold py-8 px-4 md:px-8 bordr bg-white shadow-md rounded-3xl flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6 ">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" placeholder="Last name" />
                  </div>
                </div>
                <div className="grid w-full max-wmd items-center gap-3">
                  <Label htmlFor="firstName">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter you email address"
                  />
                </div>

                <div className="w-full flex flex-col max-wsm flex-1 itemscenter gap-3">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message here..."
                    className="flex-1 bg-white/10 bordernone max-h-[250px] rounded-xl shadow-md"
                  />
                </div>

                <Button className="bgwhite textprimary bg-primary hover:bg-primary/80 font-semibold text-lg text-white py-6 cursor-pointer">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {/* <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="pt-6">
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll respond within 24-48 hours.
                      </p>
                      <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason for Contact</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                              {contactReasons.map((reason) => (
                                <SelectItem key={reason} value={reason.toLowerCase().replace(/\s/g, "-")}>
                                  {reason}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                      </div>

                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office) => (
                  <Card key={office.country}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-red-600" />
                        </div>
                        <CardTitle className="text-lg">{office.country}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p>{office.address}</p>
                          <p>{office.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                        <p>{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                        <p>{office.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                        <p>{office.hours}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-zinc-50 dark:bg-zinc-900 border-none">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">Chat with us directly</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-zinc-50 dark:bg-zinc-900 border-none">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">Response within 24hrs</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Map Section Placeholder */}
      {/* <section className="h-80 bg-zinc-200 dark:bg-zinc-800 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive Map</p>
          </div>
        </div>
      </section> */}
    </main>
  );
}
