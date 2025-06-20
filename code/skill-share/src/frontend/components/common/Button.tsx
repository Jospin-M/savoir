import type { MouseEventHandler } from "react";
import styles from "./General.module.css"

type ButtonProps = {
    prompt: string,
    isDisabled: boolean,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ prompt, isDisabled, handleClick } : ButtonProps) {
    return (
        <div className={styles.button_container}>
            <button className={styles.button} onClick={handleClick} disabled={isDisabled}>
                <div className={styles.button_title}>
                    {prompt}
                </div>
            </button>
        </div>
    );
}