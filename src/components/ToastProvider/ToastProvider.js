import React, { createContext, useEffect, useState } from "react";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleDismissAll();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleToastAdd(message, variant) {
    const nextToastList = toastList;

    nextToastList.push({
      id: crypto.randomUUID(),
      message,
      variant,
    });

    setToastList(nextToastList);
  }

  function handleToastDismiss(id) {
    const nextToastList = toastList.filter((toast) => toast.id !== id);
    setToastList(nextToastList);
  }

  function handleDismissAll() {
    setToastList([]);
  }

  return (
    <ToastContext.Provider
      value={{
        toastList,
        handleToastAdd,
        handleToastDismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
