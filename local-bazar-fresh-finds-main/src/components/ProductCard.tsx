import { MapPin, Plus, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  unit: string;
  distance: number;
  image: string;
  farmer: string;
  rating: number;
  category?: string;
  description?: string;
  stock?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  unit,
  distance,
  image,
  farmer,
  rating,
  category = "",
  description = "",
  stock = 0,
}: ProductCardProps) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      unit,
      distance,
      image,
      farmer,
      rating,
      category,
      description,
      stock,
    });
    
    setIsAdded(true);
    setIsCartOpen(true);
    toast.success(`${name} added to cart!`, {
      description: `₹${price}/${unit}`,
    });

    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div 
      className="group card-artisan rounded-2xl overflow-hidden border border-border/30 hover-lift"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        {/* Rating badge */}
        <motion.div 
          className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-foreground">{rating}</span>
        </motion.div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{distance} km away</span>
          <span className="mx-1">·</span>
          <span className="truncate">{farmer}</span>
        </div>

        <Link to={`/product/${id}`}>
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
            {name}
          </h3>
        </Link>

        <div className="flex items-end justify-between">
          <div>
            <span className="font-display text-2xl text-foreground">₹{price}</span>
            <span className="text-muted-foreground text-sm ml-1">/{unit}</span>
          </div>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className={`rounded-full h-10 w-10 p-0 transition-all duration-300 ${
                isAdded 
                  ? "bg-green-500 hover:bg-green-500" 
                  : "bg-primary hover:bg-primary/90"
              } text-primary-foreground`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isAdded ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
