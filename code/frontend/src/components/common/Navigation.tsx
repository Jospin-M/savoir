import styles from "./Common.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createURLs } from "../../../lib/utils";
import { useData } from "../../hooks/useQueryClient";
import { useUserStore } from "../../stores/useUserStore";
import { type ProfileData, getProfileData } from "../../../lib/queryFunctions";

/**
 * Determines if the active style for the Link should be shown depending on the URL parameters and 
 * returns the appropriate styling.
 */
function getStyle(currentPathname: string | null, pathnameToCheck: string) {
    return currentPathname === pathnameToCheck ? 
    `${styles.nav_item}  ${styles.active}`: styles.nav_item;
}

export function NavBar() {
    const pathname = usePathname();
    
    return (
        <aside className={styles.sidebar}>
            <Link href="" className={styles.nav_item}>
                <i className="ri-dashboard-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Dashboard</div>
            </Link>

            <Link href="/skills" className={getStyle(pathname, "/skills")}>
                <i className="ri-lightbulb-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Skills</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-message-3-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Messages</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-refresh-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Sessions</div>
            </Link>

            <Link href="" className={styles.nav_item}>
                <i className="ri-star-line" id={styles.nav_item_logo} />
                <div className={styles.nav_item_text}>Reviews</div>
            </Link>
        </aside>
    );
}

export function NavPicture() {
    // in the case where this component needs to be generalized to work for any other user,
    // simply pass the id as a prop from the appropriate parent component
    const id = useUserStore(state => state.userID)!;
    const { data } = useData<ProfileData>(
        ["user-profile", id], 
        getProfileData, 
        id
    );
    
    return (
        <Link href={`/profile/${id}`} className={styles.profile_pic_link}>
            <img className={styles.nav_bar_profile_pic} src={createURLs([data?.profilePhoto.buffer])[0]}/>
        </Link>
    );
}