import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";

import { validateInputLength } from "../../components/listeners/formValidators";
import { useNavigate, useLocation } from "react-router-dom";
import { sendHTTPRequest } from "../../../lib/utils.ts";

export default function VerifyCode() {
    const [code, saveInput] = useForm(useState({ code: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const registrationResponse = location.state;
    
    async function handleVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/verifyNewUser", "POST", { verificationCode: code, verificationRequest: registrationResponse });
        console.log(response);

        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            navigate("/profile/", { replace: true }); //id should be attached
        }
    }

    return (
        <Background>
            <div className={styles.verfication_box_container}>
                <Rectangle cssClass={"verification_page_background"}>
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Code</h1>
                    </div>

                    <div className={styles.verification_input_container}>
                        <p className={styles.verification_prompt_text}>
                            We've sent a 6-digit code to your email. Please enter the code below to verify your account.
                        </p>

                        <div className={styles.verification_input_box_container}>
                            <PasswordInputBox name="code" inputBoxName="Verification Code" handleChange={saveInput}/>
                            
                            <div className={styles.verification_error_message}>
                                {error && <p className={styles.error_message}>{error}</p>}
                            </div>
                        </div>

                        <div className={styles.verification_navigation_buttons_container}>
                            <Button prompt="Back" buttonCSSClass="auth_button" buttonTitleCSSClass="auth_button_title" isDisabled={false} handleClick={()=>navigate("/auth/signup")}/>
                            <Button prompt="Verify" buttonCSSClass="auth_button" buttonTitleCSSClass="auth_button_title" isDisabled={!validateInputLength(code.code, 6)} handleClick={handleVerification}/>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}