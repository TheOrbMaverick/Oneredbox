import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderX } from "lucide-react";

export default function DemoProjectNotFound() {
  return (
    <main className="min-h-screen bg-background">
      {/* <InnerPageHeader /> */}

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FolderX className="h-12 w-12 text-zinc-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The project you're looking for doesn't exist or you may not have
            access to view it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/demo-dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
