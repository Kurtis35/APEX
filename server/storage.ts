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

      // Seed products for each category with real Amrod products
      const amrodProducts = [
        // Gifts - Drinkware
        {
          name: "Altitude Baltic Plastic Water Bottle - 330ml",
          description: "Made in South Africa. Compact and colorful plastic water bottle perfect for corporate events and giveaways.",
          category: "gifts",
          price: 2500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/IDEA-54019/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print", "Pad Print"],
        },
        {
          name: "Altitude Slam Plastic Water Bottle - 500ml",
          description: "Made in South Africa. Popular 500ml water bottle available in multiple vibrant colors. High stock availability.",
          category: "gifts",
          price: 3500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/DW-6641/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print", "Pad Print"],
        },
        {
          name: "Altitude Oslo Ceramic Coffee Mug - 330ml",
          description: "Classic ceramic coffee mug perfect for office environments. Dishwasher safe.",
          category: "gifts",
          price: 4500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/IDEA-0935/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print", "Sublimation"],
        },
        {
          name: "Helix Plastic Water Bottle - 500ml",
          description: "Made in South Africa. Stylish water bottle with unique helix design. BPA free.",
          category: "gifts",
          price: 3200,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/GF-AM-642-B/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print", "Pad Print"],
        },
        {
          name: "Alpine Plastic Water Bottle - 800ml",
          description: "Made in South Africa. Large capacity water bottle ideal for outdoor activities.",
          category: "gifts",
          price: 4200,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/GF-AM-671-B/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print"],
        },
        // Gifts - Bags
        {
          name: "Altitude Giveaway Non-Woven Shopper",
          description: "Budget-friendly non-woven shopper bag. Perfect for exhibitions and promotional events.",
          category: "gifts",
          price: 1500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/IDEA-0022/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print"],
        },
        {
          name: "Altitude Budget Non-Woven Shopper",
          description: "Economical non-woven shopper available in multiple colors. High stock availability.",
          category: "gifts",
          price: 1200,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/IDEA-0027/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print"],
        },
        {
          name: "Altitude Whitefield Non-Woven Drawstring Bag",
          description: "Lightweight drawstring bag perfect for sports and casual use.",
          category: "gifts",
          price: 1800,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/IDEA-0052/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print"],
        },
        // Clothing - Golf Shirts
        {
          name: "Mens Everyday Golf Shirt",
          description: "Comfortable everyday golf shirt suitable for corporate wear. Available in men's and ladies' sizes.",
          category: "clothing",
          price: 8500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-EVM/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        {
          name: "Mens Basic Pique Golf Shirt",
          description: "Classic pique golf shirt. High quality fabric with excellent durability. Huge stock availability.",
          category: "clothing",
          price: 7500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-BBM/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        {
          name: "Mens Apex Golf Shirt",
          description: "Premium golf shirt with modern fit. Moisture-wicking fabric for all-day comfort.",
          category: "clothing",
          price: 9500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-APM/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        {
          name: "Mens Tournament Golf Shirt",
          description: "Professional tournament-grade golf shirt. Lightweight and breathable.",
          category: "clothing",
          price: 10500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-TRM/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        {
          name: "Kids Basic Pique Golf Shirt",
          description: "Quality pique golf shirt for kids. Perfect for school or corporate family events.",
          category: "clothing",
          price: 6500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/ALT-BBK/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        {
          name: "Mens Solo Golf Shirt",
          description: "Made in SADC Region. Classic golf shirt with excellent value for money.",
          category: "clothing",
          price: 7000,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/BAS-7776/DEFAULT_260X250.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        // Headwear
        {
          name: "6-Panel Brushed Cotton Cap",
          description: "Classic 6-panel cap with brushed cotton finish and velcro strap closure.",
          category: "headwear",
          price: 4500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/_default_upload_bucket/Headwear_10.jpg",
          brandingOptions: ["Embroidery", "Heat Transfer"],
        },
        {
          name: "5-Panel Trucker Cap",
          description: "Trendy trucker style cap with mesh back. Perfect for outdoor events.",
          category: "headwear",
          price: 5000,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/_default_upload_bucket/Headwear_10.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        // Workwear
        {
          name: "High Visibility Safety Vest",
          description: "Reflective safety vest meeting workplace safety standards. Essential for construction and logistics.",
          category: "workwear",
          price: 6500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/ProductImages/WORK-001/DEFAULT_260X250.jpg",
          brandingOptions: ["Screen Print"],
        },
        {
          name: "Industrial Work Jacket",
          description: "Durable work jacket designed for industrial environments. Multiple pockets for tools.",
          category: "workwear",
          price: 35000,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/_default_upload_bucket/Jackets_7.jpg",
          brandingOptions: ["Embroidery", "Screen Print"],
        },
        // Display
        {
          name: "Pull-Up Banner Stand",
          description: "Portable retractable banner stand. Easy to set up and transport.",
          category: "display",
          price: 45000,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/_default_upload_bucket/Display_1.jpg",
          brandingOptions: ["Full Color Print"],
        },
        {
          name: "Telescopic Flag Banner",
          description: "Eye-catching flag banner perfect for events and exhibitions.",
          category: "display",
          price: 55000,
          imageUrl: "https://assets.promoafrica.com/webassets/home/images/displayFlag.jpg",
          brandingOptions: ["Full Color Print"],
        },
        // Custom Products
        {
          name: "Custom Branded Packaging",
          description: "Fully customizable packaging solutions for your products.",
          category: "custom-products",
          price: 2500,
          imageUrl: "https://amrcdn.amrod.co.za/amrodprod-blob/_default_upload_bucket/Custom%20Packaging.jpg",
          brandingOptions: ["Full Color Print", "Foil Stamping"],
        },
        {
          name: "Custom Gift Set Box",
          description: "Premium gift box that can be customized to hold various promotional items.",
          category: "custom-products",
          price: 8500,
          imageUrl: "https://assets.promoafrica.com/webassets/home/images/customProducts.jpg",
          brandingOptions: ["Full Color Print", "Embossing"],
        },
      ];

      for (const prod of amrodProducts) {
        await this.createProduct(prod);
      }
    }
  }
}

export const storage = new DatabaseStorage();
