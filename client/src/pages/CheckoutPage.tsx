import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Lock, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { Layout } from "@/components/layout/Layout";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, totalPrice } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
  });

  const formatPrice = (cents: number) => {
    return `R ${(cents / 100).toFixed(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.shippingAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to complete your order",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/checkout", formData);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      setOrderComplete(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <Layout>
        <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center">
          <div className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed!</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Thank you for your order. We'll send you a confirmation email shortly with your order details.
              </p>
              <Button onClick={() => setLocation("/")} size="lg" className="rounded-xl h-14 px-10 font-bold shadow-lg" data-testid="button-back-home">
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 via-white to-cyan-50 min-h-screen">
        <div className="container-custom py-10">
          <Button variant="ghost" onClick={() => setLocation("/cart")} className="mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-500">Complete your order details below</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">1</span>
                    Contact Information
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="customerName" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="John Doe"
                        className="mt-2 h-12 rounded-xl"
                        data-testid="input-customer-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail" className="text-gray-700 font-medium">Email Address</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        placeholder="john@example.com"
                        className="mt-2 h-12 rounded-xl"
                        data-testid="input-customer-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="+27 12 345 6789"
                        className="mt-2 h-12 rounded-xl"
                        data-testid="input-customer-phone"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">2</span>
                    Shipping Address
                  </h2>
                  <div>
                    <Label htmlFor="shippingAddress" className="text-gray-700 font-medium">Full Address</Label>
                    <Textarea
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      placeholder="123 Main Street, Suburb, City, Province, Postal Code"
                      rows={4}
                      className="mt-2 rounded-xl resize-none"
                      data-testid="input-shipping-address"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                    data-testid="button-place-order"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Place Order - {formatPrice(totalPrice)}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Your payment details are secure and encrypted
                  </p>
                </motion.div>
              </form>
            </div>

            <div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4" data-testid={`checkout-item-${item.id}`}>
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900 flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-sm text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
