import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore.ts";

import { validateInputLength } from "../../components/listeners/formValidators";
import supabase, { sendHTTPRequest } from "../../../lib/utils.ts";

export default function VerifyCode() {
    const [code, saveInput] = useForm(useState({ code: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const registrationResponse = location.state;

    const setUserID = useUserStore((state) => state.setUserID);
    
    async function handleVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/verifyNewUser", "POST", { verificationCode: code, verificationRequest: registrationResponse });

        if(response.error) {
            setError(response.error);
        } else {
            const { session: { access_token, refresh_token, user } } = response;

            supabase.auth.setSession({ 
                access_token: access_token,
                refresh_token: refresh_token
            });

            // update the user store
            setUserID(user.id);

            setError("");
            navigate(`/profile/${user.id}`, { replace: true });
        }
    }

    return (
        <div className={styles.auth_background}>
            <Rectangle cssClass={"verification_page_background"}>
                <h1 className={styles.box_header}>Verify Code</h1>
                
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
                        <div>
                            <Button prompt="Back" isDisabled={false} handleClick={()=>navigate("/auth/signup")}/>     
                        </div>  

                        <div>
                            <Button prompt="Verify" isDisabled={!validateInputLength(code.code, 6)} handleClick={handleVerification}/>
                        </div>
                    </div>
                </div>
            </Rectangle>
        </div>
    );
}