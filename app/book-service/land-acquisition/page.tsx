"use client";

import {
  MultiStepForm,
  type FormStep,
  FormField,
  RadioGroupField,
} from "@/components/multi-step-form";
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
import { MapPin } from "lucide-react";
import {
  landAcquisitionStep1BaseSchema,
  landAcquisitionRefinement,
  landAcquisitionStep2Schema,
  landAcquisitionStep3Schema,
  landAcquisitionStep4Schema,
  landAcquisitionStep5Schema,
} from "@/lib/form-schemas";
import { FormInput } from "@/components/ui/form-input";
import { client } from "@/config/sanity";
import { SanityDocumentStub } from "next-sanity";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const combinedSchema = z
  .object({
    ...landAcquisitionStep1BaseSchema.shape,
    ...landAcquisitionStep2Schema.shape,
    ...landAcquisitionStep3Schema.shape,
    ...landAcquisitionStep4Schema.shape,
    ...landAcquisitionStep5Schema.shape,
  })
  .refine(landAcquisitionRefinement, {
    message: "Please specify your relationship to the buyer",
    path: ["relationshipToBuyer"],
  });

type FormData = z.infer<typeof combinedSchema>;

export default function LandAcquisitionPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    shouldUnregister: false,
    // mode: "onChange",
    defaultValues: {
      // proximityPreferences: [],
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const steps: FormStep[] = [
    {
      id: "client-info",
      title: "Client Information",
      shortTitle: "Client Info",
      description:
        "Tell us about yourself so we can better assist you with your land acquisition.",
      schema: landAcquisitionStep1BaseSchema,
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
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Phone Number" name="phone" required>
              <FormInput
                type="tel"
                placeholder="+234 800 000 0000"
                {...register("phone")}
              />
            </FormField>
            <FormField
              label="Country of Residence"
              name="countryOfResidence"
              required
            >
              <FormInput
                placeholder="Nigeria"
                {...register("countryOfResidence")}
              />
            </FormField>
          </div>
          <RadioGroupField
            label="Preferred Contact Method"
            name="preferredContactMethod"
            options={[
              { value: "call", label: "Phone Call" },
              { value: "whatsapp", label: "WhatsApp" },
              { value: "email", label: "Email" },
            ]}
            required
          />
          <RadioGroupField
            label="Are you the direct buyer or representing someone?"
            name="buyerType"
            options={[
              { value: "direct", label: "Yes, I am the direct buyer" },
              {
                value: "representative",
                label: "No, I am representing someone",
              },
            ]}
            required
          />
          <Controller
            control={control}
            name="buyerType"
            render={({ field }) =>
              field.value === "representative" ? (
                <FormField
                  label="Relationship to the Buyer"
                  name="relationshipToBuyer"
                  required
                >
                  <FormInput
                    placeholder="e.g., Family member, Agent, Lawyer"
                    {...register("relationshipToBuyer")}
                  />
                </FormField>
              ) : (
                <></>
              )
            }
          />
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
      id: "land-requirements",
      title: "Land Requirements",
      shortTitle: "Land Requirements",
      description: "Specify your preferences for the land you want to acquire.",
      schema: landAcquisitionStep2Schema,
      fields: (
        <div className="space-y-5">
          <FormField
            label="Preferred Location(s) in Nigeria"
            name="preferredLocation"
            required
          >
            <FormInput
              placeholder="e.g., Lekki, Ikoyi, Abuja, Port Harcourt"
              {...register("preferredLocation")}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Minimum Land Size" name="minLandSize">
              <FormInput
                placeholder="e.g., 500 sqm"
                {...register("minLandSize")}
              />
            </FormField>
            <FormField label="Maximum Land Size" name="maxLandSize">
              <FormInput
                placeholder="e.g., 1000 sqm"
                {...register("maxLandSize")}
              />
            </FormField>
          </div>
          <FormField label="Preferred Land Shape" name="landShape">
            <Controller
              control={control}
              name="landShape"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular Shape</SelectItem>
                    <SelectItem value="irregular">Irregular Shape</SelectItem>
                    <SelectItem value="corner">Corner Plot</SelectItem>
                    <SelectItem value="any">Any Shape</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField label="Purpose of the Land" name="purpose" required>
            <Controller
              control={control}
              name="purpose"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.purpose ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="mixed-use">Mixed-use</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Minimum Budget (NGN)" name="minBudget">
              <FormInput
                // type="number"
                placeholder="e.g., 50,000,000"
                {...register("minBudget")}
              />
            </FormField>
            <FormField label="Maximum Budget (NGN)" name="maxBudget">
              <FormInput
                // type="number"
                placeholder="e.g., 150,000,000"
                {...register("maxBudget")}
              />
            </FormField>
          </div>
          <FormField label="Preferred Land Title" name="preferredLandTitle">
            <Controller
              control={control}
              name="preferredLandTitle"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c-of-o">
                      C of O (Certificate of Occupancy)
                    </SelectItem>
                    <SelectItem value="governors-consent">
                      Governor's Consent
                    </SelectItem>
                    <SelectItem value="registered-survey">
                      Registered Survey
                    </SelectItem>
                    <SelectItem value="gazette">Gazette</SelectItem>
                    <SelectItem value="excision">Excision</SelectItem>
                    <SelectItem value="deed">Deed of Assignment</SelectItem>
                    <SelectItem value="any">Any Title is Fine</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <RadioGroupField
            label="Do you require installment payment options?"
            name="installmentPayment"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FormField label="Timeline for Purchase" name="timeline">
            <Controller
              control={control}
              name="timeline"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="3-months">Within 3 Months</SelectItem>
                    <SelectItem value="6-months">Within 6 Months</SelectItem>
                    <SelectItem value="1-year">Within 1 Year</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>
      ),
    },
    {
      id: "infrastructure",
      title: "Infrastructure & Environment",
      shortTitle: "Infrastructure",
      description:
        "Tell us about your preferred environment and infrastructure needs.",
      schema: landAcquisitionStep3Schema,
      fields: (
        <div className="space-y-5">
          <FormField label="Preferred Road Access" name="roadAccess">
            <Controller
              control={control}
              name="roadAccess"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tarred">Tarred Road</SelectItem>
                    <SelectItem value="motorable">Motorable Road</SelectItem>
                    <SelectItem value="any">Doesn't Matter</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Proximity Preferences (Select all that apply)
            </Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Schools",
                "Main Roads",
                "Commercial Areas",
                "Hospitals",
                "Water Bodies",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="proximityPreferences"
                    render={({ field }) => (
                      <Checkbox
                        id={item.toLowerCase().replace(" ", "-")}
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
                    htmlFor={item.toLowerCase().replace(" ", "-")}
                    className="font-normal text-foreground"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <RadioGroupField
            label="Is flood-free a priority?"
            name="floodFree"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Gated community preferred?"
            name="gatedCommunity"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FormField label="Security Priority Level" name="securityPriority">
            <Controller
              control={control}
              name="securityPriority"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>
      ),
    },
    {
      id: "due-diligence",
      title: "Due Diligence Requirements",
      shortTitle: "Due Diligence",
      description: "Let us know what verification services you need.",
      schema: landAcquisitionStep4Schema,
      fields: (
        <div className="space-y-5">
          <RadioGroupField
            label="Do you want us to verify land documents?"
            name="verifyDocuments"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you need us to check community/family ownership?"
            name="checkOwnership"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you want boundary confirmation & site visit?"
            name="siteVisit"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you require negotiation on your behalf?"
            name="negotiation"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "additional",
      title: "Additional Services",
      shortTitle: "Additional",
      description: "Any extra services you may need.",
      schema: landAcquisitionStep5Schema,
      fields: (
        <div className="space-y-5">
          <RadioGroupField
            label="Would you like us to conduct a survey (if not available)?"
            name="surveyService"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you want us to handle perfection of title?"
            name="perfection"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioGroupField
            label="Do you need fencing after purchase?"
            name="fencing"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FormField
            label="Additional Notes or Requirements"
            name="additionalNotes"
          >
            <Textarea
              placeholder="Any other information you'd like us to know..."
              rows={4}
              className="resize-none min-h-50"
              {...register("additionalNotes")}
            />
          </FormField>
        </div>
      ),
    },
  ];

  const handleSubmit = async (data: FormData) => {
    // return;
    try {
      const payload: SanityDocumentStub<Record<string, any>> = {
        _type: "landAcquisition",
        ...data,
      };
      await client.create(payload);
    } catch (error) {
      console.log("An error occured while submitting form", error);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* <InnerPageHeader /> */}

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Land Acquisition
            </h1>
            <p className="text-zinc-400">
              Complete the form below to help us find the perfect land for you.
              The more details you provide, the better we can serve you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <FormProvider {...methods}>
            <MultiStepForm steps={steps} onSubmit={handleSubmit} />
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
