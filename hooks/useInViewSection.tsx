import { SectionIds, SectionsEnum } from '@/components/common/Section/types';
import { useState, useEffect, useCallback } from 'react';

export const useInViewSection = () => {
  const [inViewSection, setInViewSection] = useState<SectionIds>('Hero');
  const observerCallBack = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInViewSection(entry.target.id as SectionIds);
        }
      });
    },
    []
  );
  useEffect(() => {
    const sections = Object.keys(SectionsEnum).map((key) =>
      document.getElementById(key)
    );
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(observerCallBack, {
        threshold: 0.6,
      });
      sections.forEach((sec) => sec && observer.observe(sec));

      return () => {
        sections.forEach((sec) => sec && observer.unobserve(sec));
      };
    }
  }, [observerCallBack]);

  return inViewSection;
};
