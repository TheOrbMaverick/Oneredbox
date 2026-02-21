"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Dashboard Project Route Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex flex-col items-center justify-center mx-auto shadow-sm border border-red-200">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
            We encountered an unexpected error while trying to load your project
            details. Our team has been notified.
          </p>
        </div>

        {/* Error Details (Optional for dev, usually hidden in prod depending on preference) */}
        {/*
        <div className="bg-zinc-100 p-4 rounded-lg text-left text-xs text-red-800 font-mono overflow-auto max-h-32">
          {error.message || "Unknown error occurred"}
        </div>
        */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={() => window.location.reload()}
            className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="outline" className="gap-2 border-zinc-200">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="pt-6 border-t border-zinc-200">
          <p className="text-xs text-muted-foreground">
            Still having issues? <Link href="/contact" className="underline hover:text-zinc-900">Contact Support</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
