import { useEffect, useRef, useState } from "react";
import type { NavItem } from "../../menu/types";

export function useSectionNavigation(navItems: NavItem[]) {
  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? "");
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimeoutRef = useRef<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveSection(sectionId);
    pendingSectionRef.current = sectionId;

    if (pendingSectionTimeoutRef.current) {
      window.clearTimeout(pendingSectionTimeoutRef.current);
    }

    pendingSectionTimeoutRef.current = window.setTimeout(() => {
      pendingSectionRef.current = null;
      pendingSectionTimeoutRef.current = null;
    }, 800);

    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (pendingSectionRef.current) {
          const pendingEntry = entries.find(
            (entry) => entry.target.id === pendingSectionRef.current && entry.isIntersecting,
          );

          if (pendingEntry) {
            setActiveSection(pendingSectionRef.current);
            pendingSectionRef.current = null;

            if (pendingSectionTimeoutRef.current) {
              window.clearTimeout(pendingSectionTimeoutRef.current);
              pendingSectionTimeoutRef.current = null;
            }
          }

          return;
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();

      if (pendingSectionTimeoutRef.current) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
        pendingSectionTimeoutRef.current = null;
      }
    };
  }, [navItems]);

  useEffect(() => {
    if (!activeSection || !navScrollRef.current) {
      return;
    }

    const activeTab = navScrollRef.current.querySelector<HTMLElement>(`[data-tab-id="${activeSection}"]`);

    activeTab?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const hashTarget = window.location.hash.slice(1);
    const target = document.getElementById(hashTarget);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "auto", block: "start" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  return {
    activeSection,
    navScrollRef,
    scrollToSection,
  };
}
