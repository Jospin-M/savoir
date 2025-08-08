import Rectangle from "../../components/common/Rectangle";
import PasswordInputBox from "../../components/auth/PasswordInputBox";
import Button from "../../components/common/Button";
import styles from "../../components/auth/Auth.module.css"

import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../stores/useUserStore.ts";

import { validateInputLength } from "../../components/listeners/formValidators";
import supabase, { sendHTTPRequest } from "../../../lib/utils.ts";

export default function VerifyAccount() {
    const [code, saveInput] = useForm(useState({ code: "" }));
    const [error, setError] = useState("");
    const router = useRouter();

    const setUserID = useUserStore((state) => state.setUserID);
    const clearUser = useUserStore((state) => state.clearUser);
    const user = useUserStore((state) => state.user);
    
    async function handleVerification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/verifyNewUser", "POST", { verificationCode: code, verificationRequest: user });
        console.log(response)
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
            clearUser();
            setError("");
            //navigate(`/profile/${user.id}`, { replace: true });
        }
    }

    return (
        <div className={styles.auth_background}>
            <Rectangle cssClass={"verification_page_background"}>
                <div className={styles.verification_container}>
                    <h1 className={styles.box_header}>Verify Account</h1>

                    <p className={styles.verification_prompt_text}>
                        We've sent a 6-digit code to your email. Please enter the code below to verify your account.
                    </p>

                    <form className={styles.user_input}>
                        <PasswordInputBox name="code" inputBoxName="Verification Code" handleChange={saveInput}/>
                        
                        <div className={styles.verification_error_message_container}>
                            {error && <p className={styles.verification_error_message}>{error}</p>}
                        </div>

                        <div className={styles.verification_navigation_buttons_container}>
                            <div className={styles.nav_button_container}>
                                <Button prompt="Back" isDisabled={false} handleClick={(event)=>{
                                    event.preventDefault()
                                    router.push("/auth/signup")
                                }}/>     
                            </div>  

                            <div className={styles.nav_button_container}>
                                <Button prompt="Verify" isDisabled={!validateInputLength(code.code, 6)} handleClick={handleVerification}/>
                            </div>
                        </div>
                    </form>
                </div>
            </Rectangle>
        </div>
    );
}