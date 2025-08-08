import type { ChangeEventHandler } from "react";
import styles from "./Auth.module.css";

type InputBoxProps = {
    input_box_title: string,
    name: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({ input_box_title, name, handleChange } : InputBoxProps) {
    return (
        <div className={styles["form-group"]}>
            <label htmlFor={name} className={styles.input_box_title} >{input_box_title}</label>
            <input type={"email"} name={name} onChange={handleChange}/>
        </div>
    );
}