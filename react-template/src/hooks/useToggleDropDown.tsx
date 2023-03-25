import React, { useEffect } from 'react';

export const useToggleDropDown = (
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dropContent: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const closeDropDown = (e: React.SyntheticEvent<EventTarget>) => {
      if (!dropContent.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('click', closeDropDown as any);
    return () => {
      document.removeEventListener('click', closeDropDown as any);
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
};
