import Link from "next/link";
import { Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand & About */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="/logo.png"
              alt="PhilmZone Logo"
              className="h-14 w-14 object-cover"
            />

            <span className="text-white font-bold text-2xl tracking-wide">
              PhilmZone
            </span>
          </div>

          <h2 className="text-white text-lg font-semibold mb-2">
            About Us
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            <strong>
              Welcome to <span className="text-white">PhilmZone</span>!
            </strong>
            <br />
            <br />

            Your go-to destination for everything movies. Discover the latest
            releases, watch trailers, read reviews, and explore the world of
            cinema. Whether you're into action, comedy, drama, or indie gems,
            we've got something for every film lover. Dive in and enjoy the
            journey!
          </p>
        </div>

        {/* Company */}
    <div>
          <h4 className="text-white font-semibold mb-3">
            Company
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-red-500 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/team" className="hover:text-red-500 transition">
                Team
              </Link>
            </li>

            <li>
              <Link href="/blog" className="hover:text-red-500 transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
       <div>
          <h4 className="text-white font-semibold mb-3">
            Support
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/help" className="hover:text-red-500 transition">
                Help Center
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-red-500 transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/privacy" className="hover:text-red-500 transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-red-500 transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-3">
            Follow Us
          </h4>

          <div className="flex flex-wrap gap-4 text-sm">

            <a
              href="https://www.instagram.com/filmzone_____/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-red-500 transition"
            >
              Facebook
            </a>

            <a
              href="#"
              className="hover:text-red-500 transition"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-red-500 transition"
            >
              YouTube
            </a>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-4 px-4 text-center text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">

        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Film className="h-4 w-4 text-red-500" />

          <span>
            © {new Date().getFullYear()} PhilmZone. All rights reserved.
          </span>
        </div>

        <div className="space-x-4 text-sm">
          <Link
            href="/AdminLoginPage"
            className="hover:text-red-500 transition"
          >
            Admin
          </Link>

          <Link
            href="/legal"
            className="hover:text-red-500 transition"
          >
            Legal
          </Link>

          <Link
            href="/cookies"
            className="hover:text-red-500 transition"
          >
            Cookies
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

