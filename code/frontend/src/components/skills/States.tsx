import styles from "./Skills.module.css";

import { useState } from "react";
import { useSkillData } from "../../hooks/useSkillsData";
import { type Dispatch, type SetStateAction } from "react";
import type { AuthenticatedSkill } from "../../../lib/queryFunctions";

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

function SkillListing({ skill }: { skill: AuthenticatedSkill }) {
    return (
        <div className={styles.skill_card}>

        </div>
    );
}

async function filterSkills(skills: AuthenticatedSkill[], comparator: (activeState: boolean) => boolean) {
   //console.log(skills)

    return skills?.filter(skill => comparator(skill.active))
}

function All() {
    const { skillsQuery: { skills } } = useSkillData();
    //filterSkills(skills)

    return (<></>);
}

export function Populated() {
    const [activeFilter, setActiveFilter] = useState("All");
    // activeFilter will be used to decide which page to show
    const { skillsQuery: { skills } } = useSkillData();
    console.log(filterSkills(skills, (state) => state === false));
    return (
        <div className={styles.populated_state}>
            <FilterOptions activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
        
            <div className={styles.skills_grid}>
                
            </div>
        </div>
    );
}