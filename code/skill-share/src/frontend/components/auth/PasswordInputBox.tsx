import { useState, type ChangeEventHandler } from "react"
import { Eye, EyeOff } from "lucide-react"
import styles from "./Auth.module.css"

type PasswordInputBoxProps = {
    input: string,
    name: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInputBox({ input, handleChange, name }: PasswordInputBoxProps ) {
    const [visible, setVisible] = useState(true);

    return (
        <div className={styles.password_component}>
            <label className={styles.password_box_title}>Password</label> 
            
            <div style={{position: "relative"}}>
                <input type={visible ? "password" : "text"} name={name} className={styles.password_input_box} value={input} onChange={handleChange}/>
        
                <div className={styles.password_icon_container}>
                    <span onClick={() => setVisible(!visible)} className={styles.password_icon}>   
                        {visible ? <Eye size={18}/> : <EyeOff size={18}/>}
                    </span>
                </div>
            </div>
        </div>        
    );
}