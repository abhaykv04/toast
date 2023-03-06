import React, { useEffect, useId, useRef, useState } from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const id = useId();
  const [messageValue, setMessageValue] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("notice");
  const [toastList, setToastList] = useState([]);

  function handleToastAdd(event) {
    event.preventDefault();

    if (!messageValue) {
      return;
    }

    const nextToastList = toastList;

    nextToastList.push({
      id: crypto.randomUUID(),
      messageValue,
      selectedVariant,
    });

    setToastList(nextToastList);
    setMessageValue("");
    setSelectedVariant("notice");
  }

  function handleToastDismiss(id) {
    const nextToastList = toastList.filter((toast) => toast.id !== id);
    setToastList(nextToastList);
  }

  return (
    <form className={styles.wrapper} onSubmit={handleToastAdd}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toastList.length > 0 && (
        <ToastShelf
          toastList={toastList}
          handleToastDismiss={handleToastDismiss}
        />
      )}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={messageValue}
              onChange={(event) => setMessageValue(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              return (
                <label key={option} htmlFor={`${id}-${option}`}>
                  <input
                    id={`${id}-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={selectedVariant === option}
                    onChange={(event) => setSelectedVariant(event.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
