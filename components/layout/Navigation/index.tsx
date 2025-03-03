import { FC } from 'react';
import HamburgerMenu from './HamburgerMenu';
import VerticalNavigation from './VerticalNavigation';
import Toggle from './Toggle';

const Navigation: FC = () => {
  return (
    <>
      <HamburgerMenu className=" sm:hidden" />
      <VerticalNavigation className="sm:block hidden" />
      <div className="fixed top-3 px-20 justify-between w-full sm:flex hidden items-center">
        <h1 className="text-4xl drop-shadow-[-0.5px_-0.5px_0_black,0.5px_-0.5px_0_black,-0.5px_0.5px_0_black,0.5px_0.5px_0_black] tracking-widest font-bold text-inverse-primary">
          {'<R/>'}
        </h1>
        <Toggle />
      </div>
    </>
  );
};

export default Navigation;
