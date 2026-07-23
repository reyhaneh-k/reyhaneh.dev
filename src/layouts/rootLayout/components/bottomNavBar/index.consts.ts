import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  MapIcon,
  PenIcon,
} from "lucide-react";

import { Route as mapRoute } from "@/routes/_app/map";
import { Route as projectsRoute } from "@/routes/_app/projects";
import { Route as studyRoute } from "@/routes/_app/study";
import { Route as workRoute } from "@/routes/_app/work";
import { Route as writingRoute } from "@/routes/_app/writing";

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
    label: "Study",
    to: studyRoute.to,
    icon: GraduationCapIcon,
  },
  {
    label: "Map",
    to: mapRoute.to,
    icon: MapIcon,
  },
  {
    label: "Projects",
    to: projectsRoute.to,
    icon: CodeIcon,
  },
] as const;

export { NAV_LINKS };
