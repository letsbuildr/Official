// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-6">
//       <div className="container mx-auto text-center text-sm">
//         <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";

// Note: For real social media icons, you would use a library like 'lucide-react' or 'react-icons'
// The 'className' for social links is provided below for styling a placeholder.

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define your footer data structure
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Automation Services", href: "/automation-services" },
        { label: "Web Development", href: "/web-development" },
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
          {/* Column 1: Logo and Socials (Takes 2 columns on small screens, 1 on md+) */}
          <div className="col-span-2 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Bomcel Digital
            </h2>
            <p className="text-gray-400 mb-6 max-w-xs">
              We streamline your business processes through smart automation and
              integrations.
            </p>
            <div className="flex space-x-4">
              {/* Replace these spans with actual icons (e.g., from Lucide or React Icons) */}
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl"
              >
                {/* Example: <Twitter className="w-6 h-6" /> */}
                <span>🐦</span>
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl"
              >
                <span>🔗</span>
              </Link>
              <Link
                href="mailto:info@bomcel.com"
                aria-label="Email"
                className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl"
              >
                <span>📧</span>
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
