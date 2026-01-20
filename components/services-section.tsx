import { Building, Home, Factory, Wrench, HardHat, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesWeOffer } from "@/constants/contents";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider border shadow-[0px_0px_4px_rgba(0,0,0,0.4)] -2 px-4 py-2 rounded-lg border-accent bg-accent/10">
            What We Offer
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-[110%] mt-4 mb-6 text-balance">
            <span className="text-accent_ _underline">Comprehensive</span>{" "}
            Construction Services
          </h2>
          <p className="text-gray-700 text-shadow-[0px_0px_12px_rgba(0,0,0,0.25)] text-lg lg:text-2xl">
            From groundbreaking to grand opening, we provide end-to-end
            construction solutions tailored to your specific needs and vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {servicesWeOffer.map((service) => (
            <div
              key={service.title}
              className="group bg-card p-4 rounded-3xl shadow-md border border-transparent hover:border hoverborder-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-2 bg-accent/10 rounded-lg w-fit mb-4 transition-colors">
                <div className="p-2 bg-accent/20 rounded-md">
                  <service.icon className="h-5 w-5 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-2">
                {service.description}
              </p>
              <ul className="space-y-1">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-accent border-2 rounded-lg border-accent text-white font-semibold hover:bg-transparent hover:text-accent transition-all duration-500"
          >
            Explore All Services
          </Button>
        </div> */}
      </div>
    </section>
  );
}
