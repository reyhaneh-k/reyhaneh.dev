import { useMatches } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { Crumb } from "./components/crumb/Crumb";

const BreadCrumb = () => {
  const matches = useMatches({
    select: (s) =>
      s
        .filter((match) => match.staticData.breadcrumb)
        .map((match) => ({
          title: match.staticData.breadcrumb,
          path: match.pathname,
        })),
  });
  return (
    <motion.div className="flex items-center gap-2">
      <AnimatePresence>
        {matches.map((breadcrumb, index) => (
          <motion.div
            key={breadcrumb.path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <Crumb
              title={breadcrumb.title}
              path={breadcrumb.path}
              index={matches.length - index - 1}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export { BreadCrumb };
