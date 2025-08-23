import styles from "./Common.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Determines if the active style for the Link should be shown depending on the URL parameters and 
 * returns the appropriate styling.
 */
function getStyle(currentPathname: string | null, pathnameToCheck: string) {
    return currentPathname === pathnameToCheck ? 
    `${styles.nav_item}  ${styles.active}`: styles.nav_item;
}

export default function NavBar() {
    const pathname = usePathname();
    
    return (
        <aside className={styles.sidebar}>
            <Link href="" className={styles.nav_item}>
                <i className="ri-dashboard-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Dashboard</div>
            </Link>

            <Link href="/skills" className={getStyle(pathname, "/skills")}>
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
        </aside>
    );
}