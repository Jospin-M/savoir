import { useState, type ChangeEventHandler } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Auth.module.css";

type PasswordInputBoxProps = {
    name: string,
    inputBoxName: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInputBox({ name, inputBoxName, handleChange }: PasswordInputBoxProps ) {
    const [visible, setVisible] = useState(true);
    const styling: React.CSSProperties = {
        position: "relative",
        zIndex: 50
    }

    return (
        <div className={styles["form-group"]}>
            <label htmlFor={name} className={styles.input_box_title}>{inputBoxName}</label> 
            <input className={"password-Input"} type={visible ? "password" : "text"} name={name} onChange={handleChange}/>
    
            <span onClick={() => setVisible(!visible)} className={styles.password_icon}>   
                {visible ? <Eye style={styling} size={18}/> : <EyeOff size={18} style={styling}/>}
            </span>
        </div>        
    );
}