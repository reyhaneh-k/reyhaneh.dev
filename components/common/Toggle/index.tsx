import React, { FC, HTMLAttributes } from 'react';
type Props = HTMLAttributes<HTMLButtonElement>;

const Toggle: FC<Props> = ({ onClick }) => {
  return <button onClick={onClick} className="" />;
};

export default Toggle;
