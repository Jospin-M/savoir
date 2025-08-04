import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";

import { validateInputLength } from "../../components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../lib/utils.ts";

/**
 * Parses the fragment identifier that appears in the browser URL when the user is changing their password
 * to obtain their current session.
 * 
 * @returns an object containing access and refresh tokens.
 */
function parseAuthFragment() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    
    return {
        access_token: params.get("access_token"),
        refresh_token: params.get("refresh_token")
    }
}

export default function ChangePassword() {
    const [form, saveInput] = useForm(useState({ newPassword: "" }));
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const messageToDisplay = success ? success : error;
    const styleToUse = success ? "password_success_message" : "password_error_message";
    
    async function handlePasswordChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const response = await sendHTTPRequest("/auth/password/reset", "POST", { 
            form: form,
            session: parseAuthFragment()
        });
        
        if(response.error) {
            setSuccess("");
            setError(response.error);
        } else {
            setError("");
            setSuccess(response.message);
            /*setTimeout(() => {
                navigate("/auth/login", { replace: true });
            }, 1500);*/
        }

        setCount(count+1);
    }

    return (
        <Rectangle cssClass="reset_password_page_background">
            <div className={styles.change_password_container}>
                <h1 className={styles.box_header}>Reset Password</h1>

                <p className={styles.reset_password_prompt_text}>
                    Please enter your new password.
                </p>

                <form>
                    <PasswordInputBox name="newPassword" inputBoxName="New Password" handleChange={saveInput} />
                </form>

                <div className={styles.password_change_status_container}>
                    {messageToDisplay && <p className={styles[styleToUse]}>{messageToDisplay}</p>}
                </div>

                <div className={styles.reset_navigation_buttons_container}>
                    <div className={styles.nav_button_container}>
                        <Button prompt="Back" isDisabled={false} handleClick={()=>navigate("/auth/password/sendResetLink")}/>
                    </div>
                    
                    <div className={styles.nav_button_container}>
                        <Button prompt="Submit" isDisabled={!validateInputLength(form.newPassword, 8)} handleClick={handlePasswordChange}/>
                    </div>
                </div>
            </div>
        </Rectangle>
    );
}