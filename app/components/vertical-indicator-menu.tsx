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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

type SectionId =
  | "header"
  | "about"
  | "skills"
  | "experience"
  | "certifications"
  | "languages"
  | "projects";

const sectionsInfo: Array<{ icon: IconDefinition; id: SectionId }> = [
  { icon: faCode, id: "header" },
  { icon: faUser, id: "about" },
  { icon: faLaptopCode, id: "skills" },
  { icon: faBriefcase, id: "experience" },
  { icon: faCertificate, id: "certifications" },
  { icon: faLanguage, id: "languages" },
  { icon: faProjectDiagram, id: "projects" },
];

const useInView = () => {
  const [inViewSection, setInViewSection] = useState<SectionId>("header");
  const ratios = useRef<Record<SectionId, number>>({
    header: 1,
    about: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    languages: 0,
    projects: 0,
  });
  const sections = useRef<Record<string, Element | null>>();
  useEffect(() => {
    sections.current = {
      header: document.querySelector("#header"),
      about: document.querySelector("#about"),
      skills: document.querySelector("#skills"),
      experience: document.querySelector("#experience"),
      certifications: document.querySelector("#certifications"),
      languages: document.querySelector("#languages"),
      projects: document.querySelector("#project"),
    };
  }, []);

  const observerCallBack = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ratios.current[entry.target.id as SectionId] =
            entry.intersectionRatio;

          setInViewSection(
            Object.entries(ratios.current).reduce(
              (prev, curr) => {
                const el = curr[1] > prev[1] ? curr : prev;
                return el;
              },
              ["header", ratios.current.header]
            )[0] as SectionId
          );
        }
      });
    },
    [ratios.current, inViewSection]
  );
  const observer = useMemo(
    () =>
      new IntersectionObserver(observerCallBack, {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }),
    [observerCallBack]
  );
  useEffect(() => {
    if (sections.current) {
      for (const component of Object.values(sections.current)) {
        if (component) {
          observer.observe(component);
        }
      }
    }
    return () => {
      if (sections.current) {
        for (const component of Object.values(sections.current)) {
          if (component) {
            observer.unobserve(component);
          }
        }
      }
    };
  }, [observerCallBack, sections]);

  return { inViewSection, sections };
};
export const VerticalIndicator = () => {
  const { inViewSection, sections } = useInView();
  return (
    <div className="fixed p-9 left-0 h-96 w-1/12  text-text top-1/2 border border-secondary rounded-full shadow-xl shadow-primary bg-background z-30 flex flex-col gap-7  items-center">
      {sectionsInfo.map(({ icon, id }) => {
        return (
          <FontAwesomeIcon
            icon={icon}
            key={id}
            className={
              inViewSection === id
                ? "scale-[270%] transition-all"
                : "transition-all"
            }
            onClick={() => {
              sections.current?.[id]?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        );
      })}
    </div>
  );
};
