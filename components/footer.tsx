import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Stamp,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  address,
  email,
  NGPhone,
  NGRegistrationNumber,
  USPhone,
  USRegistrationNumber,
} from "@/constants/info";
import { socialLinks } from "@/constants/links";
import { footerDescription } from "@/constants/contents";

const footerLinks = {
  company: [
    { label: "Our Services", href: "/#services" },
    { label: "About Us", href: "/#about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Portfolio", href: "/#portfolio-gallery" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Section */}

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 items-center  mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src={"/images/oneLogo.png"}
                  width={60}
                  height={60}
                  alt="Logo"
                />
              </Link>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {footerDescription}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="h-5 w-5 text-white/80" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="h-5 w-5 text-white/80" />
                <span>{USPhone}</span>
                <span>{NGPhone}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="h-5 w-5 text-white/80" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Building2 className="h-5 w-5 text-white/80" />
                <p className="text-sm flex items-center gap-2">
                  {USRegistrationNumber}{" "}
                  <span className="font-semibold">- US</span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  {NGRegistrationNumber}{" "}
                  <span className="font-semibold">- NG</span>
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start sm:flex-col gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center gap-2 hover:text-red-500 transition-colors"
              >
                <span className="p-2 inline-flex rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors">
                  <social.icon className="h-5 w-5 text-inherit" />
                </span>
                <span className="hidden sm:block">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col-reverse items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © 2025 Oneredbox Construction Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
