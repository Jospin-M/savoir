import styles from "./Profile.module.css";
import Sidebar from "./Sidebar";

export default function ProfileContent() {
    return (
        <div className={styles.profile_content}>
            <Sidebar />
        </div>
    );
}