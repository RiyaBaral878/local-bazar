import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  error?: string;
}

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void;
  setManualLocation: (city: string, lat: number, lng: number) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Default location (can be replaced with actual geolocation API integration)
const DEFAULT_LOCATION: Location = {
  latitude: 19.076,
  longitude: 72.8777,
  city: "Mumbai",
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // TODO: Integrate with reverse geocoding API for city name
        // For now, using coordinates directly
        setLocation({
          latitude,
          longitude,
          city: "Your Location",
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
        // Fallback to default location
        setLocation(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  };

  const setManualLocation = (city: string, lat: number, lng: number) => {
    setLocation({
      latitude: lat,
      longitude: lng,
      city,
    });
    setError(null);
  };

  // Request location on mount
  useEffect(() => {
    // Uncomment to auto-request location
    // requestLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        requestLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
