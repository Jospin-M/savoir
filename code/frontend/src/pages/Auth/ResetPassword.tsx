import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";
import InputBox from "../../components/auth/InputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "../../../src/components/listeners/formValidators.ts";


export default function ResetPassword() {
    const [form, saveInput] = useForm(useState({ email: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    }

    return (
        <Background>
            <div className={styles.sign_up_box_container}>
                <Rectangle cssClass="reset_password_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Reset Password</h1>
                    </div>

                    <div className={styles.reset_input_container}>
                        <p className={styles.verification_prompt_text}>
                            Enter your email address and we'll send<br/> you a link to get back into your account.
                        </p>

                        <div className={styles.verfication_input_box_container}>
                            <InputBox input_box_title="Email" type="email" name="email" handleChange={saveInput} />
                            {error && <p className={styles.error_message}>{error}</p>}
                        </div>

                        <div className={styles.reset_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>navigate("/auth/login")}/>
                            <Button prompt="Submit" buttonCSS="auth_button" isDisabled={!validateEmail(form.email)} handleClick={handleReset}/>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}