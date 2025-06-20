import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import Divider from "../../components/common/Divider.tsx";
import styles from "../../components/Auth/Auth.module.css";

import { useState } from "react";

export default function SignUp() {
    const [form, setForm] = useState({ email: "", password: "", name: "", username: "" });

    return (
        <Background>
            <div className={styles.sign_up_box_container}>
                <Rectangle cssClass="sign_up_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Sign Up</h1>
                    </div>

                    <div className={styles.sign_up_input_container}> 
                        <InputBox input_box_title="Full Name" type="text" name="fullname" handleChange={() => {}}/> 
                        <InputBox input_box_title="Email" type="email" name="email" handleChange={() => {}}/> 
                        <PasswordInputBox name="password" handleChange={() => {}}/>
                        <Button prompt="Create Account" isDisabled={false} handleClick={() => {}}/>
                    </div> 

                    <div className={styles.div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.sign_up_hyperlink_container}>
                        <div className={styles.text_hyperlink_container}>
                            Already have an account? 
                            
                            <a className={styles.auth_hyperlink}>Sign Up</a>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}