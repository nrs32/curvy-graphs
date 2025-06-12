import { useRef, useEffect, useCallback } from 'react';

// Do not fire until user stops 
export default function useDebounce<T>(callback: (val: T) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debounced = useCallback((val: T) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => callback(val), delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}
