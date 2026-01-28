import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertProductSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    cartId: string;
    isAdmin: boolean;
  }
}

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);
  await storage.seedData();

  app.get(api.products.list.path, async (req, res) => {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const products = await storage.getProducts(category, search);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(404).json({ message: "Invalid product ID" });
    }
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/cart", async (req, res) => {
    const cartId = req.session.cartId || req.sessionID;
    req.session.cartId = cartId;
    const items = await storage.getCartItems(cartId);
    res.json(items);
  });

  app.post("/api/cart", async (req, res) => {
    const cartId = req.session.cartId || req.sessionID;
    req.session.cartId = cartId;
    const { productId, quantity } = req.body;
    const item = await storage.addToCart(cartId, productId, quantity || 1);
    res.json(item);
  });

  app.patch("/api/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const item = await storage.updateCartItem(id, quantity);
    res.json(item);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.removeFromCart(id);
    res.json({ success: true });
  });

  app.post("/api/checkout", async (req, res) => {
    const cartId = req.session.cartId || req.sessionID;
    const cartItems = await storage.getCartItems(cartId);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { customerName, customerEmail, customerPhone, shippingAddress } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await storage.createOrder({
      sessionId: cartId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      total
    });

    await storage.createOrderItems(
      cartItems.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price
      }))
    );

    await storage.clearCart(cartId);
    res.json({ order, message: "Order placed successfully" });
  });

  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const isValid = await storage.validateAdminPassword(username, password);
    
    if (isValid) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.isAdmin = false;
    res.json({ success: true });
  });

  app.get("/api/admin/status", (req, res) => {
    res.json({ isAdmin: req.session.isAdmin || false });
  });

  app.get("/api/admin/products", requireAdmin, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    const product = insertProductSchema.parse(req.body);
    const newProduct = await storage.createProduct(product);
    res.json(newProduct);
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, category, price, imageUrl, stockStatus, brandingOptions } = req.body;
    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (price !== undefined) updates.price = price;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (stockStatus !== undefined) updates.stockStatus = stockStatus;
    if (brandingOptions !== undefined) updates.brandingOptions = brandingOptions;
    
    const product = await storage.updateProduct(id, updates);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteProduct(id);
    if (!success) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true });
  });

  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  return httpServer;
}
