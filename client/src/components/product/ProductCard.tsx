import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = (product.price / 100).toFixed(2);

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 cursor-pointer h-full flex flex-col"
        whileHover={{ y: -8 }}
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-5xl font-bold">A</span>
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 shadow-lg">
              {product.stockStatus || "In Stock"}
            </Badge>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <button className="flex-1 bg-white text-gray-900 py-2.5 rounded-xl font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2 text-sm">
                <Eye className="w-4 h-4" /> Quick View
              </button>
              <button className="w-11 h-11 bg-primary text-white rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
            {product.category}
          </div>
          
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-gray-900">R {price}</span>
              <span className="text-xs text-gray-400 font-medium">excl. VAT</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
