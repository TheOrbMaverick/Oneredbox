"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NGRegistrationNumber, USRegistrationNumber } from "@/constants/info";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/book-service", label: "Book Service" },
  { href: "/for-sale", label: "For sale" },
  { href: "/contact", label: "Contact us" },
];

interface HeaderContentProps {
  hasSession: boolean;
}

export function HeaderContent({ hasSession }: HeaderContentProps) {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                  "text-base uppercase font-semibold hover:scale-105 transitionall duration-500 ease-in-out transition-colors hover:text-red-500 hover:underline underline-offset-4",
                  isScrolled ? "text-white" : "text-primary-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button / User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-4 font-medium text-base",
                isScrolled ? "text-white" : "text-primary-foreground/80",
              )}
            >
              <div className="flex flex-col">
                <div>
                  <span className="font-semibold">US</span> -{" "}
                  {USRegistrationNumber}
                </div>
                <div>
                  <span className="font-semibold">NG</span> -{" "}
                  {NGRegistrationNumber}
                </div>
              </div>
            </div>

            {hasSession ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex relative items-center border-2 border-slate-600  gap-1 rounded-full px-1 py-1 ">
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-red-500/20 hover:border-red-500/50 transition-colors focus:ring-0"
                    >
                      <div className="flex items-center justify-center w-full h-full bg-zinc-800 text-white font-bold">
                        {/* Placeholder Avatar */}
                        <Image
                          src="/person.png" // Using generic placeholder if no user image
                          alt="User"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    </Button>
                    <div className=" ">
                      <ChevronDown className="h-5 w-5 text-slate-100" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild className="hover:bg-slate-200">
                    <a
                      href="/dashboard"
                      className="cursor-pointer hover:bg-slate-200"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-slate-200 font-semibold text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-red-500 rounded-lg text-white hover:bg-red-600 font-semibold hover:scale-105"
              >
                <Link href="/dashboard">My Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors text-primary-foreground",
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

            {hasSession ? (
              <>
                <Button
                  asChild
                  className="bg-red-500 text-white hover:bg-red-700 w-full mt-2"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="bg-red-500 text-white hover:bg-red-700 w-full mt-2"
              >
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Dashboard
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
