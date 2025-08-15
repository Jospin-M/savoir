import Sidebar from "./sidebar/Sidebar";

import styles from "./Profile.module.css";
export default function ProfileContent() {
    return (
        <div className={styles.profile_content}>
            <Sidebar />
        </div>
    );
}