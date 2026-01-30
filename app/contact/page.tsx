"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { address, NGPhone, USPhone } from "@/constants/info";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleRecaptchaChange = async (token: string | null) => {
    if (!token) {
      setRecaptchaToken(null);
      setIsVerified(false);
      return;
    }

    setRecaptchaToken(token);
    setIsVerifying(true);

    try {
      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        setRecaptchaToken(null);
        alert("reCAPTCHA verification failed. Please try again.");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
      setIsVerified(false);
      setRecaptchaToken(null);
      alert("Error verifying reCAPTCHA. Please try again.");
      recaptchaRef.current?.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!isVerified) {
      alert("Please complete and verify the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        publicKey
      );

      setSubmitSuccess(true);
      reset();
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setIsVerified(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
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
                    We're here to help bring your vision to life. Whether you need land acquisition, building design, or construction supervision, our team is ready to assist you every step of the way.
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
                    <div className="flex gap-4">
                      <p className="text-md font-semibold">
                        <Link href={`tel:${NGPhone}`}>{NGPhone}</Link>
                      </p>
                      <p className="text-md font-semibold">{USPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary flex items-center gap-4 px-4 py-4 rounded-2xl">
                  <div className=" w-12 h-12 bg-white/10 rounded-full flex justify-center items-center">
                    <MapPinIcon />
                  </div>
                  <div className="">
                    <p className="font-medium">Our Office</p>
                    <p className="text-md font-semibold">{address}</p>
                  </div>
                </div>
              </div>

              <div className="col-start-1 md:col-start-6 row-start-2 md:row-start-1 row-end-3 w-full col-end-3 md:col-end-13 [&_label]:text-md [&_input]:text-primary [&_textarea]:text-primary [&_label]:text-primary [&_label]:font-semibold py-8 px-4 md:px-8 bordr bg-white shadow-md rounded-3xl flex flex-col justify-center gap-6">
                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6 ">
                      <div className="grid w-full max-wsm items-center gap-3">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          {...register("name")}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid w-full max-wmd items-center gap-3">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full flex flex-col max-wsm flex-1 itemscenter gap-3">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message here..."
                        className={`flex-1 bg-white/10 bordernone max-h-[250px] min-h-[150px] rounded-xl shadow-md ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      {/* <Label className="text-sm font-medium text-primary">
                        Security Verification *
                      </Label> */}
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                          ""
                        }
                        onChange={handleRecaptchaChange}
                        onExpired={() => {
                          setRecaptchaToken(null);
                          setIsVerified(false);
                        }}
                      />
                      {isVerifying && (
                        <p className="text-sm text-blue-600">
                          Verifying reCAPTCHA...
                        </p>
                      )}
                      {!isVerified && !isVerifying && (
                        <p className="text-sm text-gray-600">
                          Please complete the reCAPTCHA to submit the form
                        </p>
                      )}
                      {isVerified && (
                        <p className="text-sm text-green-600">
                          ✓ Verified successfully
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !isVerified}
                      className="bgwhite textprimary mt-auto bg-primary hover:bg-primary/80 font-semibold text-lg text-white py-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
