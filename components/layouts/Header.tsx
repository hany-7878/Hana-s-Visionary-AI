import { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-14">
        {/* Logo */}
        <Link href= "/" className="flex items-center">
          <img src="/logo.png" alt="ImageGen Logo" width={70} height={50} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <Link href="/gallery" className="hover:text-gray-200">Gallery</Link>
          <Link href="/about" className="hover:text-gray-200">About</Link>
          <Link href="/contact" className="hover:text-gray-200">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#3C454F] px-4 py-2 space-y-2">
          <Link href="/" className="block hover:text-gray-200">Home</Link>
          <Link href="/gallery" className="block hover:text-gray-200">Gallery</Link>
          <Link href="/about" className="block hover:text-gray-200">About</Link>
          <Link href="/contact" className="block hover:text-gray-200">Contact</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
