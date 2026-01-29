import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Save, X, LogOut, Package, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/contexts/AdminContext";
import { Layout } from "@/components/layout/Layout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product, SiteSettings } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const { isAdmin, logout } = useAdmin();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "gifts",
    price: "",
    imageUrl: "",
    stockStatus: "In Stock",
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    enabled: isAdmin,
  });

  const { data: siteSettings } = useQuery<SiteSettings>({
    queryKey: ["/api/site-settings"],
  });

  const themeMutation = useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      return apiRequest("PATCH", "/api/admin/site-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-settings"] });
      toast({ title: "Theme updated successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Product> }) => {
      return apiRequest("PATCH", `/api/admin/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product updated successfully" });
      setEditingProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted successfully" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product created successfully" });
      setIsAddingNew(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "gifts",
      price: "",
      imageUrl: "",
      stockStatus: "In Stock",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: (product.price / 100).toString(),
      imageUrl: product.imageUrl,
      stockStatus: product.stockStatus || "In Stock",
    });
  };

  const handleSave = () => {
    const priceInCents = Math.round(parseFloat(formData.price) * 100);
    
    if (editingProduct) {
      updateMutation.mutate({
        id: editingProduct.id,
        data: {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: priceInCents,
          imageUrl: formData.imageUrl,
          stockStatus: formData.stockStatus,
        },
      });
    } else {
      createMutation.mutate({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: priceInCents,
        imageUrl: formData.imageUrl,
        stockStatus: formData.stockStatus,
        brandingOptions: [],
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (!isAdmin) {
    setLocation("/");
    return null;
  }

  const categories = ["gifts", "clothing", "headwear", "workwear", "display", "custom-products"];

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowThemeSettings(!showThemeSettings)} data-testid="button-theme-settings">
              <Palette className="w-4 h-4 mr-2" /> Theme
            </Button>
            <Button onClick={() => setIsAddingNew(true)} data-testid="button-add-product">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
            <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {showThemeSettings && siteSettings && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5" /> Site Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Background Color (HSL)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={siteSettings.backgroundColor}
                      onChange={(e) => themeMutation.mutate({ backgroundColor: e.target.value })}
                      placeholder="0 0% 100%"
                    />
                    <div className="w-10 h-10 border rounded" style={{ backgroundColor: `hsl(${siteSettings.backgroundColor})` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Text Color (HSL)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={siteSettings.textColor}
                      onChange={(e) => themeMutation.mutate({ textColor: e.target.value })}
                      placeholder="0 0% 0%"
                    />
                    <div className="w-10 h-10 border rounded" style={{ backgroundColor: `hsl(${siteSettings.textColor})` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Primary Color (HSL)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={siteSettings.primaryColor}
                      onChange={(e) => themeMutation.mutate({ primaryColor: e.target.value })}
                      placeholder="221 83% 53%"
                    />
                    <div className="w-10 h-10 border rounded" style={{ backgroundColor: `hsl(${siteSettings.primaryColor})` }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Use H S% L% format (e.g., 221 83% 53%). Changes apply instantly across the site.
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50" data-testid={`product-row-${product.id}`}>
                    <td className="px-4 py-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{product.category}</td>
                    <td className="px-4 py-3 font-semibold">R {(product.price / 100).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {product.stockStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteMutation.mutate(product.id)}
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog open={editingProduct !== null || isAddingNew} onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
            setIsAddingNew(false);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-product-name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  data-testid="input-product-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger data-testid="select-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (Rands)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    data-testid="input-product-price"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  data-testid="input-product-image"
                />
              </div>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-contain bg-gray-50 rounded"
                />
              )}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1" data-testid="button-save-product">
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                    resetForm();
                  }}
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
