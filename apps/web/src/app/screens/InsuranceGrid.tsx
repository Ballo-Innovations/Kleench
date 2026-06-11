import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, Heart, Car, Home, MoreHorizontal,
  Flame, Truck, Activity, Baby, Eye, Smile,
  Building2, Warehouse, KeyRound, Landmark,
  Plane, Anchor, Sprout, Scale, Crop,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";

type TileItem = { id: string; label: string; icon: React.ElementType; color: string; category: string };

const ALL_TILES: TileItem[] = [
  // Motor
  { id: "comprehensive", label: "Comprehensive", icon: ShieldCheck, color: "#0077B6", category: "motor" },
  { id: "third-party", label: "Third Party", icon: Car, color: "#0077B6", category: "motor" },
  { id: "fire-theft", label: "Fire & Theft", icon: Flame, color: "#0077B6", category: "motor" },
  { id: "commercial-motor", label: "Commercial Motor", icon: Truck, color: "#0077B6", category: "motor" },
  // Health
  { id: "individual-health", label: "Individual Plan", icon: Activity, color: "#DC2626", category: "health" },
  { id: "family-health", label: "Family Plan", icon: Heart, color: "#DC2626", category: "health" },
  { id: "critical-illness", label: "Critical Illness", icon: ShieldCheck, color: "#DC2626", category: "health" },
  { id: "dental", label: "Dental Cover", icon: Smile, color: "#DC2626", category: "health" },
  { id: "vision", label: "Vision Care", icon: Eye, color: "#DC2626", category: "health" },
  { id: "child-health", label: "Child Plan", icon: Baby, color: "#DC2626", category: "health" },
  // Life
  { id: "term-life", label: "Term Life", icon: ShieldCheck, color: "#059669", category: "life" },
  { id: "whole-life", label: "Whole Life", icon: Heart, color: "#059669", category: "life" },
  { id: "group-life", label: "Group Life", icon: Landmark, color: "#059669", category: "life" },
  { id: "funeral", label: "Funeral Cover", icon: Activity, color: "#059669", category: "life" },
  // Property
  { id: "home", label: "Home Insurance", icon: Home, color: "#7C3AED", category: "property" },
  { id: "building", label: "Building Cover", icon: Building2, color: "#7C3AED", category: "property" },
  { id: "contents", label: "Contents Cover", icon: Warehouse, color: "#7C3AED", category: "property" },
  { id: "landlord", label: "Landlord Cover", icon: KeyRound, color: "#7C3AED", category: "property" },
  // Others
  { id: "travel", label: "Travel Insurance", icon: Plane, color: "#D97706", category: "others" },
  { id: "marine", label: "Marine Insurance", icon: Anchor, color: "#D97706", category: "others" },
  { id: "agriculture", label: "Agriculture", icon: Sprout, color: "#D97706", category: "others" },
  { id: "liability", label: "Public Liability", icon: Scale, color: "#D97706", category: "others" },
  { id: "crop", label: "Crop Insurance", icon: Crop, color: "#D97706", category: "others" },
];

const TABS = [
  { id: "all", label: "All", icon: ShieldCheck },
  { id: "motor", label: "Motor", icon: Car },
  { id: "health", label: "Health", icon: Heart },
  { id: "life", label: "Life", icon: ShieldCheck },
  { id: "property", label: "Property", icon: Home },
  { id: "others", label: "Others", icon: MoreHorizontal },
];

const CATEGORY_COLORS: Record<string, string> = {
  motor: "#0077B6",
  health: "#DC2626",
  life: "#059669",
  property: "#7C3AED",
  others: "#D97706",
};

export function InsuranceGrid() {
  const navigate = useNavigate();
  const [active, setActive] = useState("all");

  const visible = active === "all" ? ALL_TILES : ALL_TILES.filter((t) => t.category === active);
  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="INSURANCE" subtitle="Essential Services" showBack />

      <div className="pt-5 space-y-5">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto px-5 pb-1" style={{ scrollbarWidth: "none" }}>
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            const color = id === "all" ? "var(--color-primary)" : CATEGORY_COLORS[id];
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                  isActive
                    ? "border-[var(--app-text)] shadow-[3px_3px_0_var(--app-text)]"
                    : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
                style={isActive ? { backgroundColor: color + "18", borderColor: "var(--app-text)" } : {}}
              >
                <Icon
                  size={13}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? color : "var(--color-secondary)" }}
                />
                <span
                  className="text-[11px] font-black uppercase tracking-wide"
                  style={{ color: isActive ? color : "var(--color-secondary)" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section label */}
        <div className="px-5 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/40">
            {active === "all" ? `All Products — ${visible.length}` : `${TABS.find(t => t.id === active)?.label} — ${visible.length} products`}
          </p>
        </div>

        {/* Tile Grid */}
        <div className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {visible.map((tile, i) => (
                <motion.button
                  key={tile.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => navigate("/insurance/type", { state: { category: tile.category, subtype: tile.id } })}
                  className="bg-[var(--app-bg)] rounded-3xl p-5 flex flex-col items-center justify-center gap-3 border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-left"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: tile.color + "18" }}
                  >
                    <tile.icon size={28} style={{ color: tile.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide text-center leading-tight">
                    {tile.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info strip */}
        <div className="mx-5 bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60 leading-snug">
            All products are regulated by the <span className="font-black text-[var(--color-secondary)]">Pensions and Insurance Authority (PIA)</span> of Zambia.
          </p>
        </div>
      </div>
    </div>
  );
}
