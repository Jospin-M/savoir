import { NavPicture } from "./Navigation";

import styles from "../common/Common.module.css";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    function handleSearch(e: KeyboardEvent) {
        if(e.key === "Enter") {
            router.push(`/s/?q=${query}`);
        }
    }
    
    return (
        <header className={styles.header_container}>
            <Link href="" className={styles.logo_container}>
                <h2 className={styles.logo}>Savoir</h2>
            </Link>

            <div className={styles.search_bar}>
                <input 
                    id={"search_bar"} 
                    type="text"
                    value={query} 
                    placeholder="Search for skills, users, or topics..." 
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => handleSearch(e)}
                />
                <div className={styles.search_icon_container}>
                    <i className="ri-search-line" />
                </div>
            </div>

            <div className={styles.user_menu}>
                <NavPicture />
            </div>
        </header>
    );
}