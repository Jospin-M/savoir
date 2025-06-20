import type { ChangeEventHandler } from "react";
import styles from "./Auth.module.css"

type InputBoxProps = {
    input_box_title: string,
    name: string,
    type: string,
    input: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({ input_box_title, name, type, input, handleChange } : InputBoxProps) {
    return (
        <div className={styles.input_box_container}>
            <label className={styles.input_box_title}>{input_box_title}</label> 
            <input type={type} name={name} className={styles.input_box} value={input} onChange={handleChange}/>
        </div>
    );
}