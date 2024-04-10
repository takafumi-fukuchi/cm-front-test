import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithRef } from "react";
import styles from "./styles.module.scss";

interface InputProps extends ComponentPropsWithRef<"input"> {
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ isInvalid, ...rest }, ref) => {
  const inputClasses = clsx(styles.input, {
    [styles.isInvalid]: isInvalid,
  });

  return <input ref={ref} className={inputClasses} {...rest} />;
});

Input.displayName = "Input";
