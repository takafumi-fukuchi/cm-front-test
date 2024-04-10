import { clsx } from "clsx";
import { forwardRef, useEffect, useState, type ComponentPropsWithRef } from "react";
import styles from "./styles.module.scss";

interface TextAreaProps extends ComponentPropsWithRef<"textarea"> {
  isInvalid?: boolean;
  required?: boolean;
  errorMessage?: string;
  label?: string;
  maxLength?: number; // 最大文字数を指定するためのプロパティ
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ isInvalid, errorMessage, label, required, maxLength, ...rest }, ref) => {
    const [characterCount, setCharacterCount] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(event.target.value.length);
      if (rest.onChange) {
        rest.onChange(event);
      }
    };

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        setCharacterCount(ref.current.value.length);
      }
    }, [ref]);

    const textAreaClasses = clsx(styles.textArea, {
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
          {maxLength && (
            <div className={styles.characterCount}>
              {characterCount}/{maxLength}
            </div>
          )}
        </div>
        <textarea ref={ref} className={textAreaClasses} onChange={handleInputChange} maxLength={maxLength} {...rest} />
        {isInvalid && errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
