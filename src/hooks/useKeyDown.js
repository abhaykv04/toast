import { useEffect } from "react";

export default function useKeyDown(keyCode, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === keyCode) {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyCode, callback]);
}
