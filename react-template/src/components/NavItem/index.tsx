import React from 'react';
import { NavLink } from 'react-router-dom';
import st from './NavItem.module.scss';

export type NavItemProps = {
  link: string;
  title: string;
};

const NavItem: React.FC<NavItemProps> = ({ link, title }) => {
  return (
    <li className={st.navItem}>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? st.navLink + ' ' + st.active : st.navLink)}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
