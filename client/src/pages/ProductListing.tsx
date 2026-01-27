import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ProductListing() {
  const { slug } = useParams();
  const { data: products, isLoading } = useProducts({ category: slug === 'all' ? undefined : slug });

  // Mock filters for visual completeness
  const filters = [
    { name: "Brand", options: ["US Basic", "Slazenger", "Biz Collection", "Elevate"] },
    { name: "Color", options: ["Black", "White", "Blue", "Red", "Green"] },
    { name: "Price Range", options: ["R0 - R100", "R100 - R300", "R300 - R500", "R500+"] },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="capitalize text-gray-900 font-medium">{slug}</span>
            </div>
            <h1 className="text-3xl font-extrabold capitalize text-[#333E48] mt-2">
              {slug === 'all' ? 'All Products' : slug}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-lg mb-6 pb-4 border-b">
                <Filter className="w-5 h-5 text-primary" />
                Filters
              </div>
              
              <Accordion type="multiple" defaultValue={["Brand", "Color"]} className="w-full">
                {filters.map((filter) => (
                  <AccordionItem key={filter.name} value={filter.name}>
                    <AccordionTrigger className="text-sm font-semibold text-gray-700 hover:text-primary hover:no-underline">
                      {filter.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {filter.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox id={`${filter.name}-${option}`} />
                            <Label htmlFor={`${filter.name}-${option}`} className="text-sm font-normal text-gray-600 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <button className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors text-sm">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{products?.length || 0}</span> products
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button className="flex items-center gap-2 text-sm font-semibold bg-white border border-gray-200 px-4 py-2 rounded-lg hover:border-primary transition-colors">
                  Popularity <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
