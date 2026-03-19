export interface Product {
  id: number;
  name: string;
  seller: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  category?: string;
  currency?: string;
  description?: string;
  descriptionExtended?: string;
  features?: string[];
  hasDemo?: boolean;
  inStock?: boolean;
  commission?: number;
  images?: string[];
  sellerAvatar?: string;
  sellerVerified?: boolean;
  sellerRating?: number;
  sellerTransactions?: number;
  stats?: Array<{
    icon: string;
    label: string;
    value: string;
    color: string;
  }>;
  performance?: Array<{
    label: string;
    value: string;
    type: string;
    subtitle?: string;
  }>;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pro Noise-Cancelling Headphones",
    seller: "AudioTech Store",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3Mzg1NzU0NHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Hot",
    category: "LIVE PROOF",
    currency: "USD",
    description: "Professional-grade wireless headphones with active noise cancellation technology. Premium audio quality meets sophisticated design for the ultimate listening experience.",
    descriptionExtended: "Our solution delivers crystal-clear sound with deep bass response and extended battery life. Perfect for professionals, travelers, and audiophiles seeking premium audio performance.",
    features: [
      "Active Noise Cancellation (ANC)",
      "40-Hour Battery Life",
      "Premium Sound Drivers",
    ],
    hasDemo: true,
    inStock: true,
    commission: 5,
    images: [
      "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3Mzg1NzU0NHww&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.9,
    sellerTransactions: 1200,
    stats: [
      { icon: "zap", label: "Fast Shipping", value: "2-Day Delivery", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Warranty", value: "2 Year Coverage", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Customer Satisfaction", value: "+96.8%", type: "chart" },
      { label: "Units Sold", value: "8.4k", subtitle: "Total units sold across the Kleench marketplace this quarter.", type: "text" },
    ],
  },
  {
    id: 2,
    name: "Premium Leather Sneakers",
    seller: "Street Kicks Co.",
    price: 119.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc25lYWtlcnMlMjBzaG9lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "TRENDING",
    currency: "USD",
    description: "Handcrafted premium leather sneakers combining classic style with modern comfort. Built to last with superior materials and meticulous attention to detail.",
    descriptionExtended: "Each pair is carefully constructed using full-grain leather and features our signature comfort insole. Perfect for casual wear or smart-casual occasions.",
    features: [
      "Full-Grain Leather Upper",
      "Memory Foam Insole",
      "Handcrafted Quality",
    ],
    hasDemo: false,
    inStock: true,
    commission: 8,
    images: [
      "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc25lYWtlcnMlMjBzaG9lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.7,
    sellerTransactions: 856,
    stats: [
      { icon: "zap", label: "Craftsmanship", value: "Handmade", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Material", value: "100% Leather", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Q3 Performance", value: "+18.2%", type: "chart" },
      { label: "Happy Customers", value: "2.1k", subtitle: "Verified buyers who rated 5 stars this month.", type: "text" },
    ],
  },
  {
    id: 3,
    name: "Minimalist Wrist Watch",
    seller: "TimePiece Lab",
    price: 74.99,
    originalPrice: 99.00,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1758887952896-8491d393afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2F0Y2glMjB3cmlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "BEST SELLER",
    currency: "USD",
    description: "Elegant minimalist timepiece featuring Japanese quartz movement and scratch-resistant sapphire crystal. Timeless design that complements any outfit.",
    descriptionExtended: "Water-resistant construction with genuine leather strap. Perfect for everyday wear with a sophisticated aesthetic that never goes out of style.",
    features: [
      "Japanese Quartz Movement",
      "Sapphire Crystal Glass",
      "Water Resistant 50M",
    ],
    hasDemo: true,
    inStock: true,
    commission: 6,
    images: [
      "https://images.unsplash.com/photo-1758887952896-8491d393afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2F0Y2glMjB3cmlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.9,
    sellerTransactions: 1456,
    stats: [
      { icon: "zap", label: "Precision", value: "±15s/month", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Warranty", value: "3 Year Global", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Customer Retention", value: "+92.5%", type: "chart" },
      { label: "Reviews", value: "3.8k", subtitle: "Verified customer reviews with an average of 4.9 stars.", type: "text" },
    ],
  },
  {
    id: 4,
    name: "Glow Skincare Set",
    seller: "Pure Botanics",
    price: 44.50,
    originalPrice: null,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3QlMjBmbGF0bGF5fGVufDF8fHx8MTc3MzgwMzQyM3ww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "New",
    category: "NEW ARRIVAL",
    currency: "USD",
    description: "Complete skincare regimen featuring natural botanical ingredients. Achieve radiant, healthy-looking skin with our scientifically formulated set.",
    descriptionExtended: "Includes cleanser, toner, serum, and moisturizer. All products are cruelty-free, vegan, and suitable for all skin types.",
    features: [
      "100% Natural Ingredients",
      "Dermatologist Tested",
      "Cruelty-Free & Vegan",
    ],
    hasDemo: false,
    inStock: true,
    commission: 10,
    images: [
      "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3QlMjBmbGF0bGF5fGVufDF8fHx8MTc3MzgwMzQyM3ww&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.8,
    sellerTransactions: 643,
    stats: [
      { icon: "zap", label: "Results", value: "7-14 Days", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Guarantee", value: "30-Day Money Back", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Repeat Purchase", value: "+84.3%", type: "chart" },
      { label: "Happy Skin", value: "1.2k", subtitle: "Customers reporting visible improvements in skin health.", type: "text" },
    ],
  },
  {
    id: 5,
    name: "Urban Laptop Backpack",
    seller: "CarryOn Goods",
    price: 59.00,
    originalPrice: 79.00,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1585501954260-372cec60d355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBiYWNrcGFjayUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "POPULAR",
    currency: "USD",
    description: "Versatile urban backpack designed for modern professionals and students. Features dedicated laptop compartment and smart organizational pockets.",
    descriptionExtended: "Water-resistant exterior with padded shoulder straps for all-day comfort. Fits laptops up to 15.6 inches and includes USB charging port.",
    features: [
      "15.6\" Laptop Compartment",
      "USB Charging Port",
      "Water-Resistant Fabric",
    ],
    hasDemo: true,
    inStock: true,
    commission: 7,
    images: [
      "https://images.unsplash.com/photo-1585501954260-372cec60d355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBiYWNrcGFjayUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI2fDA&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.6,
    sellerTransactions: 987,
    stats: [
      { icon: "zap", label: "Capacity", value: "25L Volume", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Durability", value: "5-Year Warranty", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Sales Growth", value: "+31.6%", type: "chart" },
      { label: "Daily Commuters", value: "4.2k", subtitle: "Professionals using this backpack for their daily commute.", type: "text" },
    ],
  },
  {
    id: 6,
    name: "Retro UV Sunglasses",
    seller: "LensWorld",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1701619791284-41cbd4e1e1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHN1bmdsYXNzZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc3MzkwOTUyN3ww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Hot",
    category: "TRENDING",
    currency: "USD",
    description: "Classic retro-inspired sunglasses with 100% UV protection. Combines vintage aesthetics with modern lens technology for superior eye protection.",
    descriptionExtended: "Lightweight acetate frames with polarized lenses that reduce glare. Perfect for driving, beach days, and outdoor activities.",
    features: [
      "100% UV Protection",
      "Polarized Lenses",
      "Lightweight Acetate Frame",
    ],
    hasDemo: false,
    inStock: true,
    commission: 9,
    images: [
      "https://images.unsplash.com/photo-1701619791284-41cbd4e1e1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHN1bmdsYXNzZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc3MzkwOTUyN3ww&ixlib=rb-4.1.0&q=80&w=400",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=800&fit=crop",
    ],
    sellerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: true,
    sellerRating: 4.7,
    sellerTransactions: 754,
    stats: [
      { icon: "zap", label: "UV Protection", value: "100% UVA/UVB", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Quality", value: "Premium Lenses", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: [
      { label: "Summer Sales", value: "+67.4%", type: "chart" },
      { label: "Style Rating", value: "9.2/10", subtitle: "Average style score from verified fashion reviewers.", type: "text" },
    ],
  },
];
