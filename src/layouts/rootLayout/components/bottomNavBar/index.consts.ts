import {
  BriefcaseIcon,
  CodeIcon,
  ContactRound,
  GraduationCapIcon,
  MapIcon,
  PenIcon,
} from "lucide-react";

import { Route as contactRoute } from "@/routes/_app/contact";
import { Route as mapRoute } from "@/routes/_app/map";
import { Route as projectsRoute } from "@/routes/_app/projects";
import { Route as studyRoute } from "@/routes/_app/study";
import { Route as workRoute } from "@/routes/_app/work";
import { Route as writingRoute } from "@/routes/_app/writing";

const CONTACT_LINK = {
  label: "Contact",
  to: contactRoute.to,
  icon: ContactRound,
} as const;

const NAV_LINKS = [
  {
    label: "Work",
    to: workRoute.to,
    icon: BriefcaseIcon,
  },
  {
    label: "Writing",
    to: writingRoute.to,
    icon: PenIcon,
  },
  {
    label: "Projects",
    to: projectsRoute.to,
    icon: CodeIcon,
  },
  {
    label: "Study",
    to: studyRoute.to,
    icon: GraduationCapIcon,
  },
  {
    label: "Map",
    to: mapRoute.to,
    icon: MapIcon,
  },
] as const;

const SPRING = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  mass: 0.85,
};

export { CONTACT_LINK, NAV_LINKS, SPRING };
