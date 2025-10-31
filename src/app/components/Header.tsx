import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0B1E36] shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="MyBrand Logo"
            width={75}
            height={75}
            className="object-contain"
          />
        </div>

        {/* Middle: Nav Links */}
        <ul className="flex gap-10 text-[#FFFFFF] font-medium absolute left-1/2 transform -translate-x-1/2">
          <li>
            <a href="#home" className="hover:text-pink-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-pink-600 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-pink-600 transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-pink-600 transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-pink-600 border border-pink-600 rounded-full hover:bg-pink-50 transition">
            Login
          </button>
          <button className="px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
