import { motion } from "motion/react";

import { cn } from "@/utils/classname";

import { SwitchProps } from "./index.type";

export function Switch({
  checked,
  className,
  onCheckedChange,
  id,
  name,
  "aria-label": ariaLabel,
  defaultChecked,
}: SwitchProps) {
  return (
    <button
      onClick={() => {
        onCheckedChange();
      }}
    >
      <label
        htmlFor={id}
        aria-label={ariaLabel}
        className={cn(
          "border-border flex h-5 w-10 cursor-pointer items-center rounded-full border bg-white p-0.5",
          className
        )}
      >
        <input
          type="checkbox"
          className="hidden"
          id={id}
          aria-checked={checked}
          checked={checked}
          defaultChecked={defaultChecked}
          name={name}
        />
        <motion.div
          className="bg-coral-500 h-4 w-4 rounded-full"
          animate={{ x: checked ? 18 : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />
      </label>
    </button>
  );
}
