import React from 'react';
import st from './logo.module.scss';
import { Link } from 'react-router-dom';

const Logo: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Link to="/">
      <h2 className={st.logo}>{title}</h2>
    </Link>
  );
};

export default Logo;
