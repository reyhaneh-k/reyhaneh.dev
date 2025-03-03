import clsx from 'clsx';
import { FC, ReactNode } from 'react';
export type TagProps = {
  tag: string;
  children?: ReactNode;
  className?: string;
  tagClassName?: string;
  selfClosing?: boolean;
  direction?: 'col' | 'row';
};
export const Tag: FC<TagProps> = ({
  tag,
  children,
  className,
  tagClassName,
  selfClosing = false,
  direction = 'col',
}) => {
  return (
    <>
      {!selfClosing && (
        <span
          className={`flex  ${
            direction === 'col'
              ? 'flex-col justify-between gap-2'
              : 'justify-start items-baseline gap-2'
          } ${className}`}
        >
          <small className={clsx('text-base font-light', tagClassName)}>
            &lt;{tag}&gt;
          </small>
          {children}
          <small className={clsx('text-base font-light', tagClassName)}>
            &lt;/{tag}&gt;
          </small>
        </span>
      )}
      {selfClosing && (
        <span className={`${className}`}>
          <small className={clsx(tagClassName)}>&lt;</small>
          {children}
          <small className={clsx(tagClassName)}>/&gt;</small>
        </span>
      )}
    </>
  );
};
