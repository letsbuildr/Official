import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-linear-to-r from-[#0B1E36] via-[#1A2E4F] to-[#0B1E36] shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="MyBrand Logo"
            width={115}
            height={115}
            className="object-contain"
          />
        </div>

        {/* Middle: Nav Links */}
        <ul className="flex gap-10 text-[#FFFFFF] font-medium absolute left-1/2 transform -translate-x-1/2">
          <li>
            <a href="#home" className="hover:text-pink-600 transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-pink-600 transition-colors">
              Products
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-pink-600 transition-colors"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-pink-600 transition-colors"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-pink-600 transition-colors"
            >
              About
            </a>
          </li>
        </ul>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-white  rounded-md hover:bg-white hover:text-[#0B1E36] hover:scale-105 transition-all duration-300">
            Contact
          </button>

          <button className="px-5 py-2 bg-[#0077B6] text-white rounded-md hover:bg-[#0B1E36] transition">
            Get a Quote
          </button>
        </div>
      </nav>
    </header>
  );
}
