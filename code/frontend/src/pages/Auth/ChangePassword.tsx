import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";

import { validateInputLength } from "../../components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../../backend/src/routes/utils.ts";
import { parseAuthFragment } from "../../../lib/supabaseClient.ts";

export default function ChangePassword() {
    const [form, saveInput] = useForm(useState({ newPassword: "" }));
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    // save cookies on submission from browser url
    async function handlePasswordChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const response = await sendHTTPRequest("/auth/password/reset", "POST", { 
            form: form,
            session: parseAuthFragment()
        });
        console.log(response);
        
        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            setSuccess(response.message);
            navigate("/auth/login", { replace: true });
        }
        // TODO: HANDLE PASSWORD CHANGE
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
                                    {error && <p className={styles.error_message}>{error}</p>}
                                    {success && <p className={styles.success_message}>{success}</p>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.reset_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>navigate("/auth/password/sendResetLink")}/>
                            <Button prompt="Submit" buttonCSS="auth_button" isDisabled={!validateInputLength(form.newPassword, 8)} handleClick={handlePasswordChange}/>
                        </div>
                    </div>
                </Rectangle>
        </Background>
    );
}