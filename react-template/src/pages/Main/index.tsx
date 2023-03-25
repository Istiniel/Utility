import React from 'react';
import st from './Main.module.scss';

const MainPage = () => {
  return (
    <main className={st.main}>
      <div className="wrapper">
        <div className={st.container}></div>
      </div>
    </main>
  );
};

export default MainPage;
