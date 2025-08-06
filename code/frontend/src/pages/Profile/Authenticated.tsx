import Header from "../../components/common/Header.tsx";

import "../../index.css";
import styles from "../../components/profile/Profile.module.css";

import { useLoaderData } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore.ts";
import NavBar from "../../components/common/NavBar.tsx";
export default function Authenticated() {
    //const { profileData: { fullName, bio, profileImageUrl } } = useLoaderData();
    //clearUser();
    return (
        <>
            <Header />
            
            <div className="container">
                <NavBar />
            </div>
        </>
    );
}

/*
<div className={styles.profile_container}>
                        
                    </div>
*/