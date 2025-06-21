import Background from "../../components/auth/Background";
import Rectangle from "../../components/common/Rectangle";

import styles from "../../components/auth/Auth.module.css"

export default function VerifyCode() {
    return (
        <Background>
            <div className={styles.sign_up_box_container}>
                <Rectangle cssClass="sign_up_page_background">
                    <div className={styles.box}>
                        <h1 className={styles.box_header}>Verify Code</h1>
                    </div>

                    <div className={styles.verfiy_code_container}>
                        <p className={styles.verify_code_text}>
                            We've sent a 6-digit code to your email. Please enter the code below to verfiy your account.
                        </p>
                    </div>
                </Rectangle>
            </div>
        </Background>
    );
}