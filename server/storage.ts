import { db } from "./db";
import {
  products,
  categories,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory
} from "@shared/schema";
import { eq, ilike } from "drizzle-orm";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth";

export interface IStorage extends IAuthStorage {
  getProducts(category?: string, search?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Auth methods
  getUser = authStorage.getUser;
  upsertUser = authStorage.upsertUser;

  async getProducts(category?: string, search?: string): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (category) {
      query = query.where(eq(products.category, category)) as any;
    }
    
    if (search) {
      // Simple case-insensitive search on name
      query = query.where(ilike(products.name, `%${search}%`)) as any;
    }
    
    return await query;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async seedData(): Promise<void> {
    const existingCats = await this.getCategories();
    if (existingCats.length === 0) {
      const cats = [
        { name: "Gifts", slug: "gifts", imageUrl: "https://assets.promoafrica.com/webassets/home/images/gifts.jpg" },
        { name: "Clothing", slug: "clothing", imageUrl: "https://assets.promoafrica.com/webassets/home/images/clothing.jpg" },
        { name: "Headwear", slug: "headwear", imageUrl: "https://assets.promoafrica.com/webassets/home/images/headwear1.jpg" },
        { name: "Workwear", slug: "workwear", imageUrl: "https://assets.promoafrica.com/webassets/home/images/workwear1.jpg" },
        { name: "Display", slug: "display", imageUrl: "https://assets.promoafrica.com/webassets/home/images/displayFlag.jpg" },
        { name: "Custom Products", slug: "custom-products", imageUrl: "https://assets.promoafrica.com/webassets/home/images/customProducts.jpg" },
      ];

      for (const cat of cats) {
        await this.createCategory(cat);
      }

      // Seed products for each category
      const dummyProducts = [
        {
          name: "Corporate Notebook",
          description: "Premium leather-feel notebook.",
          category: "gifts",
          price: 15000,
          imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363",
          brandingOptions: ["Debossing", "Screen Print"],
        },
        {
          name: "Classic T-Shirt",
          description: "100% Cotton heavy weight t-shirt.",
          category: "clothing",
          price: 8500,
          imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
          brandingOptions: ["Screen Print", "Embroidery"],
        },
        {
          name: "6-Panel Cap",
          description: "Brushed cotton cap with velcro strap.",
          category: "headwear",
          price: 4500,
          imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
          brandingOptions: ["Embroidery", "Heat Transfer"],
        },
        {
          name: "Safety Vest",
          description: "High visibility reflective vest.",
          category: "workwear",
          price: 6500,
          imageUrl: "https://images.unsplash.com/photo-1625238262445-3129487c95a3",
          brandingOptions: ["Screen Print"],
        },
      ];

      for (const prod of dummyProducts) {
        await this.createProduct(prod);
      }
    }
  }
}

export const storage = new DatabaseStorage();
