"use client";
import {
  faLaptopCode,
  faBriefcase,
  faUser,
  faCertificate,
  faLanguage,
  faProjectDiagram,
  faCode,
  IconDefinition,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export type SectionId =
  | "header"
  | "about"
  | "skills"
  | "experience"
  | "certifications"
  | "languages"
  | "projects"
  | "recommendations";

export const sectionsInfo: Array<{
  icon: IconDefinition;
  id: SectionId;
  title: string;
}> = [
  { icon: faCode, id: "header", title: "Introduction" },
  { icon: faUser, id: "about", title: "About Me" },
  { icon: faLaptopCode, id: "skills", title: "Skills" },
  { icon: faBriefcase, id: "experience", title: "Experience" },
  { icon: faCertificate, id: "certifications", title: "Certificates" },
  { icon: faLanguage, id: "languages", title: "Languages" },
  { icon: faProjectDiagram, id: "projects", title: "Projects" },
  { icon: faEnvelope, id: "recommendations", title: "Recommendations" },
];
