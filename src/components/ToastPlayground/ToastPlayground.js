import React, { useContext, useId, useState } from "react";

import Button from "../Button";
import { ToastContext } from "../ToastProvider/ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const id = useId();
  const [messageValue, setMessageValue] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("notice");

  const { toastList, handleToastAdd } = useContext(ToastContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (!messageValue) {
      return;
    }

    handleToastAdd(messageValue, selectedVariant);

    setMessageValue("");
    setSelectedVariant("notice");
  }

  return (
    <>
      {toastList.length > 0 && <ToastShelf />}

      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

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
                      onChange={(event) =>
                        setSelectedVariant(event.target.value)
                      }
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
    </>
  );
}

export default ToastPlayground;
