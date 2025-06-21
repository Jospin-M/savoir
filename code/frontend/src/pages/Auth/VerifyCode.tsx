import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";

import { validateInputLength } from "../../components/listeners/formValidators";

export default function VerifyCode() {
    const [code, saveInput] = useForm(useState({ code: "" }));
    // research how to stop page from dynamically resizing
    return (
        <Background>
            <div className={styles.verfication_box_container}>
                <Rectangle cssClass={"verification_page_background"}>
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Code</h1>
                    </div>

                    <div className={styles.verification_input_container}>
                        <p className={styles.verification_prompt_text}>
                            We've sent a 5-digit code to your email. Please enter the code below to verify your account.
                        </p>

                        <div className={styles.verification_input_box_container}>
                            <PasswordInputBox name="code" inputBoxName="Verification Code" handleChange={saveInput}/>
                        </div>

                        <div className={styles.navigation_buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>{}}/>
                            <Button prompt="Verify" buttonCSS="auth_button" isDisabled={!validateInputLength(code.code, 5)} handleClick={()=>{}}/>
                        </div>
                    </div>

                </Rectangle>
            </div>
        </Background>
    );
}