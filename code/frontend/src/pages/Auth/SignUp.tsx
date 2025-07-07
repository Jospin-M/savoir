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

import { validateSignUpForm } from "../../../src/components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../../backend/src/routes/utils.ts";

export default function SignUp() {
    const [form, saveInput] = useForm(useState({ fullName: "", email: "", password: "" }));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // handle loading state
    const navigate = useNavigate();
    
    // move this code to server middleware
    async function handleSignUp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const response = await sendHTTPRequest("/auth/register", "POST", form);
        console.log(response);

        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            navigate("/auth/verifyRegistration", { state: response }); 
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
                        
                        <Button prompt="Register" cssClass="auth_button" isDisabled={validateSignUpForm(form)} handleClick={handleSignUp}/>
                        
                        <div className={styles.sign_up_error_message_container}>
                            {error && <p className={styles.sign_up_error_message}>{error}</p>}
                        </div>
                    </div> 

                    <div className={styles.sign_up_div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.sign_up_hyperlink_container}>
                        <div className={styles.text_hyperlink_container}>
                            Already have an account? 
                            <Link className={styles.auth_hyperlink} to="/auth/login">Log In</Link>
                        </div>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}