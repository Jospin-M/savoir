import { NavPicture } from "./Navigation";

import styles from "../common/Common.module.css";

import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header_container}>
            <Link href="" className={styles.logo_container}>
                <h2 className={styles.logo}>Savoir</h2>
            </Link>

            <div className={styles.search_bar}>
                <input id={"search_bar"} type="text" placeholder="Search for skills, users, or topics..." />
                <div className={styles.search_icon_container}>
                    <i className="ri-search-line" />
                </div>
            </div>

            <div className={styles.user_menu}>
                <NavPicture />
            </div>
        </header>
    );
}