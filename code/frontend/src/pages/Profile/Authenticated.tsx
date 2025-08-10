import Header from "../../components/common/Header.tsx";
import NavBar from "../../components/common/NavBar.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";

import styles from "../../components/common/Common.module.css";

export default function Authenticated() {
    // use React query -- reference tutorial
    
    return (
        <div>
            <Header />
            
            <div className={styles.main_content}>
                <NavBar />
                
                <div className={styles.page_content}>
                    <ProfileHeader/>
                </div>
            </div>
        </div>
    );
}