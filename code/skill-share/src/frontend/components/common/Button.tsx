import type { MouseEventHandler } from "react";
import styles from "./Common.module.css"

type ButtonProps = {
    prompt: string,
    isDisabled: boolean,
    buttonCSS: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ prompt, buttonCSS, isDisabled, handleClick } : ButtonProps) {
    return (
        <div className={styles.button_container}>
            <button className={styles[buttonCSS]} onClick={handleClick} disabled={isDisabled}>
                <div className={styles.button_title}>
                    {prompt}
                </div>
            </button>
        </div>
    );
}