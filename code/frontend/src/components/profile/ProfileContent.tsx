import Sidebar from "./sidebar/Sidebar";
import ProfileHeader from "./ProfileHeader";

import commonStyles from "../common/Common.module.css"
import styles from "./Profile.module.css";

export default function ProfileContent() {
    return (
        <div className={commonStyles.page_content}>
            <ProfileHeader />

            <Sidebar />
            <div className={styles.profile_content}>
                
            </div>
        </div>
    );
}