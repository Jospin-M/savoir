import Rectangle from "./Rectangle";
import Picture from "./Picture";
import styles from "./Common.module.css";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getAuthenticatedUserId } from "../../../lib/supabaseClient";

function changeColor({ isActive }: { isActive: boolean }) {
    return isActive ? styles["active"]: "";  
}

export default function NavBar() {
    const [profilePath, setProfilePath] = useState("");
    
    useEffect(() => {
        async function getUserId() {
            const id = await getAuthenticatedUserId();

            setProfilePath("/" + id);
        }

        getUserId();
    }, []);

    const profileSelectedStyle = {
        display: "flex",
        outline: "2px solid #FFFFFF",
        borderRadius: "50%",
        objectFit: "cover"
    }

    // placeholder -- will be replaced with value from database later on
    const imageUrl = "https://static01.nyt.com/images/2020/03/09/sports/09nba-topteams1/merlin_170229057_ce4be847-c57c-41fc-9a4d-70008084dff7-superJumbo.jpg?quality=75&auto=webp";

    return (
        <Rectangle cssClass={"nav_bar_background"}>
            <div className={styles.nav_options}>
                <NavLink to="/browse" className={changeColor}>Browse</NavLink>
                <NavLink to="/dashboard" className={changeColor}>Dashboard</NavLink>
                <NavLink to="/inbox" className={changeColor}>Messages</NavLink>
            </div>

            <div className={styles.nav_bar_profile_pic_container}>
                <Picture imageUrl={imageUrl} cssClass={"nav_bar_profile_pic"} destination={profilePath} isActiveStyle={profileSelectedStyle}/>
            </div>
        </Rectangle>
    );
}