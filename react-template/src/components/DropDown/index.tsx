import React, { useState, useRef } from 'react';
import st from './Dropdown.module.scss';
import { useToggleDropDown } from '../../hooks/useToggleDropDown';

import { BsChevronCompactDown } from 'react-icons/bs';

interface DropDownProps {
  type: 'hover' | 'click';
  options: (string | number)[];
  children?: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ options, type }) => {
  const [selectedOption, setSelectedOption] = useState<(typeof options)[number]>(options[0]);
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
        {selectedOption}
        <BsChevronCompactDown className={st.arrowDown + ' ' + (isOpen ? st.opened : '')} />
      </div>
      {isOpen && (
        <div className={st['dropDown__contentWrapper']} onClick={(e) => e.stopPropagation()}>
          <div className={st['dropDown__content']}>
            <ul className={st['dropDown__options']}>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                    setIsOpen(false);
                    setSelectedOption(
                      (e.target as HTMLLIElement).textContent as (typeof options)[number]
                    );
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
