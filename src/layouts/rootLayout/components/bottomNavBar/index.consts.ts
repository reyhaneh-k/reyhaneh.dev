import {
  BriefcaseIcon,
  GraduationCapIcon,
  PenIcon,
  MapIcon,
  ContactRoundIcon,
} from "lucide-react";

const NAV_LINKS: {
  label: string;
  href: string;
  icon: React.ElementType;
}[] = [
  {
    label: "Work",
    href: "/work",
    icon: BriefcaseIcon,
  },
  {
    label: "Writing",
    href: "/writing",
    icon: PenIcon,
  },
  {
    label: "Study",
    href: "/study",
    icon: GraduationCapIcon,
  },

  { label: "Map", href: "/map", icon: MapIcon },
  {
    label: "Contact",
    href: "/contact",
    icon: ContactRoundIcon,
  },
];

export { NAV_LINKS };
