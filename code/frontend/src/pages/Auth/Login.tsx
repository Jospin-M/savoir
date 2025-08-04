import InputBox from "../../components/auth/InputBox.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import Divider from "../../components/common/Divider.tsx";
import styles from "../../components/Auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore.ts";
import { Link } from "react-router-dom";

import { validateAuthForm } from "../../../src/components/listeners/formValidators.ts";
import { getUserProfileImageURL, sendHTTPRequest } from "../../../lib/utils.ts";
import supabase from "../../../lib/utils.ts";
import Rectangle from "../../components/common/Rectangle.tsx";

export default function Login() {
    // explore other ways to use box shadow
    // handle loading state
    const [form, saveInput] = useForm(useState({ email: "", password: "" }));
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setUserID = useUserStore((state) => state.setUserID);
    const setProfileImageURL = useUserStore((state) => state.setProfileImageURL);
    
    async function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/login", "POST", form);
        
        if(response.error) {
            setError(response.error);
        } else {
            const { user_id, session } = response;
            const { access_token, refresh_token } = session;
            
            supabase.auth.setSession({ 
                access_token: access_token, 
                refresh_token: refresh_token 
            });

            // update the user store
            setUserID(user_id);
            setProfileImageURL(await getUserProfileImageURL(user_id));

            setError("");
            navigate(`/profile/${user_id}/`); // if username is added, it should be used here instead of id
        }
    }

    return (
        <div className={styles.auth_background}>
            <Rectangle cssClass="login_page_background">
                <div className={styles.login_container}>
                    <h1 className={styles.box_header}>Savoir</h1>

                    <form> 
                        <InputBox input_box_title="Email Address" type="email" name="email" handleChange={saveInput}/> 
                        <PasswordInputBox name="password" handleChange={saveInput}/>
                        
                        <Button prompt="Log In" isDisabled={validateAuthForm(form)} handleClick={handleLogin}/>
                    </form> 

                    <div className={styles.login_error_message_container}>
                        {error && <p className={styles.login_error_message}>{error}</p>}
                    </div>

                    <div className={styles.login_div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.auth_hyperlink_container}>
                        <Link className={styles.auth_hyperlink} to="/auth/password/sendResetLink">Forgot Password?</Link>

                        <div className={styles.text_hyperlink_container}>
                            Don't have an account?
                            
                            <Link className={styles.auth_hyperlink} to="/auth/signup"> Sign Up</Link>
                        </div>
                    </div>
                </div>
            </Rectangle>
        </div>
    );
}