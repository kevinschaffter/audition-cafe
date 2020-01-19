import { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    ['mousedown', 'touchstart'].forEach(event => document.addEventListener(event, listener));
    return () => ['mousedown', 'touchstart'].forEach(event => document.removeEventListener(event, listener));
  }, [ref, handler]);
};

export default useOnClickOutside;
