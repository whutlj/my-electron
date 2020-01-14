import { useEffect, useCallback, useState } from 'react';

export default function useMyScroll(ref) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const scrollCb = useCallback(
    function() {
      const {
        current: { scrollTop, scrollLeft }
      } = ref;
      setX(screenLeft);
      setY(screenTop);
    },
    [ref]
  );
  useEffect(() => {
    if (!ref) return;
    ref.addEventListener('scroll', scrollCb, {
      capture: false,
      passive: true,
    });
    return () => {
      if (!ref) return;
      ref.addEventListener('scroll', scrollCb);
    };
  }, [ref]);
  return {
    x,
    y
  };
}
