import React, { useEffect } from 'react';

export const useToggleDropDown = (
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dropContent: React.RefObject<HTMLDivElement>,
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
) => {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!dropContent.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    });
    return () => {
      document.removeEventListener('click', (e) => {
        if (!dropContent.current?.contains(e.target as Node)) setIsOpen(false);
      });
    };
  }, [isOpen, setIsOpen, dropContent, setSelectedOption]);

  const dropDownFocusOn = () => {
    setIsOpen(true);
  };
  const dropDownFocusOff = () => {
    setIsOpen(false);
  };
  const dropDownToggle = () => {
    setIsOpen(!isOpen);
  };

  return [dropDownFocusOn, dropDownFocusOff, dropDownToggle];
};
