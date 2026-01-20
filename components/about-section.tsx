import { aboutUs } from "@/constants/contents";
import { Building2, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "150+", label: "Expert Team Members" },
  { icon: Award, value: "40+", label: "Years of Excellence" },
  { icon: Clock, value: "98%", label: "On-Time Delivery" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center">
            <div className="text-accent text-center font-semibold text-sm uppercase tracking-wider">
              About Our Company
            </div>
            <h2 className="text-3xl lg:text-5xl text-center font-bold text-foreground mt-4 mb-6 leading-tight text-balance">
              {aboutUs.header}
            </h2>
            <div className="space-y-4 text-muted-foreground text-shadow-[0px_0px_12px_rgba(0,0,0,0.25)] text-lg leading-relaxed">
              <p>{aboutUs.description}</p>
              {/* <p>
                We combine traditional craftsmanship with cutting-edge technology to bring your vision to life. Every
                project we undertake is approached with meticulous attention to detail, ensuring that the final result
                exceeds expectations.
              </p> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center md:items-start gap-2 lg:gap-4"
                >
                  <div className="p-3 bg-gray-200 rounded-lg">
                    <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-accent" />
                  </div>
                  <div className=" text-left">
                    <p className="text-2xl  text-left lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src="/construction-team-working-on-site-with-helmets.jpg"
                    alt="Construction team at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/modern-building-architecture-exterior.jpg"
                    alt="Modern building exterior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt8">
                <div className="aspect-[4/6] rounded-lg overflow-hidden">
                  <img
                    src="/skyscraper-construction-with-crane.jpg"
                    alt="Skyscraper under construction"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
