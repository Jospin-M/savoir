import type { ChangeEventHandler } from "react";
import styles from "./Auth.module.css";

type InputBoxProps = {
    input_box_title: string,
    name: string,
    type: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({ input_box_title, name, type, handleChange } : InputBoxProps) {
    return (
        <div className={styles["form-group"]}>
            <label htmlFor={name}>{input_box_title}</label>
            <input type={type} name={name} onChange={handleChange}/>
        </div>
    );
}