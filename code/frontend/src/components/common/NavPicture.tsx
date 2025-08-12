import styles from "./Common.module.css";

import Link from "next/Link";

export default function NavPicture() {
    // ratio of images must be changed to square before being saved in database
    // href will use the id passed in through ssr
    
    return (
        <Link href={"/profile/" + ""} className={styles.profile_pic_link}>
            <img className={styles.nav_bar_profile_pic} src={"https://static01.nyt.com/images/2020/03/09/sports/09nba-topteams1/09nba-topteams1-mediumSquareAt3X.jpg"}/>
        </Link>
    );
}