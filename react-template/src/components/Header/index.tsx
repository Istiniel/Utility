import React from 'react';
import Logo from '../Logo';
import st from './header.module.scss';
import { Outlet } from 'react-router-dom';
import { NavItemProps } from '../NavItem';
import NavList from './../NavList/index';

const Header: React.FC = () => {
  const headerLinks: NavItemProps[] = [
    { link: 'about', title: 'About Us' },
    { link: 'sign', title: 'Sign Up' },
    { link: 'prices', title: 'Prices' },
  ];

  return (
    <>
      <header className={st.header}>
        <div className="wrapper">
          <div className={st.container}>
            <Logo title="Slider" />
            <nav className={st.nav}>
              <NavList navLinks={headerLinks} />
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
