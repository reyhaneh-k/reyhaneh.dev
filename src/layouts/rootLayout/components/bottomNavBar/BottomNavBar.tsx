import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import contactIcon from "@/assets/icons/contact.svg";
import bellNotch from "@/assets/svgs/bellNotch.svg";
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
  const [centerX, setCenterX] = useState<number | null>(
    null
  );

  const syncMask = useEffectEvent(() => {
    const next = getMaskMetrics(pathname, listRef.current);
    setCenterX(next);
  });

  useEffect(() => {
    syncMask();
  }, [pathname]);

  useEffect(() => {
    const ol = listRef.current;
    if (!ol) return;

    const ro = new ResizeObserver(() => {
      syncMask();
    });
    ro.observe(ol);
    return () => {
      ro.disconnect();
    };
  }, []);

  const activeLink = NAV_LINKS.find(
    (link) => link.to === pathname
  );
  const isContactActive = pathname === CONTACT_LINK.to;

  return (
    <nav
      className={cn(
        "text-ink-muted flex w-full flex-row-reverse items-center gap-2 px-4 py-2",
        className
      )}
    >
      <Link
        to={CONTACT_LINK.to}
        aria-label={CONTACT_LINK.label}
        aria-current={isContactActive ? "page" : undefined}
        className={cn(
          "relative z-1 shrink-0",
          "bg-surface inset-shadow-lg rounded-2xl shadow-lg",
          "transition-colors",
          "aspect-square",
          "2xs:size-13 xs:size-14 size-12",
          isContactActive && "text-accent"
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
        ref={(el) => {
          listRef.current = el;
        }}
        className={cn(
          "relative flex grow items-center justify-around bg-transparent",
          "xs:gap-4 gap-0 p-2 sm:gap-6",
          "xs:px-4 px-2 py-2 sm:px-6"
        )}
      >
        <div
          aria-hidden
          className={cn(
            "bg-surface absolute inset-0",
            "rounded-2xl shadow-lg",
            // match size-10 / xs:size-12 × ratio (same idea as --y-offset)
            "[--mask-w:calc(1.5*(--spacing(10)))]",
            "xs:[--mask-w:calc(1.7*(--spacing(12)))]",
            "[--mask-h:calc(var(--mask-w)*48/80)]", // maskX = centerX - maskW/2
            "[--mask-x:calc(var(--center-x)-var(--mask-w)/2)]",
            "ease-spring-snappy transition-[mask-position,-webkit-mask-position] duration-500"
          )}
          style={{
            ["--center-x" as string]:
              centerX != null ? `${centerX}px` : "0px",

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
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.to;

          return (
            <li key={link.to} id={link.to}>
              <Link
                to={link.to}
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "transition-colors",
                  "w-fit py-2",
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
                      "bg-surface inset-shadow-lg rounded-full",
                      "xs:size-12 size-10"
                    )}
                    transition={SPRING}
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
