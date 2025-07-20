import Button from "../common/Button.tsx";
import styles from "../../components/profile/Profile.module.css";

export default function Header({ fullName, bio, profileImageUrl }: { fullName: string, bio: string, profileImageUrl: string }) {
    return (
        <div className={styles.profile_header}>
            <div className={styles.profile_header_top_layer}>
                    <img className={styles.profile_pic} src={profileImageUrl}/>
            
                    <div className={styles.name_container}>
                        <div className={styles["roboto-name"]}>{fullName}</div>
                    </div>

                    <div className={styles.edit_profile_button_container}>
                        <Button prompt="Edit Profile" buttonCSSClass="edit_profile_button" buttonTitleCSSClass="roboto-edit_profile" isDisabled={false} handleClick={() => {}}/>
                    </div>
            </div>  

            <div className={styles.bio_container}>
                <p className={styles["roboto-bio"]}>{bio}</p>
            </div>  
        </div>  
    );
}