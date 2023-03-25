import React from 'react';
import st from './about.module.scss';

const About = () => {
  return (
    <main className={st.main}>
      <div className="wrapper">
        <div className={st.container}>
          <h2 className={st.about__title}>{'About us'}</h2>
          <p className={st.about__description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat reiciendis ipsa
            consequatur ab aut, dolor eos nostrum eum modi quam explicabo alias, officiis assumenda
            ad.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
