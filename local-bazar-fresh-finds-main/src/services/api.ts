// Mock data for the application
// TODO: Replace with actual backend API calls

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  distance: number;
  image: string;
  farmer: string;
  rating: number;
  category: string;
  description: string;
  stock: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 45,
    unit: "kg",
    distance: 2.5,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
    farmer: "Raju's Farm",
    rating: 4.8,
    category: "Vegetables",
    description: "Fresh, vine-ripened organic tomatoes grown without pesticides.",
    stock: 50,
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 30,
    unit: "bunch",
    distance: 3.2,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80",
    farmer: "Green Valley",
    rating: 4.9,
    category: "Leafy Greens",
    description: "Nutrient-rich spinach harvested fresh every morning.",
    stock: 100,
  },
  {
    id: 3,
    name: "Alphonso Mangoes",
    price: 350,
    unit: "dozen",
    distance: 8.1,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80",
    farmer: "Konkan Orchards",
    rating: 5.0,
    category: "Fruits",
    description: "Premium Alphonso mangoes from Ratnagiri, naturally ripened.",
    stock: 25,
  },
  {
    id: 4,
    name: "Free Range Eggs",
    price: 120,
    unit: "dozen",
    distance: 5.0,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80",
    farmer: "Happy Hens Farm",
    rating: 4.7,
    category: "Dairy & Eggs",
    description: "Eggs from free-range hens raised on organic feed.",
    stock: 200,
  },
  {
    id: 5,
    name: "Raw Honey",
    price: 450,
    unit: "500g",
    distance: 12.3,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80",
    farmer: "Bee Natural",
    rating: 4.9,
    category: "Honey",
    description: "Pure, unprocessed honey from local wildflowers.",
    stock: 30,
  },
  {
    id: 6,
    name: "Fresh Coriander",
    price: 15,
    unit: "bunch",
    distance: 1.8,
    image: "https://images.unsplash.com/photo-1506807803488-8eafc15316c7?w=500&q=80",
    farmer: "Herb Garden",
    rating: 4.6,
    category: "Herbs",
    description: "Aromatic fresh coriander for your kitchen.",
    stock: 150,
  },
  {
    id: 7,
    name: "Basmati Rice",
    price: 180,
    unit: "kg",
    distance: 15.5,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    farmer: "Punjab Fields",
    rating: 4.8,
    category: "Grains",
    description: "Aged, aromatic basmati rice from Punjab.",
    stock: 500,
  },
  {
    id: 8,
    name: "Fresh Milk",
    price: 60,
    unit: "liter",
    distance: 4.2,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
    farmer: "Dairy Fresh",
    rating: 4.9,
    category: "Dairy",
    description: "Fresh, pasteurized milk delivered daily.",
    stock: 80,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API Service
 * 
 * This service provides mock data for development.
 * Replace these functions with actual API calls when integrating backend.
 * 
 * Backend Integration Points:
 * - GET /api/products - Fetch all products
 * - GET /api/products/:id - Fetch single product
 * - GET /api/products/nearby?lat=&lng=&radius= - Fetch products by location
 * - POST /api/cart - Add to cart
 * - GET /api/farmers/:id/products - Fetch farmer's products
 * - POST /api/orders - Create order
 */
export const api = {
  /**
   * Get all products with optional filters
   * @param radiusKm - Filter by distance radius
   * @param lat - User latitude (for location-based filtering)
   * @param lng - User longitude (for location-based filtering)
   * 
   * TODO: Replace with actual API call:
   * return fetch(`/api/products?radius=${radiusKm}&lat=${lat}&lng=${lng}`).then(r => r.json())
   */
  getProducts: async (
    radiusKm?: number,
    lat?: number,
    lng?: number
  ): Promise<Product[]> => {
    await delay(300);
    
    // Log for debugging - remove in production
    console.log("Fetching products with params:", { radiusKm, lat, lng });
    
    let filteredProducts = [...mockProducts];
    
    if (radiusKm) {
      filteredProducts = filteredProducts.filter(p => p.distance <= radiusKm);
    }
    
    // Sort by distance (closest first)
    filteredProducts.sort((a, b) => a.distance - b.distance);
    
    return filteredProducts;
  },

  /**
   * Get single product by ID
   * @param id - Product ID
   * 
   * TODO: Replace with actual API call:
   * return fetch(`/api/products/${id}`).then(r => r.json())
   */
  getProduct: async (id: number): Promise<Product | undefined> => {
    await delay(200);
    return mockProducts.find(p => p.id === id);
  },

  /**
   * Get products by farmer (for dashboard)
   * 
   * TODO: Replace with actual API call:
   * return fetch(`/api/farmers/${farmerId}/products`).then(r => r.json())
   */
  getFarmerProducts: async (farmerId?: string): Promise<Product[]> => {
    await delay(300);
    // Return first 4 as "farmer's products" for mock
    return mockProducts.slice(0, 4);
  },

  /**
   * Search products by query
   * @param query - Search term
   * 
   * TODO: Replace with actual API call:
   * return fetch(`/api/products/search?q=${query}`).then(r => r.json())
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(200);
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
      p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.farmer.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get products by category
   * @param category - Category name
   * 
   * TODO: Replace with actual API call:
   * return fetch(`/api/products/category/${category}`).then(r => r.json())
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(200);
    return mockProducts.filter(p => p.category === category);
  },

  /**
   * Create order (checkout)
   * @param items - Cart items
   * @param deliveryAddress - Delivery address
   * 
   * TODO: Implement actual API call:
   * return fetch('/api/orders', { 
   *   method: 'POST', 
   *   body: JSON.stringify({ items, deliveryAddress }) 
   * }).then(r => r.json())
   */
  createOrder: async (
    items: { productId: number; quantity: number }[],
    deliveryAddress: string
  ): Promise<{ orderId: string; status: string }> => {
    await delay(500);
    return {
      orderId: `ORD-${Date.now()}`,
      status: "confirmed",
    };
  },
};

/**
 * Auth Service Placeholder
 * 
 * TODO: Implement authentication
 * - POST /api/auth/login
 * - POST /api/auth/register
 * - POST /api/auth/logout
 * - GET /api/auth/me
 */
export const authApi = {
  login: async (email: string, password: string) => {
    // TODO: Implement actual login
    await delay(300);
    return { token: "mock-token", user: { id: "1", email, name: "User" } };
  },

  register: async (name: string, email: string, password: string, role: "buyer" | "farmer") => {
    // TODO: Implement actual registration
    await delay(300);
    return { token: "mock-token", user: { id: "1", email, name, role } };
  },

  logout: async () => {
    // TODO: Implement actual logout
    await delay(100);
    return { success: true };
  },
};
