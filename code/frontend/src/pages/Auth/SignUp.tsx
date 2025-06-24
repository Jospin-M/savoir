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

import { validateSignUpForm } from "../../components/common/listeners/formValidators.ts";
import { UserAuth } from "../../context/AuthContext.tsx";

export default function SignUp() {
    const [form, saveInput] = useForm(useState({ fullName: "", email: "", password: "" }));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    
    async function handleSignUp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await signUpNewUser({ email: form.email, password: form.password });
            
            if(result.success) {
                navigate("/verify"); // change to dashboard once page has been made
            }
        } catch(err) {
            setError("An error occured.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Background>
            <div className={styles.sign_up_box_container}>
                <Rectangle cssClass="sign_up_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Sign Up</h1>
                    </div>

                    <div className={styles.sign_up_input_container}> 
                        <InputBox input_box_title="Full Name" type="text" name="fullName" handleChange={saveInput}/> 
                        <InputBox input_box_title="Email" type="email" name="email" handleChange={saveInput}/> 
                        <PasswordInputBox name="password" inputBoxName="Password" handleChange={saveInput}/>
                        <Button prompt="Register" buttonCSS="auth_button" isDisabled={validateSignUpForm(form)} handleClick={handleSignUp}/>
                        {error && <p className={styles.error_message}>{error}</p>}
                    </div> 

                    <div className={styles.div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.sign_up_hyperlink_container}>
                        <div className={styles.text_hyperlink_container}>
                            Already have an account? 
                            <Link className={styles.auth_hyperlink} to="/login">Log In</Link>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}