import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/profile/Profile.module.css";

import { useLoaderData } from "react-router-dom";

export default function Authenticated() {
    const { profileData: { fullName, bio, profileImageUrl } } = useLoaderData();
    
    return (
        <Background>
            <NavBar profileImageUrl={profileImageUrl}/>

            <div className={styles.profile_header}> 
                <div className={styles.profile_header_top_layer}>
                    <img className={styles.profile_pic} src={profileImageUrl}/>
            
                    <div className={styles["roboto-name"]}>{fullName}</div>

                    <Button prompt="Edit Profile" buttonCSSClass="edit_profile_button" buttonTitleCSSClass="roboto-edit_profile" isDisabled={false} handleClick={() => {}}/>
                </div>  

                <div className={styles.bio_container}>
                    <p className={styles["roboto-bio"]}>{bio}</p>
                </div>  
            </div>
        </Background>
    );
}