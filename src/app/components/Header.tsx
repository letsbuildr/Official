"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-pink-500" : "text-white";

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0B1E36] shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="MyBrand Logo"
            width={115}
            height={115}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* ✅ DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 font-medium">
          <NavItem href="/" label="Home" active={pathname} />
          {/* SERVICES DROPDOWN */}
          <li
            className="relative text-white"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-pink-600 transition">
              Services <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white shadow-md rounded-md p-3 mt-2 w-44 text-black z-20">
                <Link
                  href="/services/web-development"
                  className="block py-2 hover:text-pink-600"
                >
                  Web Development
                </Link>
                <Link
                  href="/services/automation-services"
                  className="block py-2 hover:text-pink-600"
                >
                  Automation Services
                </Link>
                <Link
                  href="/services/data-analysis/students"
                  className="block py-2 hover:text-pink-600"
                >
                  Data Analysis for Students
                </Link>
                <Link
                  href="/services/data-analysis/business"
                  className="block py-2 hover:text-pink-600"
                >
                  Data Analysis for Business
                </Link>
              </div>
            )}
          </li>
          <NavItem href="/products" label="Products" active={pathname} />
          <NavItem href="/portfolio" label="Portfolio" active={pathname} />
          <NavItem href="/consultation" label="Book Consultation" active={pathname} />
          <NavItem href="/about" label="About" active={pathname} />
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <button className="px-5 py-2 text-white rounded-md hover:bg-white hover:text-[#0B1E36] hover:scale-105 transition-all duration-300 cursor-pointer">
              Contact
            </button>
          </Link>

          <button className="px-5 py-2 bg-[#0077B6] text-white rounded-md border border-transparent hover:border-[#0077B6] hover:bg-transparent hover:text-[#0077B6] transition cursor-pointer">
            Get a Quote
          </button>
        </div>

        {/* ✅ MOBILE MENU ICON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* ✅ MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0B1E36] p-6 z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="text-white absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>

        <ul className="flex flex-col gap-6 text-white mt-10 text-lg">
          {/* Mobile Dropdown */}
          <li>
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Services
              <ChevronDown
                className={`${dropdownOpen ? "rotate-180" : ""} transition`}
              />
            </button>

            {dropdownOpen && (
              <div className="mt-2 ml-4 flex flex-col gap-3 text-base">
                <Link href="/services/web-development" onClick={() => setMenuOpen(false)}>
                  Web Development
                </Link>
                <Link href="/services/automation-services" onClick={() => setMenuOpen(false)}>
                  Automation Services
                </Link>
                <Link
                  href="/services/data-analysis/students"
                  onClick={() => setMenuOpen(false)}
                >
                  Data Analysis
                </Link>
              </div>
            )}
          </li>

          <MobileItem href="/products" label="Products" close={setMenuOpen} />
          <MobileItem href="/portfolio" label="Portfolio" close={setMenuOpen} />
          <MobileItem href="/consultation" label="Book Consultation" close={setMenuOpen} />
          <MobileItem href="/about" label="About" close={setMenuOpen} />
          <MobileItem href="/contact" label="Contact" close={setMenuOpen} />

          <button className="mt-4 px-5 py-2 bg-[#0077B6] text-white rounded-md hover:bg-[#0B1E36] transition">
            Get a Quote
          </button>
        </ul>
      </div>
    </header>
  );
}

/* ✅ Desktop Nav Item with Smooth Underline Animation */
function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: string;
}) {
  const isActive = active === href;

  return (
    <li className="relative group text-white">
      <Link
        href={href}
        className={`transition ${
          isActive ? "text-pink-500" : "hover:text-pink-600"
        }`}
      >
        {label}
      </Link>

      {/* Smooth underline */}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-pink-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </li>
  );
}

/* ✅ Dropdown Item */
function NavDropItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block py-2 hover:text-pink-600 transition">
      {label}
    </Link>
  );
}

/* ✅ Mobile Nav Items */
function MobileItem({
  href,
  label,
  close,
}: {
  href: string;
  label: string;
  close: (value: boolean) => void;
}) {
  return (
    <li>
      <Link href={href} onClick={() => close(false)}>
        {label}
      </Link>
    </li>
  );
}
