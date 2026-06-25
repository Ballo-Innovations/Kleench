import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { getCommodity } from "../../data/marketIntel";

const MARKET_COORDS: Record<string, [number, number]> = {
  Livingstone: [-17.8419, 25.8543],
  Choma: [-16.8065, 26.9531],
  Kalomo: [-17.0311, 26.4833],
  Monze: [-16.2833, 27.4833],
  Lusaka: [-15.3875, 28.3228],
  Kabwe: [-14.4469, 28.4464],
  Kapiri: [-13.9715, 28.6809],
  Ndola: [-12.9587, 28.6366],
  Kitwe: [-12.8232, 28.2170],
  Chingola: [-12.5289, 27.8838],
  Solwezi: [-12.1688, 26.3894],
  Kasama: [-10.2129, 31.1808],
  Mansa: [-11.1998, 28.8943],
  Chipata: [-13.6333, 32.6500],
  Mongu: [-15.2484, 23.1274],
  Mkushi: [-13.6202, 29.3939],
  Mazabuka: [-15.8560, 27.7480],
  Mwinilunga: [-11.7358, 24.4293],
  "LME Spot": [-15.3875, 28.3228],
  "LME 3M": [-12.9587, 28.6366],
  Shanghai: [-13.6333, 32.6500],
};

function formatPrice(prefix: string, price: number) {
  if (prefix === "$" || prefix === "K") return `${prefix}${price.toLocaleString()}`;
  return `${prefix} ${price.toLocaleString()}`;
}

export function CommodityMap() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = getCommodity(id);
  const [selectedCity, setSelectedCity] = useState(() => data.lowest.place);
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const curr = data.unit.includes("USD") ? "$" : data.price.startsWith("K") ? "K" : "ZMW";

  const prices = data.markets.map((m) => m.price);
  const min = Math.min(...prices), max = Math.max(...prices);
  const geoMarkets = useMemo(
    () => data.markets
      .map((m) => ({ ...m, coords: MARKET_COORDS[m.city] }))
      .filter((m): m is typeof m & { coords: [number, number] } => Boolean(m.coords)),
    [data.markets]
  );
  const selectedMarket = geoMarkets.find((m) => m.city === selectedCity) ?? geoMarkets[0];
  const lowestMarket = geoMarkets.find((m) => m.price === min);
  const highestMarket = geoMarkets.find((m) => m.price === max);

  const focusMarket = (city?: string) => {
    if (!city) return;
    setSelectedCity(city);
    const market = geoMarkets.find((m) => m.city === city);
    if (market && mapRef.current) {
      mapRef.current.setView(market.coords, Math.max(mapRef.current.getZoom(), 6), { animate: true });
    }
  };

  useEffect(() => {
    if (!mapEl.current || geoMarkets.length === 0) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapEl.current, {
      zoomControl: false,
      attributionControl: true,
      dragging: true,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 18,
      }
    ).addTo(map);

    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Labels &copy; Esri",
        maxZoom: 18,
        opacity: 0.8,
      }
    ).addTo(map);

    const bounds = L.latLngBounds(geoMarkets.map((m) => m.coords));

    geoMarkets.forEach((market) => {
      const isLow = market.price === min;
      const isHigh = market.price === max;
      const isSelected = market.city === selectedCity;
      const isLabeled = isSelected || isLow || isHigh;
      const color = isLow ? "#00695C" : isHigh ? "#DC2626" : isSelected ? "#515D84" : "#FF8C00";
      const marker = L.circleMarker(market.coords, {
        radius: isSelected ? 8 : isLow || isHigh ? 7 : 5,
        color: "#ffffff",
        weight: isSelected ? 3 : 2,
        fillColor: color,
        fillOpacity: 1,
        interactive: true,
      }).addTo(map);

      marker.on("click", () => setSelectedCity(market.city));

      if (isLabeled) {
        marker.bindTooltip(
          `<div class="intel-map-tooltip">
            <strong>${market.city}</strong>
            <span>${formatPrice(curr, market.price)}</span>
          </div>`,
          {
            permanent: true,
            direction: isLow ? "bottom" : "top",
            offset: [0, isLow ? 10 : -8],
            opacity: 1,
            className: `${isLow ? "is-low" : isHigh ? "is-high" : isSelected ? "is-selected" : "is-standard"}`,
          }
        );
      }
    });

    map.fitBounds(bounds.pad(0.22), { padding: [28, 28], maxZoom: 6 });
    setTimeout(() => map.invalidateSize(), 80);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [curr, geoMarkets, max, min, selectedCity]);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle={`${data.name} Map`} showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Map / List toggle */}
        <div className="flex bg-[var(--app-bg)] border border-[var(--border)] rounded-full shadow-sm overflow-hidden p-1">
          <button className="flex-1 py-2 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-black uppercase tracking-widest">Map View</button>
          <button onClick={() => navigate(`/marketplace/intel/${data.id}/list`)} className="flex-1 py-2 rounded-full text-[var(--app-text)]/50 text-[10px] font-black uppercase tracking-widest">List View</button>
        </div>

        {/* Leaflet map surface */}
        <div className="relative isolate z-0 rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden h-[390px] bg-[var(--muted)]/40">
          <div ref={mapEl} className="absolute inset-0" />
          <div className="absolute left-3 top-3 z-[500] rounded-full bg-[var(--app-bg)]/95 border border-[var(--border)] px-3 py-1.5 shadow-sm">
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[var(--color-secondary)]/60">Zambia Market Prices</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 z-[500] flex gap-2">
            <button onClick={() => focusMarket(lowestMarket?.city)} className="flex-1 rounded-full bg-[var(--app-bg)]/95 border border-[var(--border)] py-2 text-[8px] font-black uppercase tracking-widest text-[#00695C] shadow-sm active:scale-95 transition-all">
              Lowest
            </button>
            <button onClick={() => focusMarket(highestMarket?.city)} className="flex-1 rounded-full bg-[var(--app-bg)]/95 border border-[var(--border)] py-2 text-[8px] font-black uppercase tracking-widest text-[#DC2626] shadow-sm active:scale-95 transition-all">
              Highest
            </button>
            <button onClick={() => navigate(`/marketplace/intel/${data.id}/list`)} className="flex-1 rounded-full bg-[var(--color-primary)] py-2 text-[8px] font-black uppercase tracking-widest text-white shadow-sm active:scale-95 transition-all">
              List
            </button>
          </div>
        </div>

        {selectedMarket && (
          <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[var(--app-text)]/40">Selected Market</p>
                <h3 className="text-[18px] font-black uppercase tracking-tight text-[var(--app-text)] leading-none mt-1">{selectedMarket.city}</h3>
                <p className="text-[10px] font-bold text-[var(--app-text)]/45 mt-1">{data.unit.replace("per ", "")}</p>
              </div>
              <div className="text-right">
                <p className="text-[18px] font-black text-[var(--color-primary)] leading-none">{formatPrice(curr, selectedMarket.price)}</p>
                <span className={`inline-flex items-center justify-end gap-1 mt-2 text-[10px] font-black ${selectedMarket.up ? "text-[#00695C]" : "text-[#DC2626]"}`}>
                  {selectedMarket.up ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
                  {selectedMarket.change}
                </span>
              </div>
            </div>
            <button onClick={() => navigate(`/marketplace/intel/${data.id}/list`)} className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/25 py-2.5 text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)] active:scale-95 transition-all">
              Compare All Markets <ChevronRight size={12} strokeWidth={3} />
            </button>
          </div>
        )}

        <style>{`
          .leaflet-container {
            font-family: var(--font-body), system-ui, sans-serif;
            background: var(--muted);
          }

          .leaflet-control-attribution {
            font-size: 6px;
            font-weight: 800;
            color: rgba(81, 93, 132, 0.65);
            background: rgba(248, 249, 251, 0.82);
            border-radius: 999px 0 0 0;
          }

          .leaflet-control-zoom {
            border: 1px solid var(--border);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
          }

          .leaflet-control-zoom a {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border: 0;
            color: var(--color-secondary);
            background: var(--app-bg);
            font-weight: 900;
          }

          .leaflet-control-zoom a + a {
            border-top: 1px solid var(--border);
          }

          .leaflet-tooltip {
            border: 1px solid var(--border);
            border-radius: 999px;
            box-shadow: var(--shadow-sm);
            padding: 0;
            background: var(--app-bg);
          }

          .leaflet-tooltip::before {
            display: none;
          }

          .leaflet-tooltip.is-low {
            border-color: rgba(0, 105, 92, 0.55);
          }

          .leaflet-tooltip.is-high {
            border-color: rgba(220, 38, 38, 0.55);
          }

          .leaflet-tooltip.is-selected {
            border-color: rgba(81, 93, 132, 0.65);
          }

          .intel-map-tooltip {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 3px 7px;
            line-height: 1;
            white-space: nowrap;
          }

          .intel-map-tooltip strong {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: var(--app-text);
          }

          .intel-map-tooltip span {
            font-size: 8px;
            font-weight: 900;
            color: var(--color-primary);
          }

          .leaflet-tooltip.is-low .intel-map-tooltip span {
            color: #00695C;
          }

          .leaflet-tooltip.is-high .intel-map-tooltip span {
            color: #DC2626;
          }

          .leaflet-tooltip.is-selected .intel-map-tooltip span {
            color: var(--color-secondary);
          }
        `}</style>

        {/* Legend */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm px-4 py-3 flex items-center justify-around">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /><span className="text-[10px] font-black uppercase tracking-widest text-[var(--app-text)]/60">Lowest Price</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /><span className="text-[10px] font-black uppercase tracking-widest text-[var(--app-text)]/60">Highest Price</span></span>
        </div>
      </div>
    </div>
  );
}
