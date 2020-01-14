import { useEffect, useCallback, useState } from 'react';

export default function useMyWindowSize() {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [height, setHeight] = useState(() => window.innerHeight);
  const cb = useCallback(function() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    setWidth(winWidth);
    setHeight(winHeight);
  });
  useEffect(() => {
    window.addEventListener('resize', cb, false);
    return () => {
      window.addEventListener('resize', cb, false);
    };
  }, []);
  return {
    width,
    height
  };
}
