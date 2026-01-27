import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, UserCheck, Briefcase } from "lucide-react";

export default function AuthPage() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Left Side - Sales Pitch */}
            <div className="bg-[#333E48] text-white p-12 flex flex-col justify-center relative overflow-hidden">
               {/* Pattern overlay */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

               <div className="relative z-10">
                 <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 text-primary backdrop-blur-sm border border-primary/30">
                   <Briefcase className="w-8 h-8" />
                 </div>
                 
                 <h2 className="text-3xl font-extrabold mb-6">Become a Reseller</h2>
                 <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                   Join Africa's leading promotional products supplier network. Access wholesale pricing, live stock levels, and marketing tools.
                 </p>
                 
                 <ul className="space-y-4">
                   {[
                     "Exclusive wholesale pricing",
                     "Real-time stock availability",
                     "Custom branding services",
                     "Marketing resource library"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 font-medium">
                       <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                         <UserCheck className="w-3 h-3" />
                       </div>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

            {/* Right Side - Login Action */}
            <div className="p-12 flex flex-col justify-center items-center text-center bg-white">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-6">
                 <ShieldCheck className="w-10 h-10" />
               </div>

               <h1 className="text-3xl font-extrabold text-[#333E48] mb-2">Welcome Back</h1>
               <p className="text-gray-500 mb-8 max-w-sm">
                 Securely sign in to your reseller portal to manage orders and quotes.
               </p>

               <div className="w-full max-w-sm space-y-4">
                 <Button 
                   onClick={handleLogin}
                   className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                 >
                   Sign In / Register <ArrowRight className="ml-2 w-5 h-5" />
                 </Button>
                 
                 <p className="text-xs text-gray-400 mt-6">
                   By signing in, you agree to our Terms of Service and Privacy Policy.
                   Amrod is a trade-only supplier.
                 </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
