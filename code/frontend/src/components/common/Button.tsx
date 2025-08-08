import type { MouseEventHandler } from "react";
import styles from "./Common.module.css";

type ButtonProps = {
    prompt: string,
    isDisabled: boolean,
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ prompt, isDisabled, handleClick } : ButtonProps) {
    return (
         <button type={"button"} className={styles["auth_btn"]} onClick={handleClick} disabled={isDisabled}>
            <div className={""}>
                {prompt}
            </div>
        </button>
    );
}