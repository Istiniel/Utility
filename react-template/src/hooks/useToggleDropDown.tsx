import React, { useEffect } from 'react';

export function useToggleDropDown<T extends HTMLElement>(
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dropContent: React.RefObject<T>
) {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!dropContent.current?.contains(e.target as T)) {
        setIsOpen(false);
      }
    });
    return () => {
      document.removeEventListener('click', (e) => {
        if (!dropContent.current?.contains(e.target as T)) setIsOpen(false);
      });
    };
  }, [isOpen, setIsOpen, dropContent]);

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
}
