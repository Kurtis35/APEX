import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/wos-apex-logo.jpg" alt="WOS APEX" className="h-12 w-auto rounded-lg" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Africa's leading supplier of promotional products, corporate clothing, and gifts. World-class branding solutions for your business.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "#" },
                { label: "Products", href: "/category/gifts" },
                { label: "Contact Us", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:pl-2 transition-all inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Categories</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Gifts", href: "/category/gifts" },
                { label: "Clothing", href: "/category/clothing" },
                { label: "Headwear", href: "/category/headwear" },
                { label: "Workwear", href: "/category/workwear" },
                { label: "Display", href: "/category/display" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white hover:pl-2 transition-all inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="pt-2">123 Commercial Road,<br/>Johannesburg, 2000</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <a href="tel:+27111234567" className="hover:text-white transition-colors">+27 11 123 4567</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a href="mailto:sales@amrod.co.za" className="hover:text-white transition-colors">sales@amrod.co.za</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} WOS APEX. All rights reserved.</p>
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
