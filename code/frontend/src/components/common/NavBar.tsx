import Rectangle from "./Rectangle";
import NavPicture from "./NavPicture";
import styles from "./Common.module.css";

import { NavLink } from "react-router-dom";

function changeColor({ isActive }: { isActive: boolean }) {
    return isActive ? styles["active"]: "";  
}

export default function NavBar() {
    return (
        <Rectangle cssClass={"nav_bar_background"}>
            <div className={styles.nav_options}>
                <NavLink to="/browse/" className={changeColor}>Browse</NavLink>
                <NavLink to="/dashboard/" className={changeColor}>Dashboard</NavLink>
                <NavLink to="/inbox/" className={changeColor}>Messages</NavLink>
            </div>

            <div className={styles.nav_bar_profile_pic_container}>
                <NavPicture />
            </div>
        </Rectangle>
    );
}