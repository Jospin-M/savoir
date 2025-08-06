import Button from "../common/Button.tsx";
import styles from "../../components/profile/Profile.module.css";

export default function Header({ fullName, profileImageUrl }: { fullName: string, profileImageUrl: string }) {
    return (
        <div className={styles.profile_header}>
            <div className={styles.profile_header_top_layer}>
                    <img className={styles.profile_pic} src={profileImageUrl}/>
            
                    <div className={styles.name_container}>
                        <div className={styles["roboto-name"]}>{fullName}</div>
                    </div>

                    <div className={styles.edit_profile_button_container}>
                        <Button prompt="Edit Profile" isDisabled={false} handleClick={() => {}}/>
                    </div>
            </div>  
        </div>  
    );
}