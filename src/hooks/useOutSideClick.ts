import React from 'react';

const useOutsideClick = <T extends HTMLElement>(
  isOpen: boolean,
  callback: (e: React.MouseEvent<T>) => void,
): React.RefObject<T> => {
  const node = React.useRef<T>(null);

  const handleClickOutside = React.useCallback((e) => {
    if (node.current?.contains(e.target)) {
      return;
    }

    callback(e);
  }, [callback]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return node;
};

export default useOutsideClick;
