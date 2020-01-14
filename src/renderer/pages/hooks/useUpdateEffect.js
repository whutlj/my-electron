import React from 'react';
import useFirstMountState from './useFirstMountState';

export default function useUpdateEffect(effect, deps) {
  const isFirst = useFirstMountState();
  React.useEffect(function() {
    if (!isFirst) {
      effect();
    }
  }, deps);
}
