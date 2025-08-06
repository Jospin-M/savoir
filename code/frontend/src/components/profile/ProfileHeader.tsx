import { useUserStore } from "../../stores/useUserStore";
import styles from "./Profile.module.css";

export default function ProfileHeader() {
    const profileImageURL = useUserStore((state) => state.profileImageURL)!;
    const name = useUserStore((state) => state.name);
    
    return (
        <div className={styles.profile_header}>
            <div className={styles.cover_photo}>
                <div className={styles.cover_photo_placeholder}>
                    <i className="ri-image-line"/>
                    Add Cover Photo
                </div>
            </div>

            <img className={styles.profile_picture} src={profileImageURL}/>

            <div className={styles.profile_name}>
                <h1>{name}</h1>
            </div>
        </div>
    );
}