import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and look in localStorage for current value
 * (if not found, defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage::
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = JSON.parse(localStorage.getItem(key)) || firstValue;
  console.log("useLocalStorage - init key & value", key, initialValue )

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    console.debug("useLocalStorage - useEffect", "key & item=", key, item);

    if (item === null) {
      console.log("userLocalStorage - item is null");
      localStorage.removeItem(key);
    } else {
      console.log("userLocalStorage - setItem key is item", key, item);
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
