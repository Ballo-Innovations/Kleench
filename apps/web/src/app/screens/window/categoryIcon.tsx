import {
  DuotoneSmartphone, DuotoneTag, DuotoneBuilding, DuotoneHeart,
  DuotoneTruck, DuotoneWheat, DuotoneFileText, DuotoneConstruction, DuotoneImageIcon,
} from "../../components/DuotoneIcon";

const MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  smartphone: DuotoneSmartphone,
  tag: DuotoneTag,
  building: DuotoneBuilding,
  heart: DuotoneHeart,
  truck: DuotoneTruck,
  wheat: DuotoneWheat,
  filetext: DuotoneFileText,
  construction: DuotoneConstruction,
  image: DuotoneImageIcon,
};

export function CategoryIcon({ icon, size = 22, className }: { icon: string; size?: number; className?: string }) {
  const Icon = MAP[icon] || DuotoneTag;
  return <Icon size={size} className={className} />;
}
