import { ReactNode } from "react";

export const Tag = ({
  tag,
  children,
  lines = 1,
  className,
  selfClosing = false,
}: {
  tag: string;
  children?: ReactNode;
  lines?: 1 | 2 | 3;
  className?: string;
  selfClosing?: boolean;
}) => {
  return (
    <span>
      {!selfClosing && (
        <>
          <small className="text-base font-light text-secondary">
            &lt;{tag}&gt;{" "}
          </small>
          {lines > 1 && <br />}{" "}
          <span className={`${className} text-text`}>{children}</span>{" "}
          {lines > 2 && <br />}
          <small className="text-base font-light text-secondary">
            &lt;/{tag}&gt;
          </small>
        </>
      )}
      {selfClosing && (
        <span className={`${className}`}>
          <small className="font-light">&lt;</small>
          <span>{children}</span>
          <small className="font-light">/&gt;</small>
        </span>
      )}
    </span>
  );
};
