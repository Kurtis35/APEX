import { Layout } from "@/components/layout/Layout";
import { useCategories, useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";
import { Link } from "wouter";
import { ArrowRight, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: featuredProducts, isLoading: isProductsLoading } = useProducts();

  // Show only first 8 products as featured
  const displayedProducts = featuredProducts?.slice(0, 8) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-slate-900">
           {/* hero generic office workspace */}
           <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="container-custom relative h-full flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white space-y-6"
          >
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
              <span className="w-8 h-0.5 bg-primary inline-block"></span>
              Africa's Largest Supplier
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              World-Class <span className="text-primary">Branding</span><br/>Solutions
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Discover over 16,000 product SKUs ranging from corporate gifts and clothing to workwear and headwear. Quality guaranteed.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/category/all">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
                  Browse Catalog
                </button>
              </Link>
              <Link href="/category/gifts">
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                  View Gifts
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-500">Certified products and branding</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Massive Stock</h3>
                <p className="text-sm text-gray-500">Over R4 Billion in inventory</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-500">Industry-leading turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#333E48] mb-4">Explore Categories</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {isCategoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-white">
                      {category.imageUrl ? (
                        <img 
                          src={category.imageUrl} 
                          alt={category.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                         <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                           No Image
                         </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold">{category.name}</h3>
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-2">
                        View Products <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333E48] mb-2">Featured Products</h2>
              <p className="text-gray-500">Our most popular corporate gifts and clothing</p>
            </div>
            <Link href="/category/all">
              <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                View All <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
