import Rectangle from "./Rectangle";
import NavPicture from "./NavPicture";
import styles from "./Common.module.css";

import { NavLink } from "react-router-dom";
import { getUserID } from "../../../lib/utils";

function changeColor({ isActive }: { isActive: boolean }) {
    return isActive ? styles["active"]: "";  
}

export default function NavBar({ profileImageUrl }: { profileImageUrl: string }) {
    const profileSelectedStyle = {
        display: "flex",
        outline: "2px solid #FFFFFF",
        borderRadius: "50%",
        objectFit: "cover"
    };

    return (
        <Rectangle cssClass={"nav_bar_background"}>
            <div className={styles.nav_options}>
                <NavLink to="/browse/" className={changeColor}>Browse</NavLink>
                <NavLink to="/dashboard/" className={changeColor}>Dashboard</NavLink>
                <NavLink to="/inbox/" className={changeColor}>Messages</NavLink>
            </div>

            <div className={styles.nav_bar_profile_pic_container}>
                <NavPicture imageUrl={profileImageUrl} cssClass={"nav_bar_profile_pic"} destination={"/profile/" + getUserID()} isActiveStyle={profileSelectedStyle}/>
            </div>
        </Rectangle>
    );
}