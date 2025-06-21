import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";

import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";


export default function VerifyCode() {
    const [code, saveInput] = useForm(useState({ code: "" }));

    return (
        <Background>
            <div className={styles.verfication_box_container}>
                <Rectangle cssClass="verification_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Code</h1>
                    </div>

                    <div className={styles.verification_input_container}>
                        <p className={styles.verification_prompt_text}>
                            We've sent a 5-digit code to your email. Please enter the code below to verify your account.
                        </p>

                        <PasswordInputBox name="code" inputBoxName="Code" handleChange={saveInput}/>
                    </div>

                </Rectangle>
            </div>
        </Background>
    );
}