import styles from "./Common.module.css";

import { NavLink } from "react-router-dom";

import { useUserStore } from "../../stores/useUserStore";

export default function NavPicture() {
    const profileImageURL = useUserStore((state) => state.profileImageURL)!;
    const userID = useUserStore((state) => state.userID);
    // ratio of images must be changed to square before being saved in database

    console.log(profileImageURL)
    return (
        <NavLink to={"/profile/" + userID}>
            <img className={styles.nav_bar_profile_pic} src={profileImageURL}/>
        </NavLink>
    );
}