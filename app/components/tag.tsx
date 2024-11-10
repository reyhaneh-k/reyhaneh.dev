import { ReactNode } from "react";

export const Tag = ({
  tag,
  children,
  lines = 1,
  className,
}: {
  tag: string;
  children?: ReactNode;
  lines?: 1 | 2 | 3;
  className?: string;
}) => {
  return (
    <h1>
      <small className="text-base font-light text-secondary">
        &lt;{tag}&gt;{" "}
      </small>
      {lines > 1 && <br />}{" "}
      <span className={`${className} text-text text-xl`}>{children}</span>{" "}
      {lines > 2 && <br />}
      <small className="text-base font-light text-secondary">
        &lt;/{tag}&gt;
      </small>
    </h1>
  );
};
