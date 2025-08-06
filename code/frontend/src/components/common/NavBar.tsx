import { NavLink } from "react-router-dom";
import styles from "./Common.module.css";

export default function NavBar() {
    return (
        <div className={styles.sidebar}>
            <NavLink to="" className={styles.nav_item}>
                <i className="ri-dashboard-line" />
                Dashboard
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-search-line"/>
                Browse
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-lightbulb-line"/>
                Skills
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-message-3-line"/>
                Messages
            </NavLink>

            <NavLink to="" className={styles.nav_item}>
                <i className="ri-refresh-line"/>
                Sessions
            </NavLink>
        </div>
    );
}