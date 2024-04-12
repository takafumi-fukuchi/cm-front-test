import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithRef } from "react";
import styles from "./styles.module.scss";

interface InputProps extends ComponentPropsWithRef<"input"> {
  isInvalid?: boolean;
  required?: boolean;
  label?: string;
  errorMessage?: string;
  showCharacterCount?: boolean;
  inputValue?: number;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, required, label, errorMessage, showCharacterCount, inputValue, maxLength, ...rest }, ref) => {
    const inputClasses = clsx(styles.input, {
      [styles.isInvalid]: isInvalid,
    });

    return (
      <div className={styles.wrapper}>
        <div className={styles.labelAndCountContainer}>
          {label && (
            <label className={styles.label}>
              {label}
              {required && <span className={styles.requiredApostrophe}>*</span>}
            </label>
          )}{" "}
          {showCharacterCount && <div className={styles.characterCount}>{`${inputValue} / ${maxLength}`}</div>}
        </div>
        <input ref={ref} className={inputClasses} {...rest} />
        {isInvalid && errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";
