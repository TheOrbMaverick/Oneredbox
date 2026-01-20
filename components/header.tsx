"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NGPhone, USPhone } from "@/constants/info";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/book-service", label: "Book Service" },
  { href: "/for-sale", label: "For sale" },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-2xl duration-300 bg-primary/50_ bg-linear-to-r from-primary/90 via-primary/60 to-primary/90 shadow-sm borderb border-border",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h16 lg:h20 py-3">
          <Link
            href="/"
            className="flex items-center cursor-pointer [&>div]:roundedsm gap"
          >
            <Image
              src={"/images/oneLogo.png"}
              width={40}
              height={40}
              alt="Logo"
            />
            <span className="text-white font-bold text-xl">
              ONE<span className="text-red-500">RED</span>BOX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex mlauto mr-16 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base uppercase font-semibold hover:scale-105 transitionall duration-500 ease-in-out transition-colors hover:text-accent hover:underline underline-offset-4",
                  isScrolled ? "text-white" : "text-primary-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-4 font-medium text-base",
                isScrolled ? "text-white" : "text-primary-foreground/80",
              )}
            >
              <Phone className="h-5 w-5" />
              <div className="flex flex-col">
                <span>{USPhone}</span>
                <span>{NGPhone}</span>
              </div>
            </div>
            <Button
              asChild
              className="bg-accent rounded-lg text-white hover:bg-accent/90 font-semibold hover:scale-105"
            >
              <Link href="/dashboard">My Dashboard</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors text-primary-foreground",
              // isScrolled ? "text-foreground" : "text-primary-foreground"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground fontmedium py-2 uppercase font-semibold hover:bg-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-accent text-white hover:bg-red-700 w-full mt-2"
            >
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Dashboard
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
