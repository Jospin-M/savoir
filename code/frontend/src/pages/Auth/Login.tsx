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

import { validateAuthForm } from "../../components/common/listeners/formValidators.ts";
import { UserAuth } from "../../context/AuthContext.tsx";

export default function Login() {
    // explore other ways to use box shadow
    const [form, saveInput] = useForm(useState({ email: "", password: "" }))
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { session, logInUser } = UserAuth();
    const navigate = useNavigate();

    console.log(session);
    
    async function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await logInUser({ email: form.email, password: form.password });
            
            if(result.success) {
                navigate("/"); // change to dashboard once page has been made
            }
        } catch(err) {
            setError("An error occured.");
        } finally {
            setLoading(false);
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
                        <Button prompt="Log In"  buttonCSS="auth_button" isDisabled={validateAuthForm(form)} handleClick={handleLogin}/>
                    </div> 

                    <div className={styles.div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.auth_hyperlink_container}>
                        <a className={styles.auth_hyperlink}>Forgot Password?</a>

                        <div className={styles.text_hyperlink_container}>
                            Don't have an account? 
                            <Link className={styles.auth_hyperlink} to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}