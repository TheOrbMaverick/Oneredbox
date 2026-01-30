import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  email,
  NGPhone,
  NGRegistrationNumber,
  USPhone,
  USRegistrationNumber,
} from "@/constants/info";
import {
  Building2,
  Mail,
  MailIcon,
  MapPinIcon,
  Phone,
  PhoneIcon,
  Stamp,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

const faqs = [
  {
    question: "How long does a typical construction project take?",
    answer:
      "Project timelines vary based on scope and complexity. A residential home typically takes 8-12 months, while commercial projects can range from 12-24 months. During our initial consultation, we provide a detailed timeline tailored to your specific project requirements.",
  },
  {
    question: "What is your project management approach?",
    answer:
      "We use a comprehensive project management system that includes dedicated project managers, regular progress updates, transparent budget tracking, and open communication channels. Clients receive weekly reports and have access to our online portal for real-time project status.",
  },
  {
    question: "Do you handle permits and regulatory compliance?",
    answer:
      "Yes, we manage all aspects of permits and regulatory compliance. Our team has extensive experience navigating local building codes, zoning requirements, and environmental regulations. We handle all paperwork and inspections to ensure your project meets all legal requirements.",
  },
  {
    question: "What types of warranties do you offer?",
    answer:
      "We provide a comprehensive warranty package that includes a 1-year workmanship warranty on all labor, manufacturer warranties on materials and equipment (typically 5-25 years depending on the product), and a 10-year structural warranty on major construction elements.",
  },
  {
    question: "Can you work with our existing architects and designers?",
    answer:
      "Absolutely. We frequently collaborate with external architects, designers, and consultants. Our team is experienced in integrating seamlessly with existing project teams while maintaining clear communication and coordination throughout the construction process.",
  },
  {
    question: "How do you handle changes during construction?",
    answer:
      "We understand that changes may arise during construction. Our change order process is transparent and efficient. Any modifications are documented, priced, and approved by you before work proceeds. We also proactively identify potential issues and suggest alternatives to minimize costly changes.",
  },
  // {
  //   question: "What safety measures do you implement on construction sites?",
  //   answer:
  //     "Safety is our top priority. We maintain strict OSHA compliance, conduct regular safety training for all workers, perform daily site inspections, and implement comprehensive safety protocols. Our safety record consistently exceeds industry standards.",
  // },
  // {
  //   question: "How do I get started with Oneredbox Construction?",
  //   answer:
  //     "Getting started is simple. Contact us to schedule a free consultation where we'll discuss your project vision, requirements, and budget. We'll then provide a detailed proposal including scope, timeline, and cost estimate. Once approved, we move into the design and planning phase.",
  // },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Header */}
          <div>
            <span className="text-red-500 font-semibold text-lg uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have questions about our construction services? Find answers to
              the most common questions below. If you need more information,
              don't hesitate to contact us.
            </p>

            <div className="p-6 bg-card shadow-[0px_0px_14px_rgba(0,0,0,0.1)] rounded-2xl border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team is ready to help you with any questions about your
                project.
              </p>
              <div className="">
                <p className="font-semibold">Reach Out:</p>
                <div className="mt-2 flex flex-col gap-3">
                  <Link
                    href="mailto:info@oneredbox.com"
                    className="flex gap-2 text-lg items-center "
                  >
                    <Mail className=" size-5 mt-1" />
                    <span>{email}</span>
                  </Link>
<Separator className="" />
                  <div className="flex items-center gap-2 md:textlg">
                    <Phone className="size-5" />
                    <div className="flex flexcol gap-3">
                      <a href="tel:5551234567">{USPhone}</a>
                      <a href="tel:2347012345678">{NGPhone}</a>
                    </div>
                  </div>

<Separator/>
                  <div className="flex items-center gap-3 ">
                    <Building2 className="size-5" />
                    <div className="flex gap-4">
                      <p className="textsm flex items-center gap-2">
                        {USRegistrationNumber}{" "}
                        <span className="font-semibold">- US</span>
                      </p>
                      <p className="textsm flex items-center gap-2">
                        {NGRegistrationNumber}{" "}
                        <span className="font-semibold">- NG</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <a
                href="tel:5551234567"
                className="inline-flex items-center text-accent font-medium hover:underline"
              >
                Call us at (555) 123-4567
              </a> */}
            </div>
          </div>

          {/* Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white shadow-md border border-border rounded-xl px-6 data-[state=open]:border-red-500/50"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-red-500 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
