import React, { type ReactNode, type JSX } from "react";

import { cn } from "../../helpers/utils";

interface LabelProps {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const Label = ({
  as: Comp = "label",
  children,
  className = "",
  htmlFor,
}: LabelProps) => {
  return <Comp className={cn("rte-label", className)} htmlFor={htmlFor}>{children}</Comp>;
};

export default Label;
