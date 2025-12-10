import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-4">
        {/* App Name */}
        <h1 className="text-lg sm:text-xl font-semibold">Hana's Visionary AI</h1>

        {/* Copyright */}
        <p className="text-sm sm:text-base text-gray-400">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
