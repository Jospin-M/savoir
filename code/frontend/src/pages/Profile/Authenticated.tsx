import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";
import styles from "../../components/profile/Profile.module.css";

import { useLoaderData } from "react-router-dom";

export default function Authenticated() {
    const { fullName, bio, profileImageUrl } = useLoaderData();
    console.log({ fullName, bio });
    
    return (
        <Background>
            <NavBar />

            <div className={styles.profile_header}>
                <img className={styles.profile_pic} src={profileImageUrl}/>
            </div>
        </Background>
    );
}