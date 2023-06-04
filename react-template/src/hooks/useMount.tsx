import { useEffect, useLayoutEffect, useRef } from 'react';

export const useMount = (callback: () => void) => {
  const callbackReference = useRef(callback);

  useLayoutEffect(() => {
    callbackReference.current = callback;
  }, [callback]);

  useEffect(() => {
    callbackReference.current();
  }, []);
};
