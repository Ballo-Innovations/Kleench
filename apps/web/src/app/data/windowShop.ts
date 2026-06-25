import smartphoneImg from "@/assets/products/smartphone.png";
import laptopImg from "@/assets/products/laptop.png";
import shoesImg from "@/assets/products/shoes.png";
import handbagImg from "@/assets/products/hand_bag.png";
import scentStoreImg from "@/assets/shops/scent_store.png";
import techHubImg from "@/assets/shops/tech_hub.png";
import styleAvenueImg from "@/assets/shops/style_avenue.png";
import greenleafImg from "@/assets/shops/greenleaf.png";
import pnpLogo from "@/assets/pick and pay logo.png";

export type WindowCategory = { id: string; label: string; sub: string; icon: string };

export type WindowStore = {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  views: string;
  likes: string;
  open: boolean;
  closeTime: string;
  image: string;
  about: string;
  productTabs: string[];
};

export type WindowProduct = {
  id: string;
  name: string;
  storeId: string;
  storeName: string;
  category: string;       // top-level category id (e.g. "electronics")
  storeTab: string;       // store sub-tab (e.g. "Toilets")
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  description: string;
};

// Top-level Window categories (5.1.1)
export const WINDOW_CATEGORIES: WindowCategory[] = [
  { id: "electronics", label: "Electronics", sub: "Phones, Laptops, TV & more", icon: "smartphone" },
  { id: "fashion", label: "Fashion", sub: "Men, Women, Kids & accessories", icon: "tag" },
  { id: "home", label: "Home & Living", sub: "Furniture, Decor, Appliances", icon: "building" },
  { id: "beauty", label: "Beauty & Health", sub: "Skincare, Makeup, Personal care", icon: "heart" },
  { id: "automotive", label: "Automotive", sub: "Car Parts, Accessories, Service", icon: "truck" },
  { id: "groceries", label: "Groceries", sub: "Food, Beverages & more", icon: "wheat" },
  { id: "books", label: "Books & Stationary", sub: "Books, Stationary, Office supplies", icon: "filetext" },
  { id: "hardware", label: "Hardware & Electricals", sub: "Plumbing, Electrical & more", icon: "construction" },
  { id: "printing", label: "Printing", sub: "Billboards, Ads, Printing", icon: "image" },
];

// Stores (5.1.3 / 5.1.4)
export const WINDOW_STORES: WindowStore[] = [
  {
    id: "win", name: "Win Electronics", category: "Electronics & Tech", location: "Lusaka, Zambia",
    rating: 4.6, reviews: 126, views: "8.4k", likes: "2.1k", open: true, closeTime: "18:00",
    image: techHubImg, about: "Your trusted source for genuine smartphones, laptops and gadgets at the best prices in town.",
    productTabs: ["All", "Phones", "Laptops", "Accessories"],
  },
  {
    id: "mcm", name: "MCM Hardware", category: "Hardware & Building", location: "Lusaka, Zambia",
    rating: 4.2, reviews: 290, views: "156", likes: "2.7k", open: true, closeTime: "17:00",
    image: greenleafImg, about: "We provide high quality building materials at the best prices. Plumbing, electrical, tools and more.",
    productTabs: ["All", "Plumbing", "Electrical", "Tools", "Toilets"],
  },
  {
    id: "mobilecity", name: "Mobile City", category: "Phone Accessories", location: "Lusaka, Zambia",
    rating: 4.0, reviews: 290, views: "3.2k", likes: "980", open: true, closeTime: "19:00",
    image: techHubImg, about: "Phones, accessories and repairs. Genuine gadgets with warranty.",
    productTabs: ["All", "Phones", "Accessories"],
  },
  {
    id: "pnp", name: "Pick N Pay", category: "Retail Store", location: "Lusaka, Zambia",
    rating: 4.8, reviews: 1890, views: "42k", likes: "11k", open: true, closeTime: "20:00",
    image: pnpLogo, about: "Zambia's favourite retail chain — groceries, household essentials and fresh produce daily.",
    productTabs: ["All", "Groceries", "Household"],
  },
  {
    id: "zambeef", name: "Zambeef", category: "Food Production", location: "Lusaka, Zambia",
    rating: 4.9, reviews: 980, views: "30k", likes: "9.5k", open: true, closeTime: "18:00",
    image: greenleafImg, about: "Quality meat and food products produced and packaged in Zambia.",
    productTabs: ["All", "Meat", "Dairy"],
  },
  {
    id: "scent", name: "The Scent Store Zambia", category: "Beauty & Fragrance", location: "Lusaka, Zambia",
    rating: 4.7, reviews: 420, views: "5.1k", likes: "1.8k", open: true, closeTime: "18:30",
    image: scentStoreImg, about: "Premium fragrances and beauty essentials for every occasion.",
    productTabs: ["All", "Perfume", "Skincare"],
  },
  {
    id: "style", name: "Style Avenue ZM", category: "Clothing & Fashion", location: "Lusaka, Zambia",
    rating: 4.5, reviews: 312, views: "6.7k", likes: "2.3k", open: true, closeTime: "19:00",
    image: styleAvenueImg, about: "Trend-led fashion for men and women. Quality clothing, shoes and accessories.",
    productTabs: ["All", "Clothing", "Shoes", "Accessories"],
  },
  {
    id: "greenleaf", name: "Greenleaf Organics", category: "Food & Health", location: "Lusaka, Zambia",
    rating: 4.6, reviews: 188, views: "4.2k", likes: "1.4k", open: false, closeTime: "17:00",
    image: greenleafImg, about: "Organic foods, supplements and healthy living products sourced responsibly.",
    productTabs: ["All", "Organic", "Supplements"],
  },
];

// Products (5.1.2 / 5.1.5 / 5.1.6)
export const WINDOW_PRODUCTS: WindowProduct[] = [
  {
    id: "ip14-win", name: "iPhone 14 128GB", storeId: "win", storeName: "Win Electronics",
    category: "electronics", storeTab: "Phones", price: 14999, oldPrice: 16500, rating: 4.6, reviews: 126,
    image: smartphoneImg, features: ["128GB Storage", "6.1\" Super Retina XDR", "Dual 12MP camera", "Sealed with warranty"],
    description: "Brand new, sealed iPhone 14 128GB with full manufacturer warranty. Genuine Apple product available now.",
  },
  {
    id: "ip14-mc", name: "iPhone 14 128GB", storeId: "mobilecity", storeName: "Mobile City",
    category: "electronics", storeTab: "Phones", price: 14500, oldPrice: 15800, rating: 4.0, reviews: 45,
    image: smartphoneImg, features: ["128GB Storage", "6.1\" display", "Face ID", "1 year warranty"],
    description: "iPhone 14 128GB from Mobile City. Competitive pricing with full accessories in the box.",
  },
  {
    id: "ip14-mc2", name: "iPhone 14 128GB", storeId: "mobilecity", storeName: "Mobile City",
    category: "electronics", storeTab: "Phones", price: 15500, rating: 4.8, reviews: 45,
    image: smartphoneImg, features: ["128GB Storage", "6.1\" display", "Dual camera", "Sealed box"],
    description: "Premium grade iPhone 14 with extended warranty and free screen protector.",
  },
  {
    id: "laptop-win", name: "Pro Laptop 15\"", storeId: "win", storeName: "Win Electronics",
    category: "electronics", storeTab: "Laptops", price: 7500, oldPrice: 8500, rating: 4.5, reviews: 88,
    image: laptopImg, features: ["16GB RAM", "512GB SSD", "Intel Core i7", "Full HD display"],
    description: "Powerful laptop for work and study. Fast SSD storage and long battery life.",
  },
  {
    id: "mirage-toilet", name: "Mirage Toilet", storeId: "mcm", storeName: "MCM Hardware",
    category: "hardware", storeTab: "Toilets", price: 4500, rating: 4.8, reviews: 966,
    image: greenleafImg, features: ["Toilet Suite", "Single Top Flush", "Strong brand", "Complete with Seat Cover"],
    description: "Complete toilet suite with single top flush. Strong, durable brand supplied complete with seat cover.",
  },
  {
    id: "single-toilet", name: "Single Toilet", storeId: "mcm", storeName: "MCM Hardware",
    category: "hardware", storeTab: "Toilets", price: 1400, rating: 4.4, reviews: 210,
    image: greenleafImg, features: ["Compact design", "Easy to install", "Ceramic finish", "Seat included"],
    description: "Space-saving single toilet ideal for compact bathrooms. Durable ceramic finish with seat included.",
  },
  {
    id: "pvc-pipe", name: "PVC Pipe Set", storeId: "mcm", storeName: "MCM Hardware",
    category: "hardware", storeTab: "Plumbing", price: 320, rating: 4.3, reviews: 140,
    image: greenleafImg, features: ["Pack of 6", "20mm diameter", "Pressure rated", "UV resistant"],
    description: "Durable PVC plumbing pipe set, pressure rated and UV resistant for indoor and outdoor use.",
  },
  {
    id: "tool-kit", name: "Builder Tool Kit", storeId: "mcm", storeName: "MCM Hardware",
    category: "hardware", storeTab: "Tools", price: 890, oldPrice: 1100, rating: 4.6, reviews: 95,
    image: greenleafImg, features: ["48-piece set", "Chrome vanadium", "Carry case included", "Lifetime guarantee"],
    description: "Complete 48-piece builder tool kit in a sturdy carry case. Professional grade with lifetime guarantee.",
  },
  {
    id: "handbag-style", name: "Leather Handbag", storeId: "style", storeName: "Style Avenue ZM",
    category: "fashion", storeTab: "Accessories", price: 650, oldPrice: 850, rating: 4.7, reviews: 73,
    image: handbagImg, features: ["Genuine leather", "Adjustable strap", "Multiple compartments", "Premium finish"],
    description: "Elegant genuine leather handbag with adjustable strap and spacious compartments.",
  },
  {
    id: "shoes-style", name: "Running Shoes", storeId: "style", storeName: "Style Avenue ZM",
    category: "fashion", storeTab: "Shoes", price: 275, rating: 4.4, reviews: 58,
    image: shoesImg, features: ["Breathable mesh", "Cushioned sole", "Lightweight", "Sizes 38–45"],
    description: "Comfortable lightweight running shoes with breathable mesh and cushioned soles.",
  },
];

export function getStore(id?: string) {
  return WINDOW_STORES.find((s) => s.id === id);
}
export function getProduct(id?: string) {
  return WINDOW_PRODUCTS.find((p) => p.id === id);
}
export function productsByStore(storeId: string) {
  return WINDOW_PRODUCTS.filter((p) => p.storeId === storeId);
}
export function productsByCategory(categoryId: string) {
  return WINDOW_PRODUCTS.filter((p) => p.category === categoryId);
}

// ── Cart (localStorage-backed) ──
const CART_KEY = "kleench_window_cart";
export type CartLine = { id: string; qty: number };

export function getCart(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
function writeCart(lines: CartLine[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("window-cart-change"));
}
export function addToCart(id: string, qty = 1) {
  const lines = getCart();
  const existing = lines.find((l) => l.id === id);
  if (existing) existing.qty += qty;
  else lines.push({ id, qty });
  writeCart(lines);
}
export function setQty(id: string, qty: number) {
  let lines = getCart();
  if (qty <= 0) lines = lines.filter((l) => l.id !== id);
  else lines = lines.map((l) => (l.id === id ? { ...l, qty } : l));
  writeCart(lines);
}
export function removeFromCart(id: string) {
  writeCart(getCart().filter((l) => l.id !== id));
}
export function clearCart() {
  writeCart([]);
}
export function cartCount(): number {
  return getCart().reduce((n, l) => n + l.qty, 0);
}
export function cartDetailed() {
  return getCart()
    .map((l) => {
      const product = getProduct(l.id);
      return product ? { ...product, qty: l.qty } : null;
    })
    .filter(Boolean) as (WindowProduct & { qty: number })[];
}
