import styles from "./Common.module.css";

import { NavLink } from "react-router-dom";

import { useUserStore } from "../../stores/useUserStore";


export default function NavPicture() {
    const profileImageURL = useUserStore((state) => state.profileImageURL)!;
    const userID = useUserStore((state) => state.userID);
    const isActiveStyle = {
        display: "flex",
        outline: "2px solid #FFFFFF",
        borderRadius: "50%",
        objectFit: "cover"
    };

    return (
        <NavLink 
            to={"/profile/" + userID} 
            style={({ isActive }) => isActive ? isActiveStyle: {}}
        >
            <img className={styles.nav_bar_profile_pic} src={profileImageURL}/>
        </NavLink>
    );
}