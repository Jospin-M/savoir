import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import Divider from "../../components/common/Divider.tsx";

import styles from "../../components/auth/Auth.module.css";

import { useState } from "react";
import { useForm } from "../../hooks/useForm.ts";
import { useRouter } from "next/navigation";
import Link from "next/Link";

import { validateSignUpForm } from "../../../src/components/listeners/formValidators.ts";
import { sendHTTPRequest } from "../../../lib/utils.ts";

export default function SignUp() {
    const [form, saveInput] = useForm(useState({ fullName: "", email: "", password: "" }));
    const [error, setError] = useState("");
    const router = useRouter();
    // const [loading, setLoading] = useState(false); handle loading state
    
    // move this code to server middleware
    async function handleSignUp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        
        const response = await sendHTTPRequest("/auth/register", "POST", form);

        if(response.error) {
            setError(response.error);
        } else {
            setError("");
            // use zustand to store server response, then retrieve it on the next page
            // after this data has been used, clear it from the storage
            router.push("/auth/verify"); 
        }
    }
    
    return (
        <div className={styles.auth_background}>
            <Rectangle cssClass="sign_up_page_background">
                <div className={styles.sign_up_container}>
                    <h1 className={styles.box_header}>Savoir</h1>

                    <form className={styles.user_input}>
                        <InputBox input_box_title="Full Name" type="text" name="fullName" handleChange={saveInput}/> 
                        <InputBox input_box_title="Email" type="email" name="email" handleChange={saveInput}/> 
                        <PasswordInputBox name="password" inputBoxName="Password"  handleChange={saveInput}/>
                        
                        <div className={styles.auth_button_container}>
                            <Button prompt="Register" isDisabled={validateSignUpForm(form)} handleClick={handleSignUp}/>
                        </div>
                    </form>

                    <div className={styles.sign_up_error_message_container}>
                        {error && <p className={styles.sign_up_error_message}>{error}</p>}
                    </div>

                    <div className={styles.sign_up_div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.sign_up_hyperlink_container}>
                        <div className={styles.text_hyperlink_container}>
                            Already have an account? 
                            <Link className={styles.auth_hyperlink} href="/auth/login">Log In</Link>
                        </div>
                    </div>
                </div>
            </Rectangle>
        </div>
    );
}