import { Link, useLocation } from "@tanstack/react-router";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect, useEffectEvent, useRef } from "react";

import bellNotch from "@/assets/svgs/bellNotch.svg";
import { useResize } from "@/hooks/useResize/useResize";
import { cn } from "@/utils/classname";

import { NAV_LINKS, SPRING } from "./index.consts";
import { syncMaskFromBall } from "./index.helpers";
import { type BottomNavBarProps } from "./index.type";

const BottomNavBar = ({ className }: BottomNavBarProps) => {
  const { pathname } = useLocation();
  const olRef = useRef<HTMLOListElement>(null);
  const maskX = useMotionValue(0);
  const maskPosition = useMotionTemplate`${maskX}px 0px, 0% 0%`;

  const syncMask = useEffectEvent(() => {
    syncMaskFromBall(pathname, olRef.current, maskX);
  });

  useEffect(() => {
    syncMask();
  }, [pathname]);

  useResize(() => {
    syncMaskFromBall(pathname, olRef.current, maskX);
  });

  const activeLink = NAV_LINKS.find(
    (link) => link.to === pathname
  );
  return (
    <nav className={cn("w-full px-4 py-2", className)}>
      <motion.ol
        ref={olRef}
        className={cn(
          "relative flex w-full items-end justify-center bg-transparent",
          "2xs:gap-6 xs:gap-10 gap-2 p-2"
        )}
      >
        <motion.div
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
            maskSize: "5rem 3rem, 100% 100%",
            WebkitMaskSize: "5rem 3rem, 100% 100%",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            maskPosition,
            WebkitMaskPosition: maskPosition,
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
                  "relative flex flex-col items-center gap-1",
                  "text-ink-muted transition-colors",
                  isActive && "text-accent"
                )}
              >
                {isActive && (
                  <motion.div
                    aria-hidden
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
