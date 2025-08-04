import { useState, type ChangeEventHandler } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Auth.module.css";

type PasswordInputBoxProps = {
    name: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInputBox({ name, handleChange }: PasswordInputBoxProps ) {
    const [visible, setVisible] = useState(true);

    return (
        <div className={styles["form-group"]}>
            <label htmlFor={name}>Password</label> 
            
            <div style={{position: "relative"}}>
                <input type={visible ? "password" : "text"} name={name} onChange={handleChange}/>
        
                <span onClick={() => setVisible(!visible)} className={styles.password_icon}>   
                    {visible ? <Eye size={18}/> : <EyeOff size={18}/>}
                </span>
            </div>
        </div>        
    );
}