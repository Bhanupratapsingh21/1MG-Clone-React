import { useState, useEffect } from 'react';

function useLocalStorageArray(key, initialValue = []) {
  const [array, setArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem(key));
    return storedArray || initialValue;
  });

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem(key));
    if (storedArray) {
      setArray(storedArray);
    }
  }, [key]);

  const addToLocalStorageArray = (objectToAdd) => {
    setArray(prevArray => {
      const newArray = [...prevArray, objectToAdd];
      localStorage.setItem(key, JSON.stringify(newArray));
      return newArray;
    });
  };

  return [array, addToLocalStorageArray];
}

export default useLocalStorageArray;
