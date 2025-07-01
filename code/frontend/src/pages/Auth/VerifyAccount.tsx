import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";

import { validateInputLength } from "../../components/listeners/formValidators";
import { useNavigate, useLocation } from "react-router-dom";
import { sendHTTPRequest } from "../../../../backend/src/routes/utils";

export default function VerifyCode() {
    const [code, saveInput] = useForm(useState({ code: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const loginResponse = location.state;
    
    async function handleVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/verify", "POST", { verificationCode: code, verificationRequest: loginResponse });
        console.log(response);

        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            navigate("/");
        }
    }

    return (
        <Background>
            <div className={styles.verfication_box_container}>
                <Rectangle cssClass={"verification_page_background"}>
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Account</h1>
                    </div>

                    <div className={styles.verification_input_container}>
                        <p className={styles.verification_prompt_text}>
                            We've sent a 6-digit code to your email. Please enter the code below to verify your account.
                        </p>

                        <div className={styles.verification_input_box_container}>
                            <PasswordInputBox name="code" inputBoxName="Verification Code" handleChange={saveInput}/>
                            {error && <p className={styles.error_message}>{error}</p>}
                        </div>

                        <div className={styles.verification__buttons_container}>
                            <Button prompt="Back" buttonCSS="auth_button" isDisabled={false} handleClick={()=>navigate("/auth/signup")}/>
                            <Button prompt="Verify" buttonCSS="auth_button" isDisabled={!validateInputLength(code.code, 6)} handleClick={handleVerification}/>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}