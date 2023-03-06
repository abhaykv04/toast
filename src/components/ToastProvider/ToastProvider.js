import React, { createContext, useState } from "react";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = useState([]);

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
