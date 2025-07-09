import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";

import { validateInputLength } from "../../components/listeners/formValidators.ts";
import { sendHTTPRequest, parseAuthFragment } from "../../../lib/utils.ts";

export default function ChangePassword() {
    const [form, saveInput] = useForm(useState({ newPassword: "" }));
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    let [count, setCount] = useState(0);
    const navigate = useNavigate();

    const messageToDisplay = success ? success : error;
    const styleToUse = success ? "password_success_message" : "password_error_message";
    
    async function handlePasswordChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        if(count < 1) { // basic rate limiting, reinforce later on
            const response = await sendHTTPRequest("/auth/password/reset", "POST", { 
                form: form,
                session: parseAuthFragment()
            });
        
            if(response.error) {
                setError(response.error);
            } else {
                setError("");
                setSuccess(response.message);
                setTimeout(() => {
                    navigate("/auth/login", { replace: true });
                }, 1500);
            }

            setCount(count+1);
        }
    }

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
                            <div className={styles.email_response_container}>
                                <PasswordInputBox name="newPassword" inputBoxName="New Password" handleChange={saveInput} />
                                
                                <div className={styles.password_update_response}>
                                    {messageToDisplay && <p className={styles[styleToUse]}>{messageToDisplay}</p>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.reset_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSSClass="auth_button" buttonTitleCSSClass="auth_button_title" isDisabled={false} handleClick={()=>navigate("/auth/password/sendResetLink")}/>
                            <Button prompt="Submit" buttonCSSClass="auth_button" buttonTitleCSSClass="auth_button_title" isDisabled={!validateInputLength(form.newPassword, 8)} handleClick={handlePasswordChange}/>
                        </div>
                    </div>
                </Rectangle>
        </Background>
    );
}