import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "../../components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../../backend/src/routes/utils.ts";


export default function InitiateReset() {
    const [form, saveInput] = useForm(useState({ email: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleEmailVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        /*const response = await sendHTTPRequest("/auth/password/request-password-reset", "POST", form);
       
        console.log(response);

        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            navigate("/auth/verify");
        }*/
        setError("");
        navigate("/auth/verifyAccount");
    }

    return (
        <Background>
            <div className={styles.sign_up_box_container}>
                <Rectangle cssClass="verification_password_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Email</h1>
                    </div>

                    <div className={styles.reset_input_container}>
                        <p className={styles.password_verification_prompt_text}>
                            Enter your email address and we'll send you a code that you can use to reset your password.
                        </p>

                        <div className={styles.verfication_input_box_container}>
                            <InputBox input_box_title="Email" type="email" name="email" handleChange={saveInput} />
                            {error && <p className={styles.error_message}>{error}</p>}
                        </div>

                        <div className={styles.reset_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>navigate("/auth/login")}/>
                            <Button prompt="Submit" buttonCSS="auth_button" isDisabled={!validateEmail(form.email)} handleClick={handleEmailVerification}/>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}