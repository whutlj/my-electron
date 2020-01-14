import React from 'react';

export default function useFirstMountState() {
  const isFirst = React.useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}