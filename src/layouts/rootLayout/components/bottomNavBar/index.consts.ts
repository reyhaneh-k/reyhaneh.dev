import {
  BriefcaseIcon,
  GraduationCapIcon,
  PenIcon,
  MapIcon,
  CodeIcon,
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
    label: "Projects",
    href: "/projects",
    icon: CodeIcon,
  },
];

export { NAV_LINKS };
