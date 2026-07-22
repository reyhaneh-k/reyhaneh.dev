import React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange: () => void;
}
