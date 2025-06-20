import type { MouseEventHandler } from "react";
import styles from "./General.module.css"

type ButtonProps = {
    prompt: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ prompt, handleClick } : ButtonProps) {
    return (
        <div className={styles.button_container}>
            <button className={styles.button} onClick={handleClick}>
                <div className={styles.button_title}>
                    {prompt}
                </div>
            </button>
        </div>
    );
}