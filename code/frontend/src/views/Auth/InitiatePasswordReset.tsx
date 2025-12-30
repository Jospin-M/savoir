import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";
    
import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useRouter } from "next/navigation";

import { validateEmail } from "../../components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../lib/utils.ts";

export default function InitiateReset() {
    const [form, saveInput] = useForm(useState({ email: "" }));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [count, setCount] = useState(0);
    
    const router = useRouter();

    const messageToDisplay = success ? success : error;
    const styleToUse = success ? "email_verification_success_message" : "verification_error_message";
    
    async function handleEmailVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        if(count < 1) {
            const response = await sendHTTPRequest("/auth/password/request-reset", "POST", form);

            if(response.error) {
                setError(response.error);
            } else {
                setError("");
                setCount(count+1);
                setSuccess("Check your inbox for a reset link.");
            }
        }
    }

    return (
       <div className={styles.auth_background}>
            <Rectangle cssClass="verification_page_background">
                <div className={styles.verification_container}>
                    <h1 className={styles.box_header}>Verify Email</h1>

                    <p className={styles.password_verification_prompt_text}>
                        Enter your email address and we'll send you a link that you can use to reset your password.
                    </p>

                    <form className={styles.user_input}>
                        <InputBox input_box_title="Email" name="email" handleChange={saveInput} />
                    
                        <div className={styles.verification_error_message_container}>
                            {messageToDisplay && <p className={styles[styleToUse]}>{messageToDisplay}</p>}
                        </div>
                    
                        <div className={styles.verification_navigation_buttons_container}>
                            <div className={styles.nav_button_container}>
                                <Button prompt="Back" isDisabled={false} handleClick={(event)=>{
                                    event.preventDefault();
                                    router.push("/auth/login");
                                }}/>
                            </div>
                            
                            <div className={styles.nav_button_container}>
                                <Button prompt="Submit" isDisabled={!validateEmail(form.email)} handleClick={handleEmailVerification}/>
                            </div>
                        </div>
                    </form>
                </div>
            </Rectangle>
       </div>
    );
}