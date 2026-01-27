import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

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

// Fetch products with optional filtering
export function useProducts(filters?: { category?: string; search?: string }) {
  // Create a unique key based on filters
  const queryKey = [api.products.list.path, filters];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build query string manually since buildUrl is for path params usually
      const url = new URL(window.location.origin + api.products.list.path);
      if (filters?.category) url.searchParams.append("category", filters.category);
      if (filters?.search) url.searchParams.append("search", filters.search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch single product
export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
  });
}
