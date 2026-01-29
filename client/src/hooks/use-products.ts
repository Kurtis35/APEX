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

// Fetch products from API with optional filtering
export function useProducts(filters?: { category?: string; search?: string }) {
  const queryKey = ["/api/products", filters];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.search) params.append("search", filters.search);
      
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    },
  });
}

// Fetch single product from API
export function useProduct(id: number) {
  return useQuery({
    queryKey: ["/api/products", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return await res.json();
    },
  });
}
