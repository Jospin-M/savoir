import styles from "./Profile.module.css";
import Sidebar from "./sidebar/Sidebar";

export default function ProfileContent() {
    return (
        <div className={styles.profile_content}>
            <Sidebar />
        </div>
    );
}