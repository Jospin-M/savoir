import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { validateInputLength } from "../../components/listeners/formValidators.ts";

export default function ChangePassword() {
    const [form, saveInput] = useForm(useState({ password: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    async function handlePasswordChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();


    }
    console.log(form.password);
    console.log(validateInputLength(form.password, 8));

    return (
        <Background>
            <Rectangle cssClass="reset_password_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Reset Password</h1>
                    </div>

                    <div className={styles.reset_input_container}>
                        <p className={styles.password_verification_prompt_text}>
                            Please enter your new password.
                        </p>

                        <div className={styles.verfication_input_box_container}>
                            <PasswordInputBox name="password" inputBoxName="New Password" handleChange={saveInput} />
                            {error && <p className={styles.error_message}>{error}</p>}
                        </div>

                        <div className={styles.reset_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>navigate("/auth/login")}/>
                            <Button prompt="Submit" buttonCSS="auth_button" isDisabled={!validateInputLength(form.password, 8)} handleClick={handlePasswordChange}/>
                        </div>
                    </div>
                </Rectangle>
        </Background>
    );
}