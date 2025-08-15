import styles from "./Profile.module.css";

import { useProfileData } from "../../hooks/useProfileData";

export default function ProfileHeader() {
    const { profileQuery: { data } } = useProfileData();

    return (
        <div className={styles.profile_header}>
            <div className={styles.cover_photo_container}>
                <img className={styles.cover_photo} src={data?.coverImageUrl}/>
            </div>
            
            <div className={styles.profile_picture_container}>
                <img className={styles.profile_picture} src={data?.profileImageUrl}/>

                <div className={styles.profile_name}>
                    <h2 className={styles.profile_header_name }>{data?.fullName}</h2>
                </div>
            </div>
        </div>
    );
}