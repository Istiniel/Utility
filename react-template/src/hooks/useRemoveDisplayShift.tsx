import { useEffect } from 'react';

const useRemoveDisplayShift = () => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';
    document.body.style.paddingRight = '' + scrollbarWidth;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
    };
  }, []);
};

export default useRemoveDisplayShift;
