import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Layout } from "@/components/layout/Layout";

export default function CartPage() {
  const { items, isLoading, updateQuantity, removeItem, totalPrice } = useCart();

  const formatPrice = (cents: number) => {
    return `R ${(cents / 100).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] bg-gradient-to-br from-gray-50 via-white to-cyan-50">
          <div className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
              <p className="text-gray-500 mb-8">Looks like you haven't added any products yet. Start shopping to fill it up!</p>
              <Link href="/">
                <Button size="lg" className="rounded-xl h-12 px-8 font-semibold shadow-lg shadow-primary/20" data-testid="button-continue-shopping">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Browse Products
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 via-white to-cyan-50 min-h-screen">
        <div className="container-custom py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="rounded-xl" data-testid="button-continue-shopping-header">
                <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 shadow-sm hover:shadow-md transition-shadow"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{item.product.category}</p>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatPrice(item.product.price * item.quantity)}</p>
                        <p className="text-xs text-gray-400">{formatPrice(item.product.price)} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-sm text-gray-400">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">Excl. VAT</p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/20" data-testid="button-checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Free delivery on orders over R1,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
