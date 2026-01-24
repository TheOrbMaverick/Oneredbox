"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { useFormContext } from "react-hook-form";

export interface FormStep {
  id: string;
  title: string;
  shortTitle?: string;
  description?: string;
  fields: React.ReactNode;
  schema?: z.ZodObject<any>;
}

export interface FieldError {
  [key: string]: string;
}

interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: any) => void;
  canSubmit?: boolean; // Optional prop to control submit button state
}

export function MultiStepForm({ steps, onSubmit, canSubmit = true }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { trigger, handleSubmit: hookFormSubmit } = useFormContext();

  const validateCurrentStep = useCallback(async () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData.schema) return true;

    // Get keys from the schema to validate only fields in this step
    const fieldKeys = Object.keys(currentStepData.schema.shape);
    const isValid = await trigger(fieldKeys);
    return isValid;
  }, [currentStep, steps, trigger]);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onFormSubmit = async (data: any) => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      
      await onSubmit(data);
      setIsSubmitting(false);
      setIsComplete(true);
    } catch (error) {
      
    }finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Request Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Thank you for your submission. Our team will review your
            requirements and get back to you within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/book-service")}
              className="bg-transparent"
            >
              Book Another Service
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => (window.location.href = "/")}
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl border4 mx-auto">
      <Card className="mb-0">
        <CardContent className="pt-8 pb-8">
          {/* Step Indicator - Numbered circles with connecting lines */}
          <div className="flex items-start flex-wrap justify-center mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start">
                {/* Step circle and label */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all border-2",
                      index === currentStep &&
                        "bg-primary border-primary text-primary-foreground",
                      index < currentStep &&
                        "bg-primary border-primary text-primary-foreground cursor-pointer",
                      index > currentStep &&
                        "bg-background border-muted-foreground/30 text-muted-foreground cursor-not-allowed",
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium text-center max-w-20 leading-tight",
                      index === currentStep && "text-primary",
                      index < currentStep && "text-primary",
                      index > currentStep && "text-muted-foreground",
                    )}
                  >
                    {step.shortTitle || step.title}
                  </span>
                </div>
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 sm:w-20 lg:w-24 mt-4.5 mx-1",
                      index < currentStep
                        ? "bg-primary"
                        : "bg-muted-foreground/30",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Title and Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1 text-foreground">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].description && (
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <form onSubmit={hookFormSubmit(onFormSubmit)}>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(index !== currentStep && "hidden")}
                >
                  {step.fields}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  disabled={isSubmitting || !canSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onMouseDown={handleNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name?: string; // Add name prop to fetch error from context
  error?: string; // Keep for backward compatibility or manual override
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  name,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const { formState } = useFormContext();
  const errorMessage =
    error || (name ? (formState.errors[name]?.message as string) : undefined);

  return (
    <div className={cn("space-y-2", className)}>
      <label
        className={cn(
          "text-sm font-medium block",
          errorMessage ? "text-destructive" : "text-foreground",
        )}
      >
        {label}
        {required && " *"}
      </label>
      {children}
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}

interface RadioOptionProps {
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  name: string;
}

import { Controller } from "react-hook-form";

interface RadioGroupFieldProps {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  className?: string;
}

export function RadioGroupField({
  label,
  name,
  required,
  options,
  className,
}: RadioGroupFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          {/* {JSON.stringify(field.value)} */}
          <label
            className={cn(
              "text-sm font-medium block",
              fieldState.error ? "text-destructive" : "text-foreground",
            )}
          >
            {label}
            {required && " *"}
          </label>

          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            {options.map((option) => (
              <Label
                key={`${name}-${option.value}`}
                htmlFor={`${name}-${option.value}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem
                  key={option.value}
                  id={`${name}-${option.value}`}
                  value={option.value}
                />
                <span className="text-sm text-foreground font-normal">
                  {option.label}
                </span>
              </Label>
            ))}
          </RadioGroup>
          {fieldState.error && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

export function RadioOption({
  id,
  value,
  label,
  checked,
  onChange,
  name,
}: RadioOptionProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="sr-only peer"
        />
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 transition-all",
            checked ? "border-primary" : "border-muted-foreground/50",
          )}
        >
          {checked && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}
