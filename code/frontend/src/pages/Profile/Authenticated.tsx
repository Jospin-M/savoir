import NavBar from "../../components/common/NavBar.tsx";
import Header from "../../components/profile/Header.tsx";
import Tabs from "../../components/profile/Tabs.tsx";

import "../../index.css";
import styles from "../../components/profile/Profile.module.css";

import { useLoaderData } from "react-router-dom";

export default function Authenticated() {
    const { profileData: { fullName, bio, profileImageUrl } } = useLoaderData();
    
    return (
       <div className="container">
            <NavBar />

            <div className={styles.profile_container}>
                <div className={styles.profile_header}> 
                    <Header fullName={fullName} bio={bio} profileImageUrl={profileImageUrl}/> 
                </div>

                <div className={styles.profile_sections_container}>
                    <Tabs />
                </div>
            </div>
       </div>
    );
}