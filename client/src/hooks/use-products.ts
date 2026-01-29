import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { externalApi } from "@/lib/api-config";
import type { Product } from "@shared/schema";

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch products from external API with optional filtering
export function useProducts(filters?: { category?: string; search?: string }) {
  const queryKey = ["external-products", filters];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(externalApi.products);
      if (!res.ok) throw new Error("Failed to fetch products");
      let products: Product[] = await res.json();

      // Apply client-side filtering if needed
      if (filters?.category) {
        products = products.filter(p => p.category === filters.category);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      return products;
    },
  });
}

// Fetch single product from external API
export function useProduct(id: number) {
  return useQuery({
    queryKey: ["external-product", id],
    queryFn: async () => {
      const res = await fetch(externalApi.products);
      if (!res.ok) throw new Error("Failed to fetch products");
      const products: Product[] = await res.json();
      const product = products.find(p => p.id === id);
      return product || null;
    },
  });
}
