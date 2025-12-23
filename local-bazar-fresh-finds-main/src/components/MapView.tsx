import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = () => {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-soft border border-border/50">
      {/* Map Placeholder */}
      <div className="relative h-[400px] bg-gradient-to-br from-accent to-muted">
        {/* Decorative Map Elements */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Location Markers */}
        <div className="absolute top-1/4 left-1/3 animate-float" style={{ animationDelay: "0s" }}>
          <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 animate-float" style={{ animationDelay: "1s" }}>
          <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-elevated max-w-xs">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Map Integration Ready
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with Mapbox or Google Maps to show nearby farms
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl btn-hover">
              Enable Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
