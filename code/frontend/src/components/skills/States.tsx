import { SkillListing } from "./SkillListing"; 

import styles from "./Skills.module.css";

import { useEffect, useState } from "react";
import { useSkillData } from "../../hooks/useSkillsData";
import { type Dispatch, type SetStateAction } from "react";
import type { Skill } from "../../../lib/queryFunctions";

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

function SkillListings({ skills }: { 
    skills: Skill[] 
}) {
    return (
        <>
            {skills?.map(skill => <SkillListing skill={skill} key={skill.id} />)}
        </>
    );
}

export function Populated() {
    const { skillsQuery: { skills } } = useSkillData();
    const [activeFilter, setActiveFilter] = useState("All");
    const [updatedSkills, setUpdatedSkills] = useState(skills);
    // verify if what changes is the reference we pass into useState and not the variable itself
    useEffect(() => {
        if(skills) {
            setUpdatedSkills(skills);
        }
    }, [skills]);
    
    return (
        <>
            <div className={styles.populated_state}>
                <FilterOptions activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>

            <div className={styles.skills_grid}>
                {activeFilter === "All" && <SkillListings skills={updatedSkills}  />}
                
                {activeFilter === "Active"
                    &&  <SkillListings skills={updatedSkills?.filter(skill => skill.active === true)} />}
                
                {activeFilter === "Inactive" 
                    && <SkillListings skills={updatedSkills?.filter(skill => skill.active === false)} />}
            </div>
        </>
    );
}