import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Home,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock,
  PauseCircle,
  Building2,
  Map,
  HardHat,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/client-projects-data";
import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const serviceTypeLabels = {
  "land-acquisition": {
    label: "Land Acquisition",
    icon: Map,
    color: "bg-emerald-100 text-emerald-700",
  },
  "building-design": {
    label: "Building Design",
    icon: Building2,
    color: "bg-blue-100 text-blue-700",
  },
  "construction-supervision": {
    label: "Construction Supervision",
    icon: HardHat,
    color: "bg-amber-100 text-amber-700",
  },
};

const statusConfig = {
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  "on-hold": {
    label: "On Hold",
    icon: PauseCircle,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get("dashboard_session")?.value;
  const projectsRes = await client.fetch(
    `*[_type=="client" && _id=="${clientId}"][0]{clientName,"projects":*[_type=="clientProject" && references(^._id)]}`,
    {
      clientId,
    },
  );
  const projects = projectsRes.projects;

  const activeProjects = projects.filter(
    (p: Record<string, any>) => p.status === "in-progress",
  );
  const completedProjects = projects.filter(
    (p: Record<string, any>) => p.status === "completed",
  );

  const totalInvested = projects.reduce(
    (acc: any, p: Record<string, any>) => acc + p.financials.amountPaid,
    0,
  );
  const totalOutstanding = projects.reduce(
    (acc: any, p: Record<string, any>) => acc + p.financials.outstanding,
    0,
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <section className="pt-24 pb-8 lg:pt-28 lg:pb-10 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-zinc-400 mb-1">Welcome back,</p>
              <h1 className="text-3xl lg:text-4xl font-bold">
                {projectsRes.clientName}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="border-zinc-700 bg-white text-gray-900 hover:bg-white"
              >
                <Link href="/book-service">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Link>
              </Button>
              <Button
                asChild
                variant={"outline"}
                className="bg-transparent text-white border-zinc-700 hover:bg-transparent hover:text-white"
              >
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold mt-1">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Projects
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {activeProjects.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Invested
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(totalInvested)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(totalOutstanding)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Projects</h2>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 border-0"
                >
                  {activeProjects.length} active
                </Badge>
              </div>

              {activeProjects.length > 0 ? (
                <div className="space-y-4">
                  {activeProjects.map((project: Record<string, any>) => (
                    <ActiveProjectCard project={project} key={project._id} />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">No active projects</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a new project to see it here.
                    </p>
                    <Button asChild>
                      <Link href="/book-service">
                        <Plus className="mr-2 h-4 w-4" />
                        Start New Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Completed Projects */}
            {completedProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Completed Projects</h2>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 border-0"
                  >
                    {completedProjects.length} completed
                  </Badge>
                </div>

                <div className="space-y-4">
                  {completedProjects.map((project: Record<string, any>) => (
                    <CompletedProjectCard project={project} key={project._id} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 ">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/book-service">
                    <Plus className="mr-3 h-4 w-4 text-red-600" />
                    Start New Project
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/for-sale">
                    <Home className="mr-3 h-4 w-4 text-red-600" />
                    Browse Properties
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/contact">
                    <MessageSquare className="mr-3 h-4 w-4 text-red-600" />
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-none shadow-sm bg-zinc-900 text-white">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">Need Assistance?</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Our team is available to help with any questions about your
                  projects.
                </p>
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-red-700 text-white"
                >
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export type ServiceType =
  | "land-acquisition"
  | "building-design"
  | "construction-supervision";

export type StatusType = "completed" | "in-progress" | "on-hold";

function CompletedProjectCard({ project }: { project: Record<string, any> }) {
  const ServiceIcon =
    serviceTypeLabels[project.serviceType as ServiceType].icon;

  return (
    <Link
      href={`/dashboard/projects/${project._id}`}
      className="cursor-pointer"
    >
      <Card
        key={project.id}
        className="border-none shadow-sm hover:shadow-md cursor-pointer transition-shadow bggreen-50/50 dark:bg-green-950/20"
      >
        <CardContent className="p-5 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-1">
                {project.projectTitle}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <Badge
                  variant="secondary"
                  className={
                    serviceTypeLabels[project.serviceType as ServiceType].color
                  }
                >
                  <ServiceIcon className="h-3 w-3 mr-1" />
                  {serviceTypeLabels[project.serviceType as ServiceType].label}
                </Badge>
                <span>
                  {project.location.city}, {project.location.state}
                </span>
              </div>
            </div>
            <Button asChild size="sm" variant="outline">
              {/* <Link href={`/dashboard/projects/${project._id}`}> */}
              <span>
                View
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
              {/* </Link> */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ActiveProjectCard({ project }: { project: Record<string, any> }) {
  const ServiceIcon =
    serviceTypeLabels[project.serviceType as ServiceType].icon;
  const StatusIcon = statusConfig[project.status as StatusType].icon;

  return (
    <Card
      key={project.id}
      className="border-none shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="relative w-full lg:w-40 h-32 rounded-lg overflow-hidden shrink-0 bg-zinc-100">
            <Image
              src={
                project.media[0].image
                  ? urlFor(project.media[0].image)
                      .width(1000)
                      .height(1000)
                      .url()
                  : "/placeholder.svg?height=200&width=300"
              }
              alt={project.projectTitle}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">
                  {project.projectTitle}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {project.location.city}, {project.location.state}
                  </span>
                </div>
              </div>
              <Badge
                className={statusConfig[project.status as StatusType].color}
                variant="outline"
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig[project.status as StatusType].label}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className={
                  serviceTypeLabels[project.serviceType as ServiceType].color
                }
              >
                <ServiceIcon className="h-3 w-3 mr-1" />
                {serviceTypeLabels[project.serviceType as ServiceType].label}
              </Badge>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {project.completionPercentage}%
                </span>
              </div>
              <Progress value={project.completionPercentage} className="h-2" />
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Est. {formatDate(project.estimatedCompletion)}</span>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Link href={`/dashboard/projects/${project._id}`}>
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
