import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import { motion } from "framer-motion";

// Vegetable/fruit emojis for rolling animation
const rollingItems = [
  { emoji: "🍅", delay: 0, duration: 8, size: "text-6xl", top: "8%" },
  { emoji: "🥕", delay: 1.5, duration: 10, size: "text-5xl", top: "18%" },
  { emoji: "🥬", delay: 3, duration: 7, size: "text-7xl", top: "28%" },
  { emoji: "🍆", delay: 0.5, duration: 9, size: "text-5xl", top: "38%" },
  { emoji: "🌽", delay: 2, duration: 11, size: "text-6xl", top: "48%" },
  { emoji: "🥦", delay: 4, duration: 8.5, size: "text-4xl", top: "58%" },
  { emoji: "🍎", delay: 2.5, duration: 9.5, size: "text-5xl", top: "68%" },
  { emoji: "🍋", delay: 1, duration: 7.5, size: "text-4xl", top: "78%" },
  { emoji: "🥒", delay: 3.5, duration: 8, size: "text-5xl", top: "88%" },
  { emoji: "🍇", delay: 0.8, duration: 9, size: "text-6xl", top: "12%" },
  { emoji: "🍊", delay: 2.2, duration: 7.8, size: "text-5xl", top: "32%" },
  { emoji: "🥭", delay: 4.5, duration: 10.5, size: "text-6xl", top: "52%" },
  { emoji: "🍓", delay: 1.2, duration: 8.2, size: "text-4xl", top: "72%" },
  { emoji: "🫑", delay: 3.8, duration: 9.2, size: "text-5xl", top: "22%" },
  { emoji: "🧄", delay: 0.3, duration: 11.5, size: "text-4xl", top: "42%" },
  { emoji: "🧅", delay: 2.8, duration: 8.8, size: "text-5xl", top: "62%" },
  { emoji: "🥑", delay: 5, duration: 7.2, size: "text-6xl", top: "82%" },
  { emoji: "🍑", delay: 1.8, duration: 9.8, size: "text-5xl", top: "5%" },
];

const HeroSection = () => {
  const { location, requestLocation, isLoading } = useLocation();

  return (
    <section className="relative min-h-[90vh] overflow-hidden noise-overlay">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--sand))] via-background to-[hsl(var(--accent))]" />
      
      {/* Rolling Vegetables Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {rollingItems.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.size} select-none`}
            style={{ top: item.top, left: "-10%" }}
            animate={{
              x: ["0vw", "120vw"],
              rotate: [0, 720],
            }}
            transition={{
              x: {
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay,
              },
              rotate: {
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay,
              },
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>
      

      {/* Decorative Blobs */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 bg-primary/20 blob-shape blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-[5%] w-80 h-80 bg-[hsl(var(--sage))]/30 blob-shape blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-32">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Text Content */}
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Location Badge */}
            <motion.button
              onClick={requestLocation}
              disabled={isLoading}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {isLoading ? "Detecting..." : location?.city || "Set Location"}
              </span>
              <span className="text-xs text-primary/70 group-hover:text-primary transition-colors">
                (click to update)
              </span>
            </motion.button>

            {/* Tag */}
            <motion.div 
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium tracking-wider uppercase text-primary">
                Farm-to-Table Marketplace
              </span>
              <span className="h-px w-12 bg-primary" />
            </motion.div>

            <motion.h1 
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[0.9] mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Taste the{" "}
              <motion.span 
                className="italic text-primary inline-block"
                animate={{ 
                  rotate: [-2, 2, -2],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                local
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                difference
              </motion.span>
            </motion.h1>

            <motion.p 
              className="font-body text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Discover handpicked produce from farmers in your neighborhood. 
              Fresh, seasonal, and delivered with care.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/#products">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="group bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 h-14 text-base font-medium"
                  >
                    Browse Products
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 h-14 text-base font-medium border-2 border-foreground/20 hover:border-foreground/40 hover:bg-transparent"
                  >
                    Become a Seller
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-12 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { value: "500+", label: "Products" },
                { value: "50+", label: "Local Farmers" },
                { value: "4.9", label: "Avg Rating" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <p className="font-display text-4xl text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {["Fresh Vegetables", "Organic Fruits", "Farm Direct", "Same Day Delivery", "Local Honey", "Fresh Herbs", "Dairy Products", "Seasonal Picks"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
