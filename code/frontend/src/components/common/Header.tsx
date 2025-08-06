import { NavLink } from "react-router-dom";
import styles from "../common/Common.module.css";
import NavPicture from "./NavPicture";

export default function Header() {
    return (
        <header>
            <NavLink to="/">
                <h2 className={styles.logo}>Savoir</h2>
            </NavLink>

            <div className={styles.search_bar}>
                <input type="text" placeholder="Search for skills, users, or topics..." />
                <i className="ri-search-line" />
            </div>

            <div className={styles.user_menu}>
                <NavPicture />
            </div>
        </header>
    );
}