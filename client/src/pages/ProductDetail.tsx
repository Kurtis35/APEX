import { useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useProduct, useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product/ProductCard";
import { Check, Shield, Truck, Package, ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const { data: relatedProducts } = useProducts(
    product ? { category: product.category } : undefined
  );

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          <Link href="/">
            <Button className="mt-4 bg-primary text-white">Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const brandingOptions = product.brandingOptions as string[] || [];
  const price = (product.price / 100).toFixed(2);

  return (
    <Layout>
      <div className="bg-white pb-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 border-b border-gray-100">
          <div className="container-custom">
             <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary capitalize">{product.category}</Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery Side */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                    <span className="text-6xl font-bold">A</span>
                  </div>
                )}
                <div className="absolute top-6 left-6">
                   <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 text-sm">
                    {product.stockStatus}
                   </Badge>
                </div>
              </div>
              
              {/* Mock Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`aspect-square rounded-xl bg-gray-50 border-2 cursor-pointer transition-all ${i === 1 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                    {product.imageUrl && <img src={product.imageUrl} className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Side */}
            <div>
              <div className="mb-2 text-primary font-bold uppercase tracking-wider text-sm">{product.category}</div>
              <h1 className="text-4xl font-extrabold text-[#333E48] leading-tight mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i<=4} />)}
                </div>
                <span className="text-sm text-gray-500">(12 Reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-green-600 font-medium">SKU: AMR-{product.id.toString().padStart(4, '0')}</span>
              </div>

              {/* Price Block */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-8">
                <div className="flex items-end gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">Price (Excl. VAT)</p>
                    <p className="text-4xl font-extrabold text-primary">R {price}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Separator />

                {/* Branding Options */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Branding Options</h3>
                  <div className="flex flex-wrap gap-3">
                    {brandingOptions.length > 0 ? brandingOptions.map((opt) => (
                      <Badge key={opt} variant="secondary" className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {opt}
                      </Badge>
                    )) : (
                      <p className="text-sm text-gray-500">Standard branding options available.</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Features List (Mock) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-primary" /> 1 Year Warranty
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-primary" /> Fast Nationwide Delivery
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Package className="w-5 h-5 text-primary" /> Bulk Discounts Available
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-primary" /> Quality Checked
                  </div>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                 <Button 
                   className="flex-1 bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
                   onClick={handleAddToCart}
                   data-testid="button-add-to-cart"
                 >
                   <ShoppingCart className="w-5 h-5 mr-2" />
                   Add to Cart
                 </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-bold text-[#333E48] mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
