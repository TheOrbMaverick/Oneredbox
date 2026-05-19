import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProjectMediaGallery } from "@/components/project-media-gallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getProjectById,
  formatCurrency,
  formatDate,
  clientProjects,
} from "@/lib/client-projects-data";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  Phone,
  Mail,
  Banknote,
  Wallet,
  CreditCard,
  Clock,
  Building2,
  Ruler,
  BedDouble,
  Bath,
  Layers,
  MessageCircle,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export function generateStaticParams() {
  return clientProjects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await client.fetch(
    `*[_type=="clientProject" && _id == "${id}"][0]{...,"clientRef":clientRef->{clientName},"projectManager":projectManager->,"cameraFeedLink":cameraFeedLink,"media":media | order(date desc)[]{...,"image":image.asset->,"thumbnail":thumbnail.asset->,"video":video.asset->}}`,
    { id },
  );

  if (!project) {
    notFound();
  }

  const statusColors = {
    "in-progress": "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    "on-hold": "bg-zinc-100 text-zinc-800",
  };

  const serviceTypeLabels = {
    "land-acquisition": "Land Acquisition",
    "building-design": "Building Design & Construction",
    "construction-supervision": "Construction Supervision",
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* <InnerPageHeader /> */}

      {/* Header Section */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <p className="text-zinc-400 text-sm mb-2">Welcome back,</p>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                {project?.clientRef.clientName}
              </h1>
              <h2 className="text-xl lg:text-2xl text-zinc-300 font-medium mb-4">
                {project?.projectTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  className={
                    statusColors[
                      project.status as "completed" | "in-progress" | "on-hold"
                    ]
                  }
                >
                  {project?.status === "in-progress"
                    ? "In Progress"
                    : project?.status === "completed"
                      ? "Completed"
                      : "On Hold"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-zinc-600 text-zinc-300"
                >
                  {
                    serviceTypeLabels[
                      project.serviceType as
                        | "land-acquisition"
                        | "building-design"
                        | "construction-supervision"
                    ]
                  }
                </Badge>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="flex items-center gap-6 bg-zinc-800/50 border border-gray-50/10 rounded-2xl p-6">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-zinc-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${
                      project.completionPercentage * 2.51
                    } 251`}
                    className="text-red-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {project?.completionPercentage}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Project Completion</p>
                <p className="text-white font-medium mt-1">
                  Est. {formatDate(project.estimatedCompletion)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Stats */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-red-500/10 shadow-lg py-0">
              <CardContent className="p-3 sm:p-5">
                <div className="flex sm:items-center flex-col sm:flex-row gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">
                    Total Fees
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-bold">
                  {formatCurrency(
                    project.financials.totalFees,
                    project.financials.currency,
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg py-0">
              <CardContent className="p-3 sm:p-5">
                <div className="flex sm:items-center flex-col sm:flex-row gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">
                    Amount Paid
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-bold text-green-600">
                  {formatCurrency(
                    project.financials.amountPaid,
                    project.financials.currency,
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg py-0">
              <CardContent className="p-3 sm:p-5">
                <div className="flex sm:items-center flex-col sm:flex-row gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">
                    Outstanding
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-bold text-amber-600">
                  {formatCurrency(
                    project.financials.outstanding,
                    project.financials.currency,
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg py-0">
              <CardContent className="p-3 sm:p-5">
                <div className="flex sm:items-center flex-col sm:flex-row gap-3 mb-3">
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-zinc-600" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">
                    Last Payment
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-bold">
                  {formatCurrency(
                    project.financials.lastPaidAmount,
                    project.financials.currency,
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(project.financials.lastPaidDate)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 gap-8">
            {/* Left Column - Media & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Media Gallery */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Project Progress Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <ProjectMediaGallery
                    media={project.media}
                    projectTitle={project.projectTitle}
                  />
                </CardContent>
              </Card>

              {/* Project Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Project Summary
                    </h4>
                    <p className="text-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Project Location
                    </h4>
                    <div className="flex items-start gap-3 bg-zinc-50 rounded-xl p-4">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {project.location.address}
                        </p>
                        <p className="text-muted-foreground">
                          {project.location.city}, {project.location.state},{" "}
                          {project.location.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  {project.specifications && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                        Project Specifications
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.specifications.landSize && (
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                            <Ruler className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Land Size
                              </p>
                              <p className="font-semibold">
                                {project.specifications.landSize}
                              </p>
                            </div>
                          </div>
                        )}
                        {project.specifications.buildingType && (
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                            <Building2 className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Building Type
                              </p>
                              <p className="font-semibold">
                                {project.specifications.buildingType}
                              </p>
                            </div>
                          </div>
                        )}
                        {project.specifications.bedrooms && (
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                            <BedDouble className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Bedrooms
                              </p>
                              <p className="font-semibold">
                                {project.specifications.bedrooms}
                              </p>
                            </div>
                          </div>
                        )}
                        {project.specifications.bathrooms && (
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                            <Bath className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Bathrooms
                              </p>
                              <p className="font-semibold">
                                {project.specifications.bathrooms}
                              </p>
                            </div>
                          </div>
                        )}
                        {project.specifications.floors && (
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                            <Layers className="h-5 w-5 text-zinc-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Floors
                              </p>
                              <p className="font-semibold">
                                {project.specifications.floors}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Project Timeline
                    </h4>
                    <div className="flex items-center gap-6 bg-zinc-50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-zinc-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Start Date
                          </p>
                          <p className="font-semibold">
                            {formatDate(project.startDate)}
                          </p>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-zinc-200" />
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Est. Completion
                          </p>
                          <p className="font-semibold">
                            {formatDate(project.estimatedCompletion)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Camera Feed Link */}
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Live Camera Feed
                    </h4>
                    <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-4">
                      {project.cameraFeedLink ? (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100/50">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Live Stream Available</p>
                            <a
                              href={project.cameraFeedLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                              View Camera Feed
                              <ArrowLeft className="h-3 w-3 rotate-[135deg]" />
                            </a>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p className="font-medium text-muted-foreground">N/A</p>
                          <p className="text-sm text-muted-foreground">No camera feed available for this project</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Milestones & Manager */}
            <div className="space-y-8">
              {/* Project Manager */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Your Project Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border/20 bg-zinc-100">
                      <Image
                        src={
                          project.projectManager.image
                            ? urlFor(project.projectManager.image)
                                .width(100)
                                .height(100)
                                .url()
                            : "/placeholder-user.jpg"
                        }
                        alt={project.projectManager.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {project.projectManager.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Project Manager
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${project.projectManager.phone}`}
                      className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-zinc-500" />
                      <span className="text-sm">
                        {project.projectManager.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${project.projectManager.email}`}
                      className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-zinc-500" />
                      <span className="text-sm">
                        {project.projectManager.email}
                      </span>
                    </a>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <a href={`https://wa.me/${project.projectManager.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {project.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="relative pl-8 pb-6 last:pb-0">
                        {/* Connector Line */}
                        {index < project.milestones.length - 1 && (
                          <div
                            className={`absolute left-[11px] top-6 w-0.5 h-full ${
                              milestone.completed
                                ? "bg-green-500"
                                : "bg-zinc-200"
                            }`}
                          />
                        )}
                        {/* Icon */}
                        <div className="absolute left-0 top-0">
                          {milestone.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-zinc-300" />
                          )}
                        </div>
                        {/* Content */}
                        <div>
                          <p
                            className={`font-medium ${
                              milestone.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {milestone.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(milestone.date)}
                          </p>
                          {milestone.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {milestone.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-zinc-900 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Have questions about your project? We're here to help.
                  </p>
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-zinc-700 text-white hover:text-white hoverbg-zinc-800 bg-transparent"
                    >
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Link href="/#faq">View FAQs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
