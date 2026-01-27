import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#333E48] text-white pt-16 pb-8 border-t border-primary/20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="text-2xl font-bold tracking-tight">AMROD</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Africa's leading supplier of promotional products, corporate clothing, and gifts. We offer world-class branding solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">Products</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-white hover:translate-x-1 transition-all inline-block">Careers</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Categories</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/category/gifts" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gifting</Link></li>
              <li><Link href="/category/clothing" className="hover:text-white hover:translate-x-1 transition-all inline-block">Clothing</Link></li>
              <li><Link href="/category/headwear" className="hover:text-white hover:translate-x-1 transition-all inline-block">Headwear</Link></li>
              <li><Link href="/category/workwear" className="hover:text-white hover:translate-x-1 transition-all inline-block">Workwear</Link></li>
              <li><Link href="/category/display" className="hover:text-white hover:translate-x-1 transition-all inline-block">Display</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Commercial Road,<br/>Johannesburg, 2000<br/>South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+27 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sales@amrod.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Amrod Corporate. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
