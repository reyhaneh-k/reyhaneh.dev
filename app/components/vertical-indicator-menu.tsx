"use client";
import {
  faLaptopCode,
  faBriefcase,
  faUser,
  faCertificate,
  faLanguage,
  faProjectDiagram,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
type SectionId =
  | "header"
  | "about"
  | "skills"
  | "experience"
  | "certifications"
  | "languages"
  | "projects";

const useInView = () => {
  const [inView, setInView] = useState<SectionId>("header");
  const [ratio, setRatio] = useState<Record<SectionId, number>>({
    header: 1,
    about: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    languages: 0,
    projects: 0,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRatio((ratio) => ({
              ...ratio,
              [entry.target.id]: entry.intersectionRatio,
            }));
            if (entry.intersectionRatio > ratio[inView]) {
              setInView(entry.target.id as SectionId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const header = document.querySelector("#header");
    const about = document.querySelector("#about");
    const skills = document.querySelector("#skills");
    const experience = document.querySelector("#experience");
    const certifications = document.querySelector("#certifications");
    const languages = document.querySelector("#languages");
    const projects = document.querySelector("#project");

    const sections = [
      header,
      about,
      skills,
      experience,
      certifications,
      languages,
      projects,
    ];

    for (const component of sections) {
      if (component) {
        observer.observe(component);
      }
    }

    return () => {
      for (const component of sections) {
        if (component) {
          observer.unobserve(component);
        }
      }
    };
  }, [inView, ratio]);
  return inView;
};
export const VerticalIndicator = () => {
  const inView = useInView();
  return (
    <div className="fixed p-9 left-0 h-96 w-1/12  text-text top-1/2 border border-secondary rounded-full shadow-xl shadow-primary bg-background z-30 flex flex-col gap-7  items-center">
      <FontAwesomeIcon
        icon={faCode}
        className={
          inView === "header" ? "scale-[270%] transition-all" : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faUser}
        className={
          inView === "about" ? "scale-[270%] transition-all" : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faLaptopCode}
        className={
          inView === "skills" ? "scale-[300%] transition-all" : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faBriefcase}
        className={
          inView === "experience"
            ? "scale-[270%] transition-all"
            : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faCertificate}
        className={
          inView === "certifications"
            ? "scale-[270%] transition-all"
            : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faLanguage}
        className={
          inView === "languages"
            ? "scale-[270%] transition-all"
            : "transition-all"
        }
      />
      <FontAwesomeIcon
        icon={faProjectDiagram}
        className={
          inView === "projects"
            ? "scale-[270%] transition-all"
            : "transition-all"
        }
      />
    </div>
  );
};
