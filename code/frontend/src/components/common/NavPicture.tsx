import { useProfileData } from "../../hooks/useProfileData";
import styles from "./Common.module.css";

import Link from "next/Link";

export default function NavPicture() {
    const { profileQuery: {  data } } = useProfileData();
    
    return (
        <Link href={"/profile/" + ""} className={styles.profile_pic_link}>
            <img className={styles.nav_bar_profile_pic} src={data?.profilePhoto.url}/>
        </Link>
    );
}