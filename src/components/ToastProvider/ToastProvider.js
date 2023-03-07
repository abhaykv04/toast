import React, { createContext, useState } from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = useState([]);

  useKeyDown("Escape", () => handleDismissAll());

  function handleToastAdd(message, variant) {
    const nextToastList = [...toastList];

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
