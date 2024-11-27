import React, { useState, useEffect } from "react";

const useIncrementEffect = (
  initialValue = 0,
  incrementBy = 1,
  delay = 1000,
  targetValue = Infinity
) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = prevCount + incrementBy;
        return nextCount <= targetValue ? nextCount : targetValue;
      });
    }, delay);

    return () => clearInterval(intervalId);
  }, [incrementBy, delay, targetValue]);

  return count;
};

export default useIncrementEffect;
