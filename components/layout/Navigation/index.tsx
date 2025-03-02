import { FC } from 'react';
import HamburgerMenu from './HamburgerMenu';
import VerticalNavigation from './VerticalNavigation';
import Toggle from './Toggle';

const Navigation: FC = () => {
  return (
    <>
      <HamburgerMenu className=" sm:hidden" />
      <VerticalNavigation className="sm:block hidden" />
      <Toggle className="sm:block hidden absolute right-5 top-3" />
    </>
  );
};

export default Navigation;
