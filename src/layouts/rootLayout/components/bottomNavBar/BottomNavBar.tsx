import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import contactIcon from "@/assets/icons/contact.svg";
import bellNotch from "@/assets/svgs/bellNotch.svg";
import { useMatchesRoute } from "@/hooks/useMatchesRoute/useMatchesRoute";
import { cn } from "@/utils/classname";

import {
  CONTACT_LINK,
  NAV_LINKS,
  SPRING,
} from "./index.consts";
import { getMaskMetrics } from "./index.helpers";
import { type BottomNavBarProps } from "./index.type";

const BottomNavBar = ({ className }: BottomNavBarProps) => {
  const { pathname } = useLocation();
  const listRef = useRef<HTMLOListElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const matches = useMatchesRoute({
    target: [
      ...NAV_LINKS.map((link) => ({
        to: link.to,
      })),
    ],
  });
  const syncMask = useCallback(
    (el: HTMLAnchorElement | null) => {
      const next = getMaskMetrics(el, listRef.current);
      if (surfaceRef.current) {
        surfaceRef.current.style.setProperty(
          "--center-x",
          `${next ?? -10}px`
        );
      }
      activeLinkRef.current = el;
    },
    []
  );

  // sync mask when active link changes
  useLayoutEffect(() => {
    if (!activeLinkRef.current) return;
    syncMask(activeLinkRef.current);
  }, [pathname, syncMask]);

  // sync mask when list is resized
  useEffect(() => {
    const ol = listRef.current;
    if (!ol) return;

    const ro = new ResizeObserver(() => {
      syncMask(activeLinkRef.current);
    });
    ro.observe(ol);
    return () => {
      ro.disconnect();
    };
  }, [syncMask]);

  const activeLink = matches.find(
    (match) => match.isMatch
  )?.to;

  const isContactActive = activeLink === CONTACT_LINK.to;
  return (
    <nav
      className={cn(
        "text-ink-muted flex w-full flex-row-reverse items-center gap-2 px-4 py-2",
        className
      )}
    >
      <Link
        to={CONTACT_LINK.to}
        ref={(el) => {
          if (isContactActive && el) {
            syncMask(el);
          }
        }}
        aria-label={CONTACT_LINK.label}
        aria-current={isContactActive ? "page" : undefined}
        className={cn(
          "relative z-1 shrink-0",
          "bg-surface inset-shadow-shadow shadow-shadow rounded-2xl shadow-lg inset-shadow-sm",
          "transition-colors",
          "aspect-square transition-shadow",
          "2xs:size-13 xs:size-14 size-12",
          isContactActive && "text-accent",
          isContactActive && "inset-shadow-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-2xl",
            isContactActive
              ? "bg-contact-shine"
              : "bg-contact-shine-muted",
            // same breakpoints as "2xs:size-5 xs:size-6 size-4"
            "[--icon-size:--spacing(4)]",
            "2xs:[--icon-size:--spacing(5)]",
            "xs:[--icon-size:--spacing(6)]",
            isContactActive && "[--icon-size:--spacing(6)]",
            isContactActive &&
              "2xs:[--icon-size:--spacing(7)]",
            isContactActive &&
              "xs:[--icon-size:--spacing(8)]",
            "ease-spring transition-[mask-size,-webkit-mask-size] duration-300",
            "bg-size-[220%_100%]",
            "animate-[contact-shine_1.5s_ease-in-out_infinite_alternate]"
          )}
          style={{
            maskImage: `url("${contactIcon}")`,
            WebkitMaskImage: `url("${contactIcon}")`,
            maskSize: "var(--icon-size)",
            WebkitMaskSize: "var(--icon-size)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </Link>

      <motion.ol
        ref={listRef}
        className={cn(
          "relative flex grow items-center justify-around bg-transparent",
          "xs:gap-4 gap-0 p-2 sm:gap-6",
          "xs:px-4 px-2 py-2 sm:px-6"
        )}
      >
        <div
          aria-hidden
          ref={surfaceRef}
          className={cn(
            "bg-surface absolute inset-0",
            "shadow-shadow rounded-2xl shadow-lg",
            // match size-10 / xs:size-12 × ratio (same idea as --y-offset)
            "[--mask-w:calc(1.5*(--spacing(10)))]",
            "xs:[--mask-w:calc(1.7*(--spacing(12)))]",
            "[--mask-h:calc(var(--mask-w)*48/80)]", // maskX = centerX - maskW/2
            "[--mask-x:calc(var(--center-x)-var(--mask-w)/2)]",
            "ease-spring-snappy transition-[--center-x] duration-500"
          )}
          style={{
            maskImage: activeLink
              ? `url("${bellNotch}"), linear-gradient(#000,#000)`
              : "none",
            WebkitMaskImage: activeLink
              ? `url("${bellNotch}"), linear-gradient(#000,#000)`
              : "none",
            maskRepeat: "no-repeat, no-repeat",
            WebkitMaskRepeat: "no-repeat, no-repeat",
            maskSize: `var(--mask-w) var(--mask-h), 100% 100%`,
            WebkitMaskSize: `var(--mask-w) var(--mask-h), 100% 100%`,
            maskPosition: `var(--mask-x) 0px, 0% 0%`,
            WebkitMaskPosition: "var(--mask-x) 0px, 0% 0%",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        {NAV_LINKS.filter(
          (link) => link.to !== CONTACT_LINK.to
        ).map((link) => {
          const Icon = link.icon;
          const isActive = activeLink === link.to;

          return (
            <li key={link.to} id={link.to}>
              <Link
                ref={(el) => {
                  if (isActive && el) {
                    syncMask(el);
                  }
                }}
                to={link.to}
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "transition-colors",
                  "active:text-accent w-fit py-2",
                  isActive && "text-accent"
                )}
              >
                {isActive && (
                  <motion.div
                    aria-hidden
                    data-nav-ball
                    layoutId="bottom-nav-active"
                    className={cn(
                      "pointer-events-none",
                      "absolute -top-10 left-1/2 z-0 -translate-x-1/2",
                      "bg-surface shadow-shadow rounded-full shadow-lg",
                      "xs:size-12 size-10"
                    )}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1.4, 0.36, 1] as const,
                    }}
                  />
                )}

                <motion.span
                  className={cn(
                    "relative z-10",
                    //  -top + ball/2 - icon/2 - padding/2
                    "[--y-offset:calc(-1*(--spacing(10))+(--spacing(10))/2-(--spacing(4))/2-(--spacing(2)))]",
                    "2xs:[--y-offset:calc(-1*(--spacing(10))+(--spacing(10))/2-(--spacing(5))/2-(--spacing(2)))]",
                    "xs:[--y-offset:calc(-1*(--spacing(10))+(--spacing(12))/2-(--spacing(6))/2-(--spacing(2)))]"
                  )}
                  animate={{
                    y: isActive ? `var(--y-offset)` : 0,
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : [1.0, 0, 0, 1],
                  }}
                  transition={SPRING}
                >
                  <Icon
                    className="2xs:size-5 xs:size-6 size-4"
                    aria-hidden
                  />
                </motion.span>

                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-label"
                    className={cn(
                      "text-xs",
                      "absolute bottom-0"
                    )}
                    transition={SPRING}
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default BottomNavBar;
