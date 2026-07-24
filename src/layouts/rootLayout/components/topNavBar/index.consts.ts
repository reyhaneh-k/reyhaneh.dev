import { Route as contactRoute } from "@/routes/_app/contact";
import { Route as indexRoute } from "@/routes/_app/index";
import { Route as mapRoute } from "@/routes/_app/map";
import { Route as projectsRoute } from "@/routes/_app/projects";
import { Route as studyRoute } from "@/routes/_app/study";
import { Route as workRoute } from "@/routes/_app/work";
import { Route as writingRoute } from "@/routes/_app/writing";

const NAV_LINKS = [
  {
    label: "Work",
    to: workRoute.to,
  },
  {
    label: "Writing",
    to: writingRoute.to,
  },
  {
    label: "Study",
    to: studyRoute.to,
  },
  {
    label: "Projects",
    to: projectsRoute.to,
  },
  {
    label: "Map",
    to: mapRoute.to,
  },
  {
    label: "Contact",
    to: contactRoute.to,
  },
] as const;

const ROOT_LINK = {
  label: ["reyhaneh", ".dev"] as const,
  to: indexRoute.to,
};

const SPRING = {
  type: "spring",
  stiffness: 200,
  damping: 15,
  bounce: 0.25,
} as const;
export { NAV_LINKS, ROOT_LINK, SPRING };
