import Background from "../../components/auth/Background.tsx";
import Rectangle from "../../components/common/Rectangle.tsx";
import InputBox from "../../components/auth/InputBox.tsx";
import PasswordInputBox from "../../components/auth/PasswordInputBox.tsx";
import Button from "../../components/common/Button.tsx";
import Divider from "../../components/common/Divider.tsx";
import Hyperlink from "../../components/auth/Hyperlink.tsx";
import styles from "../../components/Auth/Auth.module.css";
import { useState } from "react";

export default function Login() {
    // explore other ways to use box shadow
    
    const [form, setForm] = useState({ username: "", password: "" });

    // research using custom hooks for reuse of function across components so that function doesn't need to
    // be defined in each component
    function saveInput(event: React.ChangeEvent<HTMLInputElement>) { 
        const { name, value } = event.target;
        
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // implement handler that does not allow submission if username or password don't meet length requirements
    // --> grey out login button
    // this behaviour should be mirrored on other auth forms
    // implement loading icon
    
    function submitInput() { // replace with controller when backend is implemented so that error is appropriately shown on invalid input
        console.log("Submitted data: ", form.username, form.password);
    }

    return (
        <Background>
            <div className={styles.box_container}>
                <Rectangle>
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Log In</h1>
                    </div>

                    <div className={styles.input_container}> 
                        <InputBox input_box_title="Username or email" type="email" name="username" input={form.username} handleChange={saveInput}/> 
                        <PasswordInputBox name="password" input={form.password} handleChange={saveInput}/>
                        <Button prompt="Log In" handleClick={submitInput}/>
                    </div> 

                    <div className={styles.div_container}>
                        <Divider length={60} />
                    </div>

                    <div className={styles.hyperlink_container}>
                        <Hyperlink prompt="Forgot Password?"/>
                        <Hyperlink prompt="Don't have an account? Sign up"/>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}