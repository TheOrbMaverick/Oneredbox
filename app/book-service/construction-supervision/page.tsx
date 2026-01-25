"use client";

import { useMemo, useRef, useState } from "react";
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
import { HardHat } from "lucide-react";
import {
  constructionSupervisionStep1Schema,
  constructionSupervisionStep2Schema,
  constructionSupervisionStep3Schema,
  constructionSupervisionStep4Schema,
  constructionSupervisionStep5Schema,
  constructionSupervisionStep6Schema,
} from "@/lib/form-schemas";
import { FormInput } from "@/components/ui/form-input";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";

const combinedSchema = z.object({
  ...constructionSupervisionStep1Schema.shape,
  ...constructionSupervisionStep2Schema.shape,
  ...constructionSupervisionStep3Schema.shape,
  ...constructionSupervisionStep4Schema.shape,
  ...constructionSupervisionStep5Schema.shape,
  ...constructionSupervisionStep6Schema.shape,
});

type FormData = z.infer<typeof combinedSchema>;

export default function ConstructionSupervisionPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
    defaultValues: {
      drawings: [],
      qualityChecks: [],
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = methods;

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

  const steps: FormStep[] = useMemo(
    () => [
      {
        id: "client-info",
        title: "Client Information",
        shortTitle: "Client Info",
        description: "Tell us about yourself and your project.",
        schema: constructionSupervisionStep1Schema,
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
            <FormField label="Project Location" name="projectLocation" required>
              <FormInput
                placeholder="e.g., Plot 15, Lekki Phase 1, Lagos"
                {...register("projectLocation")}
              />
            </FormField>

            <RadioGroupField
              label="Are you the owner or a representative?"
              name="ownerType"
              options={[
                { value: "owner", label: "Owner" },
                { value: "representative", label: "Representative" },
              ]}
              required
            />
            <FormField label="Name of Current Contractor" name="contractorName">
              <FormInput
                placeholder="Contractor or company name"
                {...register("contractorName")}
              />
            </FormField>
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
        id: "project-background",
        title: "Project Background",
        shortTitle: "Project",
        description: "Tell us about the current state of your project.",
        schema: constructionSupervisionStep2Schema,
        fields: (
          <div className="space-y-5">
            <FormField label="Type of Project" name="projectType" required>
              <Controller
                control={control}
                name="projectType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.projectType ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed-use">Mixed-use</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField
              label="Current Stage of Construction"
              name="constructionStage"
              required
            >
              <Controller
                control={control}
                name="constructionStage"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={
                        errors.constructionStage ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site-clearing">
                        Site Clearing
                      </SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="substructure">Substructure</SelectItem>
                      <SelectItem value="ground-floor">
                        Ground Floor Slab
                      </SelectItem>
                      <SelectItem value="blockwork">Blockwork</SelectItem>
                      <SelectItem value="first-floor">
                        First Floor Slab
                      </SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="finishing">Finishing Stage</SelectItem>
                      <SelectItem value="mep">MEP Installation</SelectItem>
                      <SelectItem value="external">External Works</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField label="Expected Completion Date" name="completionDate">
              <FormInput type="date" {...register("completionDate")} />
            </FormField>
            <RadioGroupField
              label="Has a soil test been carried out?"
              name="soilTest"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unknown", label: "Unknown" },
              ]}
            />
          </div>
        ),
      },
      {
        id: "documentation",
        title: "Documentation",
        shortTitle: "Documents",
        description: "Let us know what documents are available for review.",
        schema: constructionSupervisionStep3Schema,
        fields: (
          <div className="space-y-5">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Available Drawings (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  { id: "architectural", label: "Architectural Drawings" },
                  { id: "structural", label: "Structural Drawings" },
                  { id: "mep", label: "Mechanical/Electrical Drawings" },
                  { id: "boq", label: "Bill of Quantities" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="drawings"
                      render={({ field }) => (
                        <Checkbox
                          id={item.id}
                          checked={(field.value || []).includes(item.id)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, item.id]);
                            } else {
                              field.onChange(
                                current.filter((i: string) => i !== item.id),
                              );
                            }
                          }}
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
            <RadioGroupField
              label="Do you have building approvals?"
              name="hasApprovals"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "in-progress", label: "In Progress" },
              ]}
            />
            <FormField
              label="Contractor's Scope of Work (Optional)"
              name="contractorScope"
            >
              <Textarea
                placeholder="Briefly describe what your contractor is responsible for..."
                rows={3}
                className="resize-none"
                {...register("contractorScope")}
              />
            </FormField>
          </div>
        ),
      },
      {
        id: "supervision-requirements",
        title: "Supervision Requirements",
        shortTitle: "Supervision",
        description: "How often do you need us to supervise?",
        schema: constructionSupervisionStep4Schema,
        fields: (
          <div className="space-y-5">
            <FormField
              label="What level of supervision is required?"
              name="supervisionLevel"
              required
            >
              <Controller
                control={control}
                name="supervisionLevel"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={
                        errors.supervisionLevel ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice-weekly">Twice Weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <RadioGroupField
              label="Do you want video/photo reporting?"
              name="photoReporting"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you need material quality verification?"
              name="materialVerification"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you need stage-by-stage approval (sign-off)?"
              name="stageApproval"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you want us to audit the BOQ for overbilling?"
              name="boqAudit"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you want us to re-measure quantities?"
              name="remeasure"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you want safety compliance oversight?"
              name="safetyOversight"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </div>
        ),
      },
      {
        id: "quality-control",
        title: "Quality Control Scope",
        shortTitle: "Quality",
        description: "Select the quality control checks you need.",
        schema: constructionSupervisionStep5Schema,
        fields: (
          <div className="space-y-5">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Quality Control Checks (Select all that apply)
              </Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Structural integrity monitoring",
                  "Reinforcement inspection",
                  "Concrete mix verification",
                  "Block quality checks",
                  "Verticality & alignment checks",
                  "Waterproofing checks",
                  "Electrical installation compliance",
                  "Plumbing installation compliance",
                  "Finishing quality (POP, tiling, paint, carpentry)",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="qualityChecks"
                      render={({ field }) => (
                        <Checkbox
                          id={item.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                          checked={(field.value || []).includes(item)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, item]);
                            } else {
                              field.onChange(
                                current.filter((i: string) => i !== item),
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <Label
                      htmlFor={item.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                      className="font-normal text-sm text-foreground"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "additional-services",
        title: "Additional Services",
        shortTitle: "Additional",
        description: "Any extra services you may need.",
        schema: constructionSupervisionStep6Schema,
        fields: (
          <div className="space-y-5">
            <RadioGroupField
              label="Do you need cost estimation assistance?"
              name="costEstimation"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <RadioGroupField
              label="Do you want periodic progress reports?"
              name="progressReports"
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
                      <SelectItem value="google-search">
                        Google Search
                      </SelectItem>
                      <SelectItem value="friend-referral">
                        Friend/Family Referral
                      </SelectItem>
                      <SelectItem value="previous-client">
                        Previous Client
                      </SelectItem>
                      <SelectItem value="advertisement">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField
              label="Additional Notes or Requirements"
              name="additionalNotes"
            >
              <Textarea
                placeholder="Any other information you'd like us to know..."
                rows={4}
                className="resize-none min-h-[200px]"
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
                <p className="text-sm text-blue-600">
                  Verifying reCAPTCHA...
                </p>
              )}
              {!isVerified && !isVerifying && (
                <p className="text-sm text-muted-foreground">
                  Please complete the reCAPTCHA to submit the form
                </p>
              )}
              {isVerified && (
                <p className="text-sm text-green-600">
                  ✓ Verified successfully
                </p>
              )}
            </div>
          </div>
        ),
      },
    ],
    [register, control, errors],
  );

  const handleSubmit = async (data: FormData) => {
    if (!isVerified) {
      alert("Please complete and verify the reCAPTCHA");
      return;
    }

    try {
      const response = await fetch("/api/forms/construction-supervision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaVerified: true,
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
      console.log("An Error occured while submitting form", error);
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
              <HardHat className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Construction Supervision
            </h1>
            <p className="text-zinc-400">
              Ensure quality control on your construction project. Fill out the
              form below so we can provide the right level of supervision.
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
