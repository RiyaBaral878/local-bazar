import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onFilterChange: (radius: number) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [activeRadius, setActiveRadius] = useState(10);
  const radiusOptions = [5, 10, 20, 50];

  const handleRadiusChange = (radius: number) => {
    setActiveRadius(radius);
    onFilterChange(radius);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-6 border-y border-border/50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg text-foreground">Distance</h3>
          <p className="text-sm text-muted-foreground">Filter by proximity</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {radiusOptions.map((radius) => (
          <Button
            key={radius}
            variant="ghost"
            size="sm"
            onClick={() => handleRadiusChange(radius)}
            className={`rounded-full px-5 h-10 font-body text-sm font-medium transition-all duration-300 ${
              activeRadius === radius
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {radius} km
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;