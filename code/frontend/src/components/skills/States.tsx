import styles from "./Skills.module.css";

import { type Dispatch, type SetStateAction } from "react";
import { useState } from "react";

export function Empty() {
    return (
        <div className={styles.empty_state}>
            <div className={styles.empty_illustration}>
                <i className={"ri-book-open-line "}/>
            </div>

            <h2 className={styles.empty_title}>
                You haven't added any skills yet
            </h2>

            <p className={styles.empty_description}>
                Share your skills with the community by adding skills you can teach
            </p>
        </div>
    );
}

function FilterOptions({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: Dispatch<SetStateAction<string>> }) {
    const filters = ["All", "Active", "Inactive"];
    
    return (
        <div className={styles.filter_options}>
            {filters.map(filter => (
                <div 
                    key={filter}
                    className={`${styles.filter_option} ${
                        activeFilter === filter ? styles.active : ''
                    }`}
                    onClick={() => setActiveFilter(filter)}
                >
                    <p className={styles.filter_name}>{filter}</p>
                </div>
            ))}
        </div>
    );
}

export function Populated() {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <div className={styles.populated_state}>
            <FilterOptions activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
        </div>
    );
}