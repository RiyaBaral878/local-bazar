import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Edit2, Trash2, Package, DollarSign, 
  TrendingUp, ShoppingBag, ArrowLeft, Leaf 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, Product } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const FarmerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getFarmerProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your listings.",
    });
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-primary" },
    { label: "Total Revenue", value: "₹24,500", icon: DollarSign, color: "bg-green-500" },
    { label: "Orders Today", value: "12", icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Growth", value: "+15%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground hidden sm:block">
                  Local<span className="text-primary">Bazar</span>
                </span>
              </Link>
              <span className="text-muted-foreground">|</span>
              <span className="font-medium text-foreground">Farmer Dashboard</span>
            </div>

            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 shadow-soft border border-border/50 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Products</h2>
              <p className="text-muted-foreground text-sm">Manage your product listings</p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl btn-hover"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Products Table */}
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr
                      key={product.id}
                      className="border-t border-border hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.farmer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-foreground">₹{product.price}</span>
                        <span className="text-muted-foreground text-sm">/{product.unit}</span>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${product.stock < 30 ? "text-destructive" : "text-primary"}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent hover:text-primary"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-3xl p-6 max-w-md w-full shadow-elevated animate-scale-in">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Product Name</label>
                <Input
                  defaultValue={editingProduct?.name}
                  placeholder="e.g., Organic Tomatoes"
                  className="mt-1 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Price (₹)</label>
                  <Input
                    type="number"
                    defaultValue={editingProduct?.price}
                    placeholder="0"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Unit</label>
                  <Input
                    defaultValue={editingProduct?.unit}
                    placeholder="kg, dozen, etc."
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Stock</label>
                <Input
                  type="number"
                  defaultValue={editingProduct?.stock}
                  placeholder="Available quantity"
                  className="mt-1 rounded-xl"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: editingProduct ? "Product updated" : "Product added",
                      description: "Your changes have been saved.",
                    });
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
