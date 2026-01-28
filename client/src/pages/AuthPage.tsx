import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Check, Package, Truck, Headphones } from "lucide-react";

export default function AuthPage() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const benefits = [
    { icon: Package, text: "Access to 16,000+ products" },
    { icon: Truck, text: "Fast nationwide delivery" },
    { icon: Headphones, text: "Dedicated support team" },
  ];

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-cyan-50 py-12">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
            
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 lg:p-12 flex flex-col justify-center overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Trusted by 5,000+ resellers
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  Your Partner in <span className="text-gradient">Promotional</span> Excellence
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Join Africa's leading promotional products marketplace. Get exclusive access to wholesale pricing and premium branding services.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-gray-200">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-10 lg:p-12 flex flex-col justify-center">
              <div className="max-w-sm mx-auto w-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-400 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Get Started</h1>
                <p className="text-gray-500 mb-8">
                  Sign in to your account or create a new one to start shopping.
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleLogin}
                    className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white font-bold text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                    data-testid="button-replit-auth"
                  >
                    Continue with Replit <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-4 text-gray-400 font-medium">Secure Authentication</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {["Quick & secure sign in", "No password required", "Your data is protected"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-8 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
