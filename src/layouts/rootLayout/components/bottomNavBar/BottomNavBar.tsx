import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import bellNotch from "@/assets/svgs/bellNotch.svg";
import { cn } from "@/utils/classname";

import { NAV_LINKS, SPRING } from "./index.consts";
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

  return (
    <nav className={cn("w-full px-4 py-2", className)}>
      <motion.ol
        ref={(el) => {
          listRef.current = el;
        }}
        className={cn(
          "relative flex w-full items-end justify-center bg-transparent",
          "2xs:gap-4 xs:gap-6 gap-0 p-2 sm:gap-10",
          "2xs:px-6 xs:px-8 px-0 py-2 sm:px-10"
        )}
      >
        <motion.div
          aria-hidden
          className={cn(
            "bg-surface absolute inset-0",
            "rounded-2xl shadow-lg",
            // match size-10 / xs:size-12 × ratio (same idea as --y-offset)
            "[--mask-w:calc(1.7*(--spacing(10)))]",
            "xs:[--mask-w:calc(1.7*(--spacing(12)))]",
            "[--mask-h:calc(var(--mask-w)*48/80)]", // maskX = centerX - maskW/2
            "[--mask-x:calc(var(--center-x)-var(--mask-w)/2)]"
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
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          animate={{
            maskPosition: `var(--mask-x) 0px, 0% 0%`,
            maskSize: `var(--mask-w) var(--mask-h), 100% 100%`,
          }}
          transition={SPRING}
        />
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.to;

          return (
            <li
              key={link.to}
              id={link.to}
              className="relative z-1 flex-1"
            >
              <Link
                to={link.to}
                className={cn(
                  "relative flex flex-col items-center gap-1",
                  "text-ink-muted transition-colors",
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
                    // y = -top-10 + size/2 - icon/2
                    "[--y-offset:calc(-1*(--spacing(10))+(--spacing(10))/2-(--spacing(4))/2)]",
                    "xs:[--y-offset:calc(-1*(--spacing(10))+(--spacing(12))/2-(--spacing(6))/2)]"
                  )}
                  animate={{
                    y: isActive ? `var(--y-offset)` : 0,
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive
                      ? 1
                      : [1.0, 0, 0, 0, 0, 1],
                  }}
                  transition={SPRING}
                >
                  <Icon
                    className="xs:size-6 size-4"
                    aria-hidden
                  />
                </motion.span>

                <span className="2xs:inline hidden text-xs">
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default BottomNavBar;
