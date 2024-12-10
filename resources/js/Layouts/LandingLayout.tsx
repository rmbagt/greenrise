import { Link, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { PropsWithChildren, ReactNode, useState, useEffect } from "react";
import { User } from "@/types";
import { Facebook, Instagram, Linkedin, Twitter, Menu, X } from "lucide-react";
import { Input } from "@/Components/ui/input";

export default function LandingLayout({
  header,
  children,
  auth,
}: PropsWithChildren<{
  header?: ReactNode;
  auth: {
    user: User;
  };
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    ["Home", "/#home"],
    ["Event", "/#event"],
    ["Donation", "/#donation"],
    ["Contact", "/#contact"],
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head title="Landing" />
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-teal-600 !scroll-smooth">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-black/40 shadow-lg backdrop-blur-md "
              : "bg-transparent backdrop-blur-md"
          } ${isMenuOpen ? "bg-black" : ""}`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-white text-2xl font-bold">
                GreenRise
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map(([title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-white hover:text-white/80"
                  >
                    {title}
                  </Link>
                ))}

                {auth.user ? (
                  <Button variant="secondary" asChild>
                    <Link href={route("dashboard")}>Dashboard</Link>
                  </Button>
                ) : (
                  <Button variant="secondary" asChild>
                    <Link href={route("login")}>Login</Link>
                  </Button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden ">
              <div className="container mx-auto px-4 py-4">
                {navItems.map(([title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-white hover:text-white/80 py-2 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {title}
                  </Link>
                ))}
                {auth.user ? (
                  <Button variant="secondary" asChild className="w-full mt-4">
                    <Link href={route("dashboard")}>Dashboard</Link>
                  </Button>
                ) : (
                  <Button variant="secondary" asChild className="w-full mt-4">
                    <Link href={route("login")}>Login</Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About GreenRise</h3>
                <p className="text-sm text-gray-400">
                  GreenRise is dedicated to creating a sustainable future
                  through community engagement and environmental initiatives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {navItems.map(([title, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Stay updated with our latest news and events.
                </p>
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} GreenRise. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
