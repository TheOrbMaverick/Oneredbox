"use client";

import {
  MultiStepForm,
  type FormStep,
  FormField,
  RadioGroupField,
} from "@/components/multi-step-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Compass } from "lucide-react";
import {
  buildingDesignStep1Schema,
  buildingDesignStep2Schema,
  buildingDesignStep3Schema,
  buildingDesignStep4Schema,
  buildingDesignStep5Schema,
  buildingDesignStep6Schema,
  buildingDesignStep7Schema,
} from "@/lib/form-schemas";
import { FormInput } from "@/components/ui/form-input";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

const combinedSchema = z.object({
  ...buildingDesignStep1Schema.shape,
  ...buildingDesignStep2Schema.shape,
  ...buildingDesignStep3Schema.shape,
  ...buildingDesignStep4Schema.shape,
  ...buildingDesignStep5Schema.shape,
  ...buildingDesignStep6Schema.shape,
  ...buildingDesignStep7Schema.shape,
});

type FormData = z.infer<typeof combinedSchema>;

export default function BuildingDesignPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
    defaultValues: {
      specialSpaces: [],
      materialPreferences: [],
    },
  });

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const buildingCategory = watch("buildingCategory");
  const soilTestAvailable = watch("soilTestAvailable");

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

  const steps: FormStep[] = [
    {
      id: "client-info",
      title: "Client Information",
      shortTitle: "Client Info",
      description: "Tell us about yourself and your project location.",
      schema: buildingDesignStep1Schema,
      fields: (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Full Name" name="fullName" required>
              <FormInput placeholder="John Doe" {...register("fullName")} />
            </FormField>
            <FormField label="Email Address" name="email" required>
              <FormInput
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
            </FormField>
          </div>
          <FormField label="Phone Number" name="phone" required>
            <FormInput
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("phone")}
            />
          </FormField>
          <FormField
            label="Project Address (if land already acquired)"
            name="projectAddress"
          >
            <FormInput
              placeholder="e.g., Plot 15, Lekki Phase 1, Lagos"
              {...register("projectAddress")}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Land Size" name="landSize">
              <FormInput
                placeholder="e.g., 500 sqm"
                {...register("landSize")}
              />
            </FormField>
            <FormField
              label="Land Title (for approval feasibility)"
              name="landTitle"
            >
              <Controller
                control={control}
                name="landTitle"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c-of-o">C of O</SelectItem>
                      <SelectItem value="governors-consent">
                        Governor's Consent
                      </SelectItem>
                      <SelectItem value="registered-survey">
                        Registered Survey
                      </SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="none">Not Yet Acquired</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <FormField label="Select Meeting Date" name="date" required>
              <FormInput type="date" {...register("date")} />
            </FormField>
            <FormField label="Select Meeting Time" name="time" required>
              <FormInput type="time" {...register("time")} />
            </FormField>
          </div>
        </div>
      ),
    },
    {
      id: "project-type",
      title: "Project Type",
      shortTitle: "Project Type",
      description: "What type of building do you want to design?",
      schema: buildingDesignStep2Schema,
      fields: (
        <div className="space-y-5">
          <FormField label="Building Category" name="buildingCategory" required>
            <Controller
              control={control}
              name="buildingCategory"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={
                      errors.buildingCategory ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      Residential Building
                    </SelectItem>
                    <SelectItem value="commercial">
                      Commercial Building
                    </SelectItem>
                    <SelectItem value="mixed-use">Mixed-use</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="special">Special Structure</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          {buildingCategory === "residential" && (
            <FormField label="Residential Type" name="residentialType">
              <Controller
                control={control}
                name="residentialType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detached">Detached House</SelectItem>
                      <SelectItem value="semi-detached">
                        Semi-detached
                      </SelectItem>
                      <SelectItem value="terrace">Terrace</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="apartment">Apartment Block</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          )}

          {buildingCategory === "commercial" && (
            <FormField label="Commercial Type" name="commercialType">
              <Controller
                control={control}
                name="commercialType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office Building</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="mall">Mall/Plaza</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          )}

          {buildingCategory === "special" && (
            <FormField label="Specify Structure Type" name="specialType">
              <FormInput
                placeholder="e.g., Church, School, Clinic, Short-let property"
                {...register("specialType")}
              />
            </FormField>
          )}
        </div>
      ),
    },
    {
      id: "architectural-requirements",
      title: "Architectural Requirements",
      shortTitle: "Architecture",
      description: "Specify the design details for your building.",
      schema: buildingDesignStep3Schema,
      fields: (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Number of Floors" name="floors">
              <Controller
                control={control}
                name="floors"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select floors" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} Floor{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                      <SelectItem value="7+">7+ Floors</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField label="Number of Bedrooms" name="bedrooms">
              <Controller
                control={control}
                name="bedrooms"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} Bedroom{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                      <SelectItem value="9+">9+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Number of Living Rooms" name="livingRooms">
              <Controller
                control={control}
                name="livingRooms"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField label="Number of Bathrooms" name="bathrooms">
              <Controller
                control={control}
                name="bathrooms"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                      <SelectItem value="9+">9+</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>
          <FormField label="Kitchen Type" name="kitchenType">
            <Controller
              control={control}
              name="kitchenType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open Kitchen</SelectItem>
                    <SelectItem value="closed">Closed Kitchen</SelectItem>
                    <SelectItem value="both">
                      Both (Open + Service Kitchen)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <RadioGroupField
            label="Guest Toilet Required?"
            name="guestToilet"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Special Spaces (Select all that apply)
            </Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                "Home Office",
                "Library",
                "Cinema",
                "Gym",
                "Laundry",
                "Walk-in Closet",
                "Outdoor Kitchen",
                "Boys Quarters",
                "Pool",
                "Rooftop Terrace",
              ].map((space) => (
                <div key={space} className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="specialSpaces"
                    render={({ field }) => (
                      <Checkbox
                        id={space.toLowerCase().replace(" ", "-")}
                        checked={(field.value || []).includes(space)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          if (checked) {
                            field.onChange([...current, space]);
                          } else {
                            field.onChange(
                              current.filter((i: string) => i !== space),
                            );
                          }
                        }}
                      />
                    )}
                  />
                  <Label
                    htmlFor={space.toLowerCase().replace(" ", "-")}
                    className="font-normal text-sm text-foreground"
                  >
                    {space}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <FormField
            label="Parking Requirements (Number of Cars)"
            name="parking"
          >
            <FormInput
              type="number"
              placeholder="e.g., 4"
              {...register("parking", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="Preferred Building Style" name="buildingStyle">
            <Controller
              control={control}
              name="buildingStyle"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contemporary">Contemporary</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField
            label="Inspiration Notes / Reference URLs"
            name="inspiration"
          >
            <Textarea
              placeholder="Describe your vision or paste links to sample designs you like..."
              rows={3}
              className="resize-none min-h-[200px]"
              {...register("inspiration")}
            />
          </FormField>
        </div>
      ),
    },
    {
      id: "engineering",
      title: "Engineering & Structural",
      shortTitle: "Engineering",
      description: "Technical requirements for your building.",
      schema: buildingDesignStep4Schema,
      fields: (
        <div className="space-y-5">
          <RadioGroupField
            label="Do you have a soil test available?"
            name="soilTestAvailable"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {soilTestAvailable === "no" && (
            <RadioGroupField
              label="Do you need us to conduct a soil test?"
              name="needSoilTest"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
          <FormField
            label="Preferred Structural System"
            name="structuralSystem"
          >
            <Controller
              control={control}
              name="structuralSystem"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">
                      Normal Reinforced Concrete
                    </SelectItem>
                    <SelectItem value="steel">Steel Framing</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Additional Engineering Needs
            </Label>
            <div className="space-y-3">
              {(
                [
                  { id: "solar", label: "Solar Power Design" },
                  { id: "borehole", label: "Borehole/Water System Design" },
                  { id: "drainage", label: "Drainage Design" },
                ] as const
              ).map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name={item.id}
                    render={({ field }) => (
                      <Checkbox
                        id={item.id}
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor={item.id}
                    className="font-normal text-foreground"
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "budget-materials",
      title: "Budget & Materials",
      shortTitle: "Budget",
      description: "Specify your budget range and material preferences.",
      schema: buildingDesignStep5Schema,
      fields: (
        <div className="space-y-5">
          <FormField label="Budget Range (NGN)" name="budgetRange">
            <Controller
              control={control}
              name="budgetRange"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50m">Under ₦50 Million</SelectItem>
                    <SelectItem value="50m-100m">₦50 - 100 Million</SelectItem>
                    <SelectItem value="100m-200m">
                      ₦100 - 200 Million
                    </SelectItem>
                    <SelectItem value="200m-500m">
                      ₦200 - 500 Million
                    </SelectItem>
                    <SelectItem value="over-500m">Over ₦500 Million</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField label="Finishing Level" name="finishingLevel">
            <Controller
              control={control}
              name="finishingLevel"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Material Preferences
            </Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Local Materials",
                "Imported Materials",
                "Eco-friendly/Sustainable",
                "Smart Home Integration",
              ].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="materialPreferences"
                    render={({ field }) => (
                      <Checkbox
                        id={material.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                        checked={(field.value || []).includes(material)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          if (checked) {
                            field.onChange([...current, material]);
                          } else {
                            field.onChange(
                              current.filter((i: string) => i !== material),
                            );
                          }
                        }}
                      />
                    )}
                  />
                  <Label
                    htmlFor={material.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                    className="font-normal text-foreground"
                  >
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "project-management",
      title: "Project Management",
      shortTitle: "Management",
      description: "Additional project management services.",
      schema: buildingDesignStep6Schema,
      fields: (
        <div className="space-y-5">
          <RadioGroupField
            label="Do you want project management services?"
            name="projectManagement"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you need building approval submission?"
            name="approvalSubmission"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you need BOQ preparation?"
            name="boqPreparation"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "additional-services",
      title: "Additional Services",
      shortTitle: "Additional",
      description: "Any extra design services you may need.",
      schema: buildingDesignStep7Schema,
      fields: (
        <div className="space-y-5">
          <RadioGroupField
            label="Do you need interior design?"
            name="interiorDesign"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you need landscape design?"
            name="landscapeDesign"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you want 3D renders?"
            name="render3d"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FormField
            label="How did you hear about us?"
            name="referralSource"
            required
          >
            <Controller
              control={control}
              name="referralSource"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={
                      errors.referralSource ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media">
                      Social Media (Facebook, Instagram, Twitter)
                    </SelectItem>
                    <SelectItem value="google-search">Google Search</SelectItem>
                    <SelectItem value="friend-referral">
                      Friend/Family Referral
                    </SelectItem>
                    <SelectItem value="previous-client">
                      Previous Client
                    </SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="optInVideoUpdates"
              {...register("optInVideoUpdates")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label
              htmlFor="optInVideoUpdates"
              className="text-sm font-normal cursor-pointer"
            >
              Opt in for Live Site Video Updates
            </Label>
          </div>
          <FormField
            label="Additional Notes or Requirements"
            name="additionalNotes"
          >
            <Textarea
              placeholder="Any other information you'd like us to know..."
              rows={4}
              className="resize-none"
              {...register("additionalNotes")}
            />
          </FormField>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Security Verification *
            </Label>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "6LeohFQsAAAAAMfBpzl7D0OsIMtUClX287Q8N8t6"
              }
              onChange={handleRecaptchaChange}
              onExpired={() => {
                setRecaptchaToken(null);
                setIsVerified(false);
              }}
            />
            {isVerifying && (
              <p className="text-sm text-blue-600">Verifying reCAPTCHA...</p>
            )}
            {!isVerified && !isVerifying && (
              <p className="text-sm text-muted-foreground">
                Please complete the reCAPTCHA to submit the form
              </p>
            )}
            {isVerified && (
              <p className="text-sm text-green-600">✓ Verified successfully</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  const handleSubmit = async (data: FormData) => {
    if (!isVerified) {
      alert("Please complete and verify the reCAPTCHA");
      return;
    }

    try {
      const response = await fetch("/api/forms/building-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Reset reCAPTCHA after successful submission
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setIsVerified(false);
    } catch (error) {
      console.log("An error occured while submitting form", error);
      alert("An error occurred. Please try again.");
      // Re-throw so multi-step-form knows submission failed
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* <InnerPageHeader /> */}

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mx-auto mb-6">
              <Compass className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Building Design
            </h1>
            <p className="text-zinc-400">
              Complete the form below to help us understand your vision. We'll
              create architectural and structural designs tailored to your
              needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <FormProvider {...methods}>
            <MultiStepForm
              steps={steps}
              onSubmit={handleSubmit}
              canSubmit={isVerified}
            />
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
