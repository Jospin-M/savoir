import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import Divider from "../../components/common/Divider.tsx";
import styles from "../../components/Auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { validateAuthForm } from "../../../src/components/listeners/formValidators.ts";
import { saveUserID, sendHTTPRequest } from "../../../lib/utils.ts";
import supabase from "../../../lib/utils.ts";

export default function Login() {
    // explore other ways to use box shadow
    // handle loading state
    const [form, saveInput] = useForm(useState({ email: "", password: "" }))
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
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

            saveUserID(user_id);
            setError("");
            navigate("/profile/" + user_id); // navigate to profile page once created
        }
    }

    return (
        <Background>
            <div className={styles.login_box_container}>
                <Rectangle cssClass={"login_page_background"}>
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Log In</h1>
                    </div>

                    <div className={styles.login_input_container}> 
                        <InputBox input_box_title="Email" type="email" name="email" handleChange={saveInput}/> 
                        <PasswordInputBox name="password" inputBoxName="Password" handleChange={saveInput}/>
                        
                        <div className={styles.login_button_container}>
                            <Button prompt="Log In"  cssClass="auth_button" isDisabled={validateAuthForm(form)} handleClick={handleLogin}/>
                        </div>
                        {error && <p className={styles.login_error_message}>{error}</p>}
                    </div> 

                    <div className={styles.login_div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.auth_hyperlink_container}>
                        <Link className={styles.auth_hyperlink} to="/auth/password/sendResetLink">Forgot Password?</Link>

                        <div className={styles.text_hyperlink_container}>
                            <div className={styles.text_hyperlink_container}>
                                Don't have an account?
                            </div>
                            <Link className={styles.auth_hyperlink} to="/auth/signup"> Sign Up</Link>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}