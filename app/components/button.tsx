import {
  icon,
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

type Styles = "outline" | "fill" | "plain";
const StyleClasses: Record<Styles, string> = {
  outline: "border-2 border-secondary rounded-xl text-secondary",
  fill: "rounded-xl bg-secondary text-text",
  plain: "text-text",
};
type ButtonProps = {
  style: Styles;
  className?: string;
  icon?: IconDefinition;
  iconSize?: SizeProp;
  children?: ReactNode;
};
export const Button = ({
  style,
  className,
  iconSize,
  icon,
  children,
}: ButtonProps) => {
  return (
    <button className={`${StyleClasses[style]} ${className} flex gap-3 p-5`}>
      {icon && <FontAwesomeIcon size={iconSize} icon={icon} />}
      {children}
    </button>
  );
};
