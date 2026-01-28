import { Link, useLocation } from "wouter";
import { Search, User, ShoppingCart, Menu, X, Phone, Mail, LogOut, Shield, ChevronDown } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navLinks = [
    { name: "Gifts", href: "/category/gifts" },
    { name: "Clothing", href: "/category/clothing" },
    { name: "Headwear", href: "/category/headwear" },
    { name: "Workwear", href: "/category/workwear" },
    { name: "Display", href: "/category/display" },
    { name: "Custom", href: "/category/custom-products" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="hidden md:block bg-gradient-to-r from-slate-900 to-slate-800 text-white/90 py-2 text-xs">
          <div className="container-custom flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href="tel:+27111234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3 h-3" /> +27 11 123 4567
              </a>
              <a href="mailto:sales@amrod.co.za" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3 h-3" /> sales@amrod.co.za
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Help</a>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between gap-4">
              <button 
                className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex-shrink-0 cursor-pointer">
                <img src="/images/wos-apex-logo.jpg" alt="WOS APEX" className="h-12 md:h-16 w-auto rounded-lg shadow-sm" />
              </Link>

              <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    data-testid="button-search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => isAdmin ? setLocation("/admin") : setShowAdminLogin(true)}
                  className="hidden sm:flex p-2.5 rounded-xl bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary transition-all"
                  title={isAdmin ? "Admin Dashboard" : "Admin Login"}
                  data-testid="button-admin"
                >
                  <Shield className={`w-5 h-5 ${isAdmin ? "text-primary" : ""}`} />
                </button>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-3 py-2 h-auto rounded-xl hover:bg-gray-100">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                          {user.firstName?.[0] || user.email?.[0] || "U"}
                        </div>
                        <div className="text-left hidden lg:block">
                          <p className="text-sm font-semibold leading-none">{user.firstName || "User"}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">My Account</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
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
                    <Button variant="ghost" className="hidden sm:flex items-center gap-2 px-3 py-2 h-auto rounded-xl hover:bg-gray-100" data-testid="button-signin">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left hidden lg:block">
                        <p className="text-xs text-muted-foreground">Account</p>
                        <p className="text-sm font-semibold leading-none">Sign In</p>
                      </div>
                    </Button>
                  </Link>
                )}

                <Link href="/cart">
                  <div className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary transition-all cursor-pointer group" data-testid="button-cart">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg" data-testid="cart-count">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>

            <form onSubmit={handleSearch} className="md:hidden mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <nav className="hidden lg:block bg-gradient-to-r from-primary to-cyan-400 text-white">
          <div className="container-custom">
            <div className="flex items-center justify-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className={`
                    px-6 py-3.5 text-sm font-semibold tracking-wide cursor-pointer
                    hover:bg-white/20 transition-all duration-200 whitespace-nowrap
                    ${location.startsWith(link.href) ? 'bg-white/25' : ''}
                  `}>
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] md:top-[104px] bg-white z-50 overflow-y-auto animate-fade-in">
            <nav className="container-custom py-4">
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <Link key={link.name} href={link.href}>
                    <div 
                      className={`
                        px-4 py-4 text-base font-medium rounded-xl cursor-pointer
                        transition-all duration-200
                        ${location.startsWith(link.href) 
                          ? 'bg-primary text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                {!user && (
                  <Link href="/auth">
                    <Button className="w-full h-12 text-base font-semibold rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                      Sign In / Register
                    </Button>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    isAdmin ? setLocation("/admin") : setShowAdminLogin(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium"
                >
                  <Shield className="w-5 h-5" />
                  {isAdmin ? "Admin Dashboard" : "Admin Login"}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <AdminLoginModal open={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </>
  );
}
