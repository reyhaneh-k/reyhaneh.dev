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
import {
  type BottomNavBarProps,
  type MaskMetrics,
} from "./index.type";

const BottomNavBar = ({ className }: BottomNavBarProps) => {
  const { pathname } = useLocation();
  const olRef = useRef<HTMLOListElement>(null);
  const [mask, setMask] = useState<MaskMetrics>({
    x: 0,
    w: 0,
    h: 0,
  });

  const syncMask = useEffectEvent(() => {
    const next = getMaskMetrics(pathname, olRef.current);
    if (!next) return;
    setMask(next);
  });

  useEffect(() => {
    syncMask();
  }, [pathname]);

  useEffect(() => {
    const ol = olRef.current;
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
  const maskPosition = `${mask.x}px 0px, 0% 0%`;
  const maskSize = `${mask.w}px ${mask.h}px, 100% 100%`;

  return (
    <nav className={cn("w-full px-4 py-2", className)}>
      <motion.ol
        ref={(el) => {
          olRef.current = el;
        }}
        className={cn(
          "relative flex w-full items-end justify-center bg-transparent",
          "2xs:gap-6 xs:gap-10 gap-2 p-2"
        )}
      >
        <motion.div
          aria-hidden
          className={cn(
            "bg-surface absolute inset-0",
            "rounded-2xl shadow-lg"
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
            maskSize,
            WebkitMaskSize: maskSize,
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          animate={{
            maskPosition: maskPosition,
            maskSize: maskSize,
          }}
          transition={SPRING}
        />
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.to;

          return (
            <li key={link.to} id={link.to}>
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
                      "bg-surface inset-shadow-lg size-12 rounded-full"
                    )}
                    transition={SPRING}
                  />
                )}

                <motion.span
                  className="relative z-10"
                  animate={{
                    y: isActive ? -30 : 0,
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive
                      ? 1
                      : [1.0, 0, 0, 0, 0, 1],
                  }}
                  transition={SPRING}
                >
                  <Icon className="size-6" aria-hidden />
                </motion.span>

                <span className="text-xs">
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
