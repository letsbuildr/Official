import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services/web-development" },
        { label: "Automation Services", href: "/services/automation-services" },
        {
          label: "Data Analysis for Students",
          href: "/services/data-analysis/students",
        },
        {
          label: "Data Analysis for Business",
          href: "/services/data-analysis/business",
        },
        { label: "Pricing Packages", href: "/pricing" },
        { label: "View Case Studies", href: "/case-studies" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Image
                src="/images/logo.png"
                alt="MyBrand Logo"
                width={115}
                height={115}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 max-w-xs mb-10">
              “Empowering businesses with digital presence.”
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                href="tel:+2347070094167"
                aria-label="Phone"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl"
              >
                <span className="flex items-center space-x-4">
                  <FaPhoneAlt />
                  <span>+234 707 009 4167</span>
                </span>
              </Link>
              <Link
                href="mailto:hello@bomcel.com"
                aria-label="Email"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl"
              >
                <span className="flex items-center space-x-4">
                  <FaEnvelope />
                  <span>hello@bomcel.com</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Render Link Columns (Automatically takes 1 column each) */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Line */}
        <div className="pt-8 text-center text-sm text-gray-500">
          &copy; {currentYear} Bomcel Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
