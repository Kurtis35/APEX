import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  
  // Create a display price (convert cents to Rands)
  const price = (product.price / 100).toFixed(2);

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
        whileHover={{ y: -5 }}
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-4xl font-bold">A</span>
            </div>
          )}
          
          {/* Stock Badge Overlay */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm text-xs font-semibold text-gray-700">
              {product.stockStatus || "In Stock"}
            </Badge>
          </div>
          
          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
              View Details
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
            {product.category}
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            {user ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Reseller Price</span>
                <span className="text-xl font-bold text-gray-900">R {price}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg w-full">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-semibold">Login to view price</span>
              </div>
            )}
            
            {user && (
              <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
