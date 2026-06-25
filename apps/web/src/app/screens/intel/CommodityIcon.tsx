import {
  DuotoneWheat, DuotoneSprout, DuotoneLightning, DuotoneConstruction,
  DuotoneBarChart, DuotoneFork, DuotoneTag,
  type DuotoneIconProps,
} from "../../components/DuotoneIcon";

type IconCmp = (props: DuotoneIconProps) => JSX.Element;

const ICONS: Record<string, IconCmp> = {
  maize: DuotoneWheat,
  wheat: DuotoneWheat,
  sorghum: DuotoneWheat,
  soybean: DuotoneSprout,
  groundnuts: DuotoneSprout,
  cassava: DuotoneSprout,
  cotton: DuotoneSprout,
  sunflower: DuotoneSprout,
  fuel: DuotoneLightning,
  copper: DuotoneBarChart,
  zinc: DuotoneBarChart,
  cement: DuotoneConstruction,
  sugar: DuotoneFork,
};

/** Renders the Duotone icon for a commodity / crop id. */
export function CommodityIcon({ id, ...props }: DuotoneIconProps & { id?: string }) {
  const Cmp = (id && ICONS[id]) || DuotoneTag;
  return <Cmp {...props} />;
}
