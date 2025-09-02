import { SkillListing } from "./SkillListing"; 

import styles from "./Skills.module.css";

import { useState, type JSX } from "react";
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

function SkillListings({ skills, }: { 
    skills: AuthenticatedSkill[],
    onUpdateActive?: (skillId: number, isActive: boolean) => void  
}) {
    return (
        <>
            {skills.map(skill => <SkillListing skill={skill} key={skill.id}/>)}
        </>
    );
}

export function Populated() {
    const { skillsQuery: { skills } } = useSkillData();
    const [activeFilter, setActiveFilter] = useState("All");
    
    let pageToShow: JSX.Element = <></>;

    if(activeFilter === "All") {
        pageToShow = <SkillListings skills={skills}/>
    }
    
    return (
        <>
            <div className={styles.populated_state}>
                <FilterOptions activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>

            <div className={styles.skills_grid}>
                {activeFilter === "All" && <SkillListings skills={skills}/>}
                
                {activeFilter === "Active" && 
                    <SkillListings skills={skills?.filter(skill => skill.active === true)} />}
                
                {activeFilter === "Inactive" 
                    && <SkillListings skills={skills?.filter(skill => skill.active === false)} />}
            </div>
        </>
    );
}