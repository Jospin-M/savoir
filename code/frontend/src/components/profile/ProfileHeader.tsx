import styles from "./Profile.module.css";

export default function ProfileHeader() {
    //const profileImageURL = useUserStore((state) => state.profileImageURL)!;
    //const name = useUserStore((state) => state.name);
    
    return (
        <div className={styles.profile_header}>
            <div className={styles.cover_photo}>
                <div className={styles.cover_photo_placeholder}>
                    <i className="ri-image-line"/>
                    Add Cover Photo
                </div>
            </div>
            
            <div className={styles.profile_picture_container}>
                <img className={styles.profile_picture} src={"https://static01.nyt.com/images/2020/03/09/sports/09nba-topteams1/09nba-topteams1-mediumSquareAt3X.jpg"}/>

                <div className={styles.profile_name}>
                    <h2 className={styles.profile_header_name }>{"Jospin Muhanuzi"}</h2>
                </div>
            </div>
        </div>
    );
}