import { useMatches } from "@tanstack/react-router";
import { motion } from "motion/react";

import { cn } from "@/utils/classname";
import { getCrumbsFromMatches } from "@/utils/path";

import { Crumb } from "./components/crumb/Crumb";

const BreadCrumb = ({
  className,
}: {
  className?: string;
}) => {
  const matches = useMatches({
    select: getCrumbsFromMatches,
  });
  return (
    <motion.div
      className={cn("flex items-center gap-2", className)}
    >
      {matches.map((breadcrumb, index) => (
        <motion.button
          type="button"
          aria-label={`Navigate to ${breadcrumb.title}`}
          key={breadcrumb.path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={cn(
            index === matches.length - 1 &&
              "overflow-hidden"
          )}
        >
          <Crumb
            title={breadcrumb.title}
            path={breadcrumb.path}
            index={matches.length - index - 1}
            isStandAlone={matches.length === 1}
          />
        </motion.button>
      ))}
    </motion.div>
  );
};

export { BreadCrumb };
