import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toastList, handleToastDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toastList.map((toast) => {
        const { id, messageValue, selectedVariant } = toast;

        return (
          <li key={id} className={styles.toastWrapper}>
            <Toast
              key={id}
              id={id}
              selectedVariant={selectedVariant}
              handleToastDismiss={handleToastDismiss}
            >
              {messageValue}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
