import { NavLink } from "react-router-dom";
import styles from "./Common.module.css";

export default function NavBar() {
    return (
        <div className={styles.sidebar}>
            <NavLink to="" className={styles.nav_item}>
                <i className="ri-dashboard-line" />
                <div className={styles.nav_item_text}>Dashboard</div>
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-lightbulb-line"/>
                <div className={styles.nav_item_text}>Skills</div>
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-message-3-line"/>
                <div className={styles.nav_item_text}>Messages</div>
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-refresh-line"/>
                <div className={styles.nav_item_text}>Sessions</div>
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-star-line"/>
                <div className={styles.nav_item_text}>Reviews</div>
            </NavLink>
        </div>
    );
}