import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

import { cn } from "@/utils/classname";

import { ArchiveHeader } from "./components/archiveHeader/ArchiveHeader";
import { SingleHeader } from "./components/singleHeader/SingleHeader";
import { useIsSingle } from "./index.helpers";

const chromeTransition = {
  duration: 0.28,
  ease: "easeOut",
} as const;

function WritingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isSingle = useIsSingle();

  return (
    <section
      className={cn(
        "mx-auto w-full space-y-8 md:space-y-12",
        "p-4 md:p-6 lg:p-8",
        "mt-6 lg:mt-10",
        "max-w-6xl"
      )}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden",
          "[--single-header-height:24px]",
          "[--archive-header-height:240px] lg:[--archive-header-height:260px]"
        )}
        animate={{
          height: isSingle
            ? "var(--single-header-height)"
            : "var(--archive-header-height)",
        }}
        transition={chromeTransition}
      >
        <div className="flex h-full flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isSingle ? "single" : "archive"}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={chromeTransition}
              className="h-full"
            >
              {isSingle ? (
                <SingleHeader className="h-full" />
              ) : (
                <ArchiveHeader className="h-full" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      {children}
    </section>
  );
}

export default WritingLayout;
