import React, { useState, useRef } from 'react';
import st from './DropdownMenu.module.scss';
import { useToggleDropDown } from '../../hooks/useToggleDropDown';

import { BsChevronCompactDown } from 'react-icons/bs';

interface DropDownProps {
  title: string;
  type: 'hover' | 'click';
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownProps> = ({ title = 'Список', type, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropContent = useRef<HTMLDivElement>(null);

  const [dropDownFocusOn, dropDownFocusOff, dropDownToggle] = useToggleDropDown(
    isOpen,
    setIsOpen,
    dropContent
  );

  return (
    <div
      ref={dropContent}
      className={st.dropDown}
      onMouseEnter={
        type === 'hover'
          ? () => {
              dropDownFocusOn();
            }
          : undefined
      }
      onMouseLeave={
        type === 'hover'
          ? () => {
              dropDownFocusOff();
            }
          : undefined
      }
      onClick={
        type === 'click'
          ? () => {
              dropDownToggle();
            }
          : undefined
      }
    >
      <div className={st['dropDown__title'] + ' ' + (isOpen ? st.opened : '')}>
        {title}
        <BsChevronCompactDown className={st.arrowDown + ' ' + (isOpen ? st.opened : '')} />
      </div>
      {isOpen && (
        <div className={st['dropDown__contentWrapper']} onClick={(e) => e.stopPropagation()}>
          <div className={st['dropDown__content']}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
