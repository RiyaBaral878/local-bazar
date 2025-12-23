import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, MapPin, Star, ShoppingCart, 
  Minus, Plus, Truck, Shield, Leaf, Heart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, Product } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    const data = await api.getProduct(Number(id));
    setProduct(data || null);
    setLoading(false);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product?.unit} of ${product?.name} added to your cart.`,
    });
  };

  const features = [
    { icon: Leaf, label: "100% Organic", desc: "No pesticides used" },
    { icon: Truck, label: "Same Day Delivery", desc: "Order before 2 PM" },
    { icon: Shield, label: "Quality Assured", desc: "Freshness guaranteed" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 rounded-xl">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-elevated">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isFavorite
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-background/90 text-muted-foreground hover:text-destructive"
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
            </button>

            {/* Rating Badge */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-foreground">{product.rating}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {/* Category */}
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Farmer & Distance */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="font-medium">by {product.farmer}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{product.distance} km away</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              <span className="text-muted-foreground text-lg">per {product.unit}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-foreground font-medium">Quantity:</span>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-background flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-background flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-muted-foreground">
                {product.stock} available
              </span>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-10">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14 text-lg font-semibold btn-hover"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart — ₹{product.price * quantity}
              </Button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-muted/50 rounded-2xl p-4 text-center"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground text-sm">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
