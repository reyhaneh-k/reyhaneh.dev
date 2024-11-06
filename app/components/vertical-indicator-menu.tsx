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

const observeElementById = (
  id: SectionId,
  setInView: (id: SectionId) => void
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(id);
        }
      });
    },
    { threshold: 0.5 }
  );

  const element = document.getElementById(id);
  if (element) {
    observer.observe(element);
  }

  return () => {
    if (element) {
      observer.unobserve(element);
    }
  };
};
export const VerticalIndicator = () => {
  const [inView, setInview] = useState<SectionId>("header");
  useEffect(() => {
    observeElementById("header", setInview);
  }, []);
  return (
    <div className="absolute p-9 left-0 h-96 w-28  text-text top-1/2 border border-secondary rounded-full shadow-xl shadow-primary bg-background z-30 flex flex-col gap-7  items-center">
      <FontAwesomeIcon
        icon={faCode}
        size={inView === "header" ? "10x" : "lg"}
        // beat={inView === "header" ? true : false}
        // className={inView === "header" ? "text-highlight shadow-lg" : ""}
      />
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faLaptopCode} />
      <FontAwesomeIcon icon={faBriefcase} />
      <FontAwesomeIcon icon={faCertificate} />
      <FontAwesomeIcon icon={faLanguage} />
      <FontAwesomeIcon icon={faProjectDiagram} />
    </div>
  );
};
