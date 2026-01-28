import { Link, useLocation } from "wouter";
import { Search, User, ShoppingCart, Menu, Phone, Mail, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminLoginModal } from "@/components/AdminLoginModal";

export function Header() {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { isAdmin } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navLinks = [
    { name: "Gifting", href: "/category/gifts" },
    { name: "Clothing", href: "/category/clothing" },
    { name: "Headwear", href: "/category/headwear" },
    { name: "Workwear", href: "/category/workwear" },
    { name: "Display", href: "/category/display" },
    { name: "Custom", href: "/category/custom-products" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-white shadow-sm z-50 relative">
        <div className="bg-slate-50 border-b border-gray-100 py-2 text-xs text-gray-500">
          <div className="container-custom flex justify-between items-center">
            <div className="flex space-x-6">
              <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                <Phone className="w-3 h-3" /> +27 11 123 4567
              </span>
              <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                <Mail className="w-3 h-3" /> sales@amrod.co.za
              </span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">About Us</a>
              <a href="#" className="hover:text-primary">Contact</a>
              <a href="#" className="hover:text-primary">Blog</a>
            </div>
          </div>
        </div>

        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex-shrink-0 mr-8 cursor-pointer">
              <div className="flex items-center gap-3">
                <img src="/images/wos-apex-logo.jpg" alt="WOS APEX" className="h-20 w-auto rounded" />
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 w-full max-w-2xl relative">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products (e.g. 'Pen', 'T-shirt', 'Mug')..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-gray-700 placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                  data-testid="button-search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => isAdmin ? setLocation("/admin") : setShowAdminLogin(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                title={isAdmin ? "Admin Dashboard" : "Admin Login"}
                data-testid="button-admin"
              >
                <Shield className={`w-5 h-5 ${isAdmin ? "text-primary" : ""}`} />
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-gray-50 rounded-xl h-auto py-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {user.firstName?.[0] || user.email?.[0] || "U"}
                      </div>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 leading-none">Hello, {user.firstName || "User"}</p>
                        <p className="text-xs text-gray-500 mt-1">My Account</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Favorites</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <div className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer group">
                    <div className="p-2 rounded-full bg-gray-100 group-hover:bg-primary/10 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="hidden md:block">
                      <span className="block text-xs text-gray-500">Account</span>
                      <span className="block text-sm font-semibold">Sign In</span>
                    </div>
                  </div>
                </Link>
              )}

              <Link href="/cart">
                <div className="relative group cursor-pointer" data-testid="button-cart">
                  <div className="p-2 rounded-full bg-gray-100 group-hover:bg-primary/10 text-gray-600 group-hover:text-primary transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white" data-testid="cart-count">
                      {totalItems}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <nav className="bg-[#26BFF1] text-white shadow-lg shadow-primary/10">
          <div className="container-custom">
            <div className="flex items-center overflow-x-auto no-scrollbar">
              <div className="lg:hidden p-4">
                <Menu className="w-6 h-6" />
              </div>
              
              <div className="hidden lg:flex w-full">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <div className={`
                      px-6 py-4 text-sm font-bold uppercase tracking-wide cursor-pointer border-b-4 border-transparent 
                      hover:bg-white/10 hover:border-white transition-all duration-200 whitespace-nowrap
                      ${location.startsWith(link.href) ? 'bg-white/20 border-white' : ''}
                    `}>
                      {link.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AdminLoginModal open={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </>
  );
}
