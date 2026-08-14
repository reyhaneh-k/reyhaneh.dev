import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/utils/classname";

import { ArchiveHeader } from "./components/archiveHeader/ArchiveHeader";
import { DetailBack } from "./components/detailBack/DetailBack";
import {
  chromeTransition,
  detailChromeMotion,
  listChromeMotion,
} from "./index.consts";
import { useIsWritingDetail } from "./index.helpers";

function WritingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isDetail = useIsWritingDetail();
  const chromeMotion = isDetail
    ? detailChromeMotion
    : listChromeMotion;

  return (
    <section
      className={cn(
        "mx-auto h-full w-full max-w-6xl space-y-8 md:space-y-12",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDetail ? "detail" : "list"}
            initial={chromeMotion.initial}
            animate={chromeMotion.animate}
            exit={chromeMotion.exit}
            transition={chromeTransition}
          >
            {isDetail ? <DetailBack /> : <ArchiveHeader />}
          </motion.div>
        </AnimatePresence>
      </div>
      {children}
    </section>
  );
}

export default WritingLayout;
