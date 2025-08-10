import Link from "next/Link";
import styles from "./Common.module.css";

export default function NavBar() {
    return (
        <div className={styles.sidebar}>
            <Link href="" className={styles.nav_item}>
                <i className="ri-dashboard-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Dashboard</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-lightbulb-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Skills</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-message-3-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Messages</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-refresh-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Sessions</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-star-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Reviews</div>
            </Link>
        </div>
    );
}