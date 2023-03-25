import React from 'react';
import HeaderLink, { HeaderLinkType } from '../NavItem';
import st from './NavList.module.scss';

type NavListProps = {
  navLinks: HeaderLinkType[];
};

const NavList: React.FC<NavListProps> = ({ navLinks }) => {
  return (
    <ul className={st.navList}>
      {navLinks.map((linkProps) => (
        <HeaderLink {...linkProps} key={linkProps.link} />
      ))}
    </ul>
  );
};

export default NavList;
