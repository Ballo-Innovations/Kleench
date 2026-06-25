// ── Market Intelligence data module ──
// Powers the Market Intelligence flow reached from the Marketplace
// "MARKET INTELLIGENCE" section. Mock data only — no network.

export type CommodityCategory = "crops" | "livestock" | "inputs" | "metals" | "energy" | "others";

export type MarketPoint = { city: string; price: number; change: string; up: boolean };

export type Commodity = {
  id: string;
  name: string;          // "MAIZE"
  variety: string;       // "White Maize"
  unit: string;          // "per 50kg bag"
  category: CommodityCategory;
  group: string;         // friendly label, e.g. "Crops"
  price: string;         // display price e.g. "ZMW 6,500"
  priceNum: number;      // numeric for charts
  prev: string;          // last period display
  change: string;        // "+2.4%"
  changeAbs: string;     // "-ZMW 150"
  up: boolean;
  volatility: "Low" | "Moderate" | "High";
  color: string;         // chart line colour
  spark: number[];       // small sparkline series
  trend: number[];       // 30-day trend series
  lowest: { place: string; price: string };
  highest: { place: string; price: string };
  markets: MarketPoint[];
  context: string;
  summary: string[];     // market tab bullets
  supply: number;        // 0..100 (supply vs demand balance)
  outlook: string;
  source: string;
  news: { title: string; source: string; date: string }[];
  topStory: { title: string; body: string };
};

const MAIZE_MARKETS: MarketPoint[] = [
  { city: "Choma", price: 5300, change: "-3.6%", up: false },
  { city: "Livingstone", price: 5700, change: "-2.9%", up: false },
  { city: "Monze", price: 5700, change: "-2.9%", up: false },
  { city: "Kalomo", price: 5750, change: "-1.5%", up: false },
  { city: "Kabwe", price: 5800, change: "-1.8%", up: false },
  { city: "Kapiri", price: 5850, change: "-1.3%", up: false },
  { city: "Ndola", price: 5900, change: "-1.1%", up: false },
  { city: "Lusaka", price: 6100, change: "-1.2%", up: false },
  { city: "Solwezi", price: 6150, change: "-2.2%", up: false },
  { city: "Kitwe", price: 6200, change: "-2.1%", up: false },
  { city: "Chingola", price: 6200, change: "-2.1%", up: false },
  { city: "Kasama", price: 7200, change: "+0.6%", up: true },
  { city: "Mansa", price: 7800, change: "+0.6%", up: true },
];

export const COMMODITIES: Commodity[] = [
  {
    id: "maize",
    name: "MAIZE", variety: "White Maize", unit: "per 50kg bag",
    category: "crops", group: "Crops",
    price: "ZMW 6,500", priceNum: 6500, prev: "ZMW 6,650",
    change: "-2.3%", changeAbs: "-ZMW 150", up: false, volatility: "High",
    color: "#00695C",
    spark: [6650, 6620, 6590, 6560, 6530, 6510, 6500],
    trend: [6650, 6630, 6600, 6570, 6540, 6520, 6510, 6500],
    lowest: { place: "Choma", price: "ZMW 5,300" },
    highest: { place: "Mansa", price: "ZMW 7,800" },
    markets: MAIZE_MARKETS,
    context: "Maize prices eased this week as early harvest supply reached major depots. Strategic reserves remain above buffer levels.",
    summary: [
      "Maize price decreased by 2.3% compared to last week.",
      "Lowest price in Choma (ZMW 5,300 / 50kg).",
      "Highest price in Mansa (ZMW 7,800 / 50kg).",
    ],
    supply: 58,
    outlook: "Prices expected to remain stable with a slight increase in demand.",
    source: "FRA / ZABS Market Reports",
    news: [
      { title: "Expected maize production for 2024/2025 agricultural season rises", source: "Zambia Statistics Agency", date: "May 30, 2026" },
      { title: "Zambia projected to record a maize surplus of over 500,000 metric tonnes", source: "Zambia Statistics Agency", date: "May 28, 2026" },
      { title: "Govt lifts maize export ban", source: "Diggers", date: "May 26, 2026" },
    ],
    topStory: {
      title: "FRA to Buy 500,000 Tonnes of Maize in 2026/27",
      body: "The Food Reserve Agency (FRA) will purchase a minimum of 500,000 metric tonnes of white maize and 10,000 metric tonnes of paddy rice during the 2026/2027 crop marketing season. FRA Secretary William Silwimba says the crop marketing exercise will run from May 1, 2026 to October 31, 2026, subject to market conditions. Mr. Silwimba says the agency will open at least 1,700 satellite depots across 116 districts to facilitate the buying process and enhance accessibility for farmers.",
    },
  },
  {
    id: "soybean",
    name: "SOYBEAN", variety: "Grade A Soya", unit: "per 50kg bag",
    category: "crops", group: "Crops",
    price: "ZMW 410", priceNum: 410, prev: "ZMW 403",
    change: "+1.7%", changeAbs: "+ZMW 7", up: true, volatility: "Moderate",
    color: "#FF8C00",
    spark: [403, 404, 405, 406, 407, 408, 410],
    trend: [403, 404, 405, 406, 407, 408, 409, 410],
    lowest: { place: "Mongu", price: "ZMW 360" },
    highest: { place: "Chipata", price: "ZMW 470" },
    markets: [
      { city: "Chipata", price: 470, change: "+2.1%", up: true },
      { city: "Lusaka", price: 425, change: "+1.4%", up: true },
      { city: "Kabwe", price: 415, change: "+0.9%", up: true },
      { city: "Mkushi", price: 400, change: "+1.0%", up: true },
      { city: "Mongu", price: 360, change: "-0.5%", up: false },
    ],
    context: "Soybean demand from local crushers continues to climb, supporting firmer farm-gate prices in the eastern belt.",
    summary: [
      "Soybean price increased by 1.7% compared to last week.",
      "Lowest price in Mongu (ZMW 360 / 50kg).",
      "Highest price in Chipata (ZMW 470 / 50kg).",
    ],
    supply: 44,
    outlook: "Demand from processors expected to keep prices firm over the next two weeks.",
    source: "ZABS / Grain Traders Association",
    news: [
      { title: "Soybean crushing capacity expands in Lusaka province", source: "Zambia Statistics Agency", date: "May 29, 2026" },
      { title: "Export demand lifts soya farm-gate prices", source: "Diggers", date: "May 25, 2026" },
    ],
    topStory: {
      title: "Local Crushers Drive Soybean Demand",
      body: "Increased local crushing capacity is keeping soybean demand strong heading into the new marketing season, with processors competing for available stock across the eastern and central provinces.",
    },
  },
  {
    id: "fuel",
    name: "FUEL", variety: "Petrol (Unleaded)", unit: "per litre",
    category: "energy", group: "Energy",
    price: "K29.50", priceNum: 29.5, prev: "K31.00",
    change: "-4.8%", changeAbs: "-K1.50", up: false, volatility: "High",
    color: "#DC2626",
    spark: [31.0, 30.8, 30.5, 30.2, 29.9, 29.7, 29.5],
    trend: [31.0, 30.8, 30.6, 30.3, 30.0, 29.8, 29.6, 29.5],
    lowest: { place: "Lusaka", price: "K29.50" },
    highest: { place: "Mwinilunga", price: "K33.10" },
    markets: [
      { city: "Lusaka", price: 29.5, change: "-4.8%", up: false },
      { city: "Kitwe", price: 30.1, change: "-3.9%", up: false },
      { city: "Livingstone", price: 30.6, change: "-3.2%", up: false },
      { city: "Solwezi", price: 31.8, change: "-2.1%", up: false },
      { city: "Mwinilunga", price: 33.1, change: "-1.4%", up: false },
    ],
    context: "ERB reduced pump prices following a drop in global crude oil prices. Diesel remains unchanged at K28.90/litre.",
    summary: [
      "Fuel price decreased by 4.8% compared to last month.",
      "Lowest price in Lusaka (K29.50 / litre).",
      "Highest price in Mwinilunga (K33.10 / litre).",
    ],
    supply: 70,
    outlook: "Pump prices likely to hold steady pending the next ERB review.",
    source: "ERB Zambia Price Regulation Bulletin",
    news: [
      { title: "ERB cuts fuel pump price for June", source: "Energy Regulation Board", date: "May 29, 2026" },
      { title: "Global crude eases on improved supply outlook", source: "Diggers", date: "May 24, 2026" },
    ],
    topStory: {
      title: "ERB Announces June Pump Price Reduction",
      body: "The Energy Regulation Board has announced a K1.50 reduction in the petrol pump price effective June 1, citing softer global crude oil prices and a stable kwacha during the review window.",
    },
  },
  {
    id: "copper",
    name: "COPPER", variety: "Grade A Cathode", unit: "per metric tonne (USD)",
    category: "metals", group: "Metals",
    price: "$8,965", priceNum: 8965, prev: "$9,046",
    change: "-0.9%", changeAbs: "-$81", up: false, volatility: "Moderate",
    color: "#515D84",
    spark: [9046, 9030, 9012, 8998, 8988, 8975, 8965],
    trend: [9046, 9036, 9020, 9008, 8996, 8984, 8974, 8965],
    lowest: { place: "Spot", price: "$8,965" },
    highest: { place: "3M Future", price: "$9,120" },
    markets: [
      { city: "LME Spot", price: 8965, change: "-0.9%", up: false },
      { city: "LME 3M", price: 9120, change: "-0.4%", up: false },
      { city: "Shanghai", price: 9080, change: "-0.6%", up: false },
    ],
    context: "Copper softened on a stronger dollar, though Zambian output from the Copperbelt remains steady on improved power supply.",
    summary: [
      "Copper price decreased by 0.9% compared to last week.",
      "Spot price at $8,965 per tonne.",
      "3-month future trading at $9,120 per tonne.",
    ],
    supply: 52,
    outlook: "Prices expected to range-trade pending Chinese demand signals.",
    source: "London Metal Exchange (LME)",
    news: [
      { title: "Copperbelt output steadies on improved power supply", source: "Diggers", date: "May 27, 2026" },
      { title: "Dollar strength weighs on base metals", source: "Reuters", date: "May 23, 2026" },
    ],
    topStory: {
      title: "Zambian Copper Output Holds Firm",
      body: "Improved electricity supply to Copperbelt mines has helped stabilise Zambian copper production even as global prices ease on a firmer US dollar and mixed demand signals from China.",
    },
  },
  {
    id: "cement",
    name: "CEMENT", variety: "Portland 32.5N", unit: "per 50kg bag",
    category: "inputs", group: "Inputs",
    price: "K125", priceNum: 125, prev: "K129",
    change: "-3.2%", changeAbs: "-K4", up: false, volatility: "Low",
    color: "#515D84",
    spark: [129, 128.5, 128, 127.2, 126.5, 125.8, 125],
    trend: [129, 128.5, 128, 127.4, 126.8, 126.2, 125.6, 125],
    lowest: { place: "Lusaka", price: "K118" },
    highest: { place: "Kasama", price: "K150" },
    markets: [
      { city: "Lusaka", price: 118, change: "-3.4%", up: false },
      { city: "Kitwe", price: 124, change: "-3.1%", up: false },
      { city: "Ndola", price: 126, change: "-2.8%", up: false },
      { city: "Kasama", price: 150, change: "-1.2%", up: false },
    ],
    context: "Cement prices softened after producers increased capacity. Bulk buyers can negotiate lower rates.",
    summary: [
      "Cement price decreased by 3.2% compared to last week.",
      "Lowest price in Lusaka (K118 / 50kg).",
      "Highest price in Kasama (K150 / 50kg).",
    ],
    supply: 76,
    outlook: "Ample supply expected to keep prices soft through the quarter.",
    source: "ZABS / Construction Industry Council",
    news: [
      { title: "Local producers ramp up cement capacity", source: "Zambia Statistics Agency", date: "May 28, 2026" },
      { title: "Construction demand steady in Q2", source: "Diggers", date: "May 22, 2026" },
    ],
    topStory: {
      title: "Cement Supply Outpaces Demand",
      body: "Expanded production capacity from major manufacturers has pushed cement supply ahead of current construction demand, giving bulk buyers room to negotiate better rates.",
    },
  },
  {
    id: "sugar",
    name: "SUGAR", variety: "Brown / Refined", unit: "per 50kg bag",
    category: "inputs", group: "Inputs",
    price: "K450", priceNum: 450, prev: "K438",
    change: "+2.6%", changeAbs: "+K12", up: true, volatility: "Moderate",
    color: "#FF8C00",
    spark: [438, 440, 442, 444, 446, 448, 450],
    trend: [438, 439, 441, 443, 445, 447, 449, 450],
    lowest: { place: "Mazabuka", price: "K420" },
    highest: { place: "Kasama", price: "K490" },
    markets: [
      { city: "Mazabuka", price: 420, change: "+1.8%", up: true },
      { city: "Lusaka", price: 450, change: "+2.6%", up: true },
      { city: "Kitwe", price: 465, change: "+2.2%", up: true },
      { city: "Kasama", price: 490, change: "+1.1%", up: true },
    ],
    context: "Sugar prices firmed on stronger seasonal demand ahead of festive production cycles.",
    summary: [
      "Sugar price increased by 2.6% compared to last week.",
      "Lowest price in Mazabuka (K420 / 50kg).",
      "Highest price in Kasama (K490 / 50kg).",
    ],
    supply: 40,
    outlook: "Seasonal demand expected to keep prices firm in the near term.",
    source: "ZABS / Millers Association",
    news: [
      { title: "Seasonal demand lifts sugar prices", source: "Zambia Statistics Agency", date: "May 26, 2026" },
      { title: "Millers report steady output", source: "Diggers", date: "May 21, 2026" },
    ],
    topStory: {
      title: "Festive Demand Firms Up Sugar Prices",
      body: "Sugar prices are edging higher as wholesalers build stock ahead of the festive production season, with refined grades seeing the strongest demand in urban markets.",
    },
  },
  {
    id: "zinc",
    name: "ZINC", variety: "SHG 99.995%", unit: "per metric tonne (USD)",
    category: "metals", group: "Metals",
    price: "$2,640", priceNum: 2640, prev: "$2,548",
    change: "+3.6%", changeAbs: "+$92", up: true, volatility: "High",
    color: "#00695C",
    spark: [2548, 2560, 2582, 2600, 2620, 2634, 2640],
    trend: [2548, 2562, 2580, 2600, 2618, 2630, 2638, 2640],
    lowest: { place: "Spot", price: "$2,640" },
    highest: { place: "3M Future", price: "$2,710" },
    markets: [
      { city: "LME Spot", price: 2640, change: "+3.6%", up: true },
      { city: "LME 3M", price: 2710, change: "+2.9%", up: true },
      { city: "Shanghai", price: 2680, change: "+3.1%", up: true },
    ],
    context: "Zinc rallied amid supply disruptions in major producing regions. Zambia's output from NFC Africa remains steady.",
    summary: [
      "Zinc price increased by 3.6% compared to last week.",
      "Spot price at $2,640 per tonne.",
      "3-month future trading at $2,710 per tonne.",
    ],
    supply: 34,
    outlook: "Tight supply expected to keep prices supported in the short term.",
    source: "London Metal Exchange (LME)",
    news: [
      { title: "Zinc exports hit 3-year high on LME rally", source: "Reuters", date: "May 27, 2026" },
      { title: "Supply disruptions tighten global zinc market", source: "Diggers", date: "May 20, 2026" },
    ],
    topStory: {
      title: "Zinc Rallies on Supply Squeeze",
      body: "Global zinc prices have climbed to a three-year high as supply disruptions at major mines tighten the market, boosting export earnings for Zambian producers.",
    },
  },
];

export function getCommodity(id?: string): Commodity {
  return COMMODITIES.find((c) => c.id === id) ?? COMMODITIES[0];
}

// ── Categories used in the hub "Crop Category" view (4.1.4) ──
export type CropRow = { id: string; name: string; group: string; category: CommodityCategory; note: string };

export const CROP_ROWS: CropRow[] = [
  { id: "maize", name: "Maize", group: "Crops", category: "crops", note: "Staple grain" },
  { id: "soybean", name: "Soybeans", group: "Crops", category: "crops", note: "Oilseed legume" },
  { id: "wheat", name: "Wheat", group: "Crops", category: "crops", note: "Winter cereal" },
  { id: "groundnuts", name: "Groundnuts", group: "Crops", category: "crops", note: "Oilseed legume" },
  { id: "cassava", name: "Cassava", group: "Crops", category: "crops", note: "Root tuber" },
  { id: "cotton", name: "Cotton", group: "Crops", category: "crops", note: "Cash crop" },
  { id: "sunflower", name: "Sunflower", group: "Crops", category: "crops", note: "Oilseed crop" },
  { id: "sorghum", name: "Sorghum", group: "Crops", category: "crops", note: "Drought cereal" },
];

export const CROP_FILTERS = ["All", "Crops", "Livestock", "Inputs", "Others"] as const;

// ── Multi-series data for the Price Trend Overview (4.1.1) ──
export const TREND_SERIES = COMMODITIES.map((c) => ({
  id: c.id,
  label: c.name.charAt(0) + c.name.slice(1).toLowerCase(),
  color: c.color,
  data: c.trend,
}));

export const TREND_AXIS = ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec", "Now"];

// ── Hub headline stats (4.1.0) ──
export const HUB_STATS = [
  { label: "Monitored Products", value: "24" },
  { label: "Area Covered", value: "156" },
  { label: "Price Updates Today", value: "1,248" },
];

// ── Saved price alerts (4.1.8 Product Alert) ──
export type PriceAlert = { id: string; product: string; location: string; condition: string; price: string; on: boolean };

export const DEFAULT_ALERTS: PriceAlert[] = [
  { id: "a1", product: "Copper – Kasempa", location: "Kasempa", condition: "Below", price: "ZMW 1,342,000 / Copper Plate", on: false },
  { id: "a2", product: "Cement – Ndola", location: "Ndola", condition: "Below", price: "ZMW 175 / 25kg", on: true },
];
