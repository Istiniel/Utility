import React from 'react';
import st from './button.module.scss';

type ButtonType = {
  type: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
  outlined?: boolean;
  content: string;
};

const Button: React.FC<ButtonType> = ({ type, color, outlined, content }) => {
  let classes = '';
  color ? (classes += st[color] + ' ') : (classes += st.red + ' ');
  outlined && (classes += st.outlined + ' ');

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
};

export default Button;
