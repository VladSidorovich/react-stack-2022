import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 300) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounce;
};
