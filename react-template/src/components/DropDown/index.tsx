import React, { useState, useRef } from 'react';
import st from './Dropdown.module.scss';
import { useToggleDropDown } from '../../hooks/useToggleDropDown';

interface DropDownProps {
  type: 'hover' | 'click';
  options: string[];
  children?: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ options, type }) => {
  const [selectedOption, setSelectedOption] = useState<(typeof options)[number]>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropContent = useRef<HTMLDivElement>(null);

  const [dropDownFocusOn, dropDownFocusOff, dropDownToggle] = useToggleDropDown(
    isOpen,
    setIsOpen,
    dropContent,
    setSelectedOption
  );

  return (
    <div
      ref={dropContent}
      className="dropDown"
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
      <div className={st['dropDown__title']}>{selectedOption}</div>
      {isOpen && (
        <ul className={st['dropDown__options']} onClick={(e) => e.stopPropagation()}>
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
      )}
    </div>
  );
};

export default DropDown;
