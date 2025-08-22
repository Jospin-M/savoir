import styles from "./Common.module.css";

import Link from "next/link";
import { createURLs } from "../../../lib/utils";
import { useUserStore } from "../../stores/useUserStore";
import { useQueryClient } from "../../hooks/useQueryClient";
import { type ProfileData, getProfileData } from "../../../lib/clientQueryFunctions";

export default function NavPicture() {
    // in the case where this component needs to be generalized to work for any other user,
    // simply pass the id as a prop from the appropriate parent component
    const id = useUserStore(state => state.userID)!;
    const { data } = useQueryClient<ProfileData>(
        ["profileData", id], 
        getProfileData, 
        id
    );
    
    return (
        <Link href={`/profile/${id}`} className={styles.profile_pic_link}>
            <img className={styles.nav_bar_profile_pic} src={createURLs([data?.profilePhoto.buffer])[0]}/>
        </Link>
    );
}