import type { MouseEventHandler } from "react";
import styles from "./Common.module.css";

type ButtonProps = {
    prompt: string,
    isDisabled: boolean,
    buttonCSSClass: string,
    buttonTitleCSSClass: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ prompt, buttonCSSClass, buttonTitleCSSClass, isDisabled, handleClick } : ButtonProps) {
    return (
        <div className={styles.button_container}>
            <button className={styles[buttonCSSClass]} onClick={handleClick} disabled={isDisabled}>
                <div className={styles[buttonTitleCSSClass]}>
                    {prompt}
                </div>
            </button>
        </div>
    );
}