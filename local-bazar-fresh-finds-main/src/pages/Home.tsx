import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import MapView from "@/components/MapView";
import Footer from "@/components/Footer";
import { api, Product } from "@/services/api";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { motion } from "framer-motion";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(10);
  const { location } = useLocation();

  useEffect(() => {
    loadProducts(radius);
  }, [radius, location]);

  const loadProducts = async (radiusKm: number) => {
    setLoading(true);
    // Pass location coordinates for future backend integration
    const data = await api.getProducts(radiusKm, location?.latitude, location?.longitude);
    setProducts(data);
    setLoading(false);
  };

  const handleFilterChange = (newRadius: number) => {
    setRadius(newRadius);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Products Section */}
      <section id="products" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-sm font-medium tracking-wider uppercase text-primary mb-4 block">
                Fresh Picks
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                What's growing<br />
                <span className="italic">near {location?.city || "you"}</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Handpicked produce from verified local farmers. Harvested fresh and delivered to your doorstep within hours.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FilterBar onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          ) : products.length > 0 ? (
            <>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* View All Button */}
              <motion.div 
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group rounded-full px-8 h-14 text-base font-medium border-2 border-foreground/20 hover:border-foreground/40 hover:bg-transparent"
                  >
                    View All Products
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-32 bg-muted/30 rounded-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-2xl text-foreground mb-2">
                No products found
              </p>
              <p className="text-muted-foreground">
                Try increasing the distance to {radius}km or check back later.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-accent/30 noise-overlay">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-sm font-medium tracking-wider uppercase text-primary mb-4 block">
                Discover
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Farms in your<br />
                <span className="italic">neighborhood</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Explore our interactive map to find local farms and their fresh produce offerings.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MapView />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
