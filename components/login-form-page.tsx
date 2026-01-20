"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { CircleAlert, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface IFormInput {
  clientId: string;
  passcode: string;
}

export default function LoginForm() {
  const { register, handleSubmit, setError, clearErrors } =
    useForm<IFormInput>();
  const [invalidCredentialsError, setInvalidCredentialsError] =
    useState<boolean>(false);
  const router = useRouter();
  const [signingIn, setSigningIn] = useState<boolean>(false);

  const nextPathname = "/dashboard";

  // Check if user is already authenticated (handles browser back button from cache)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-session");
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            router.replace("/");
          }
        }
      } catch (error) {
        // Silently fail - user can still try to login
      }
    };

    checkAuth();

    // Also check when page becomes visible (e.g., from bfcache)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        checkAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  const loginClient: SubmitHandler<IFormInput> = async (data) => {
    setInvalidCredentialsError(false);
    setSigningIn(true);
    try {
      const { data: resData } = await axios.post(
        "/api/auth/login",
        { ...data },
        { headers: { "Content-Type": "application/json" } },
      );
      if (resData.success) {
        router.push(nextPathname);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          setInvalidCredentialsError(true);
        }
      }
    } finally {
      setSigningIn(false);
    }
  };
  return (
    <main>
      <div className="bg-black min-h-60" />

      <div className="flex justify-center pt-10 px-4">
        <div className="w-full max-w-150 p-6 border border-gray-200 rounded-2xl shadow-lg space-y-8">
          <div className="">
            <p className="text-4xl font-semibold mb-2">Login</p>
            <p>To View Your Dashboard</p>
          </div>

          {invalidCredentialsError && (
            <div className="border px-4 py-2 rounded-xl border-red-400 bg-red-100">
              <span className="flex items-center text-sm gap-1 font-semibold text-red-500">
                <CircleAlert size={16} className="text-red-500" /> Error!
              </span>
              <div className="">
                <span className="font-medium">Invalid Credentials:</span>{" "}
                <span>
                  Ensure Credentials are correct. Double check your email
                  address and passcode
                </span>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(loginClient)}>
            <div className="space-y-2">
              <Label htmlFor="id" className="text-base font-medium">
                Your Unique ID
              </Label>
              <Input
                id="id"
                placeholder="Provide your unique ID"
                required
                {...register("clientId", { required: true })}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-base font-medium">
                Passcode
              </Label>
              <PasswordToggleField.Root>
                <div className="flex flex-nowrap items-center relative justify-center shadow-[0_0_0_1px_var(--black-a6)] h-10">
                  <PasswordToggleField.Input
                    className="all-[unset] box-border rounded-xl hfull w-full text-[15px] text-inherit selection:bg-blackA6 selection:text-white border shadow px-3 h-12"
                    placeholder="Enter passcode"
                    required
                    {...register("passcode", { required: true })}
                  />
                  <PasswordToggleField.Toggle className="all-[unset] box-border h-4.5 text-[15px] text-inherit leading-none flex items-center justify-center absolute right-2">
                    <PasswordToggleField.Icon
                      className="text-gray-400"
                      visible={<EyeIcon size={22} />}
                      hidden={<EyeOffIcon size={22} />}
                    />
                  </PasswordToggleField.Toggle>
                </div>
              </PasswordToggleField.Root>
              {/* <Input id="passcode" placeholder="Provide your unique ID" /> */}
            </div>

            <Button
              disabled={signingIn}
              className="font-semibold tracking-widest disabled:bg-primary/90 disabled:cursor-wait cursor-pointer shadow w-full text-lg mt-4 py-6 rounded-xl"
            >
              {signingIn ? (
                <>
                  PROCESSING <Loader2 className="animate-spin" />
                </>
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
