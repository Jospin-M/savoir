import styles from "./Skills.module.css";

import { useState, type JSX } from "react";
import { createLevel } from "../profile/sidebar/Sidebar";
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

async function filterSkills(skills: AuthenticatedSkill[], comparator: (activeState: boolean) => boolean) {
    return skills?.filter(skill => comparator(skill.active))
}

function SkillListing({ skill }: { skill: AuthenticatedSkill }) {
    const { categories } = useSkillData();
    const categoryName = categories?.find(category => category.id === skill.category_id)?.name;

    return (
        <div className={styles.skill_card}>
            <div className={styles.skill_header}>
                <h3 className={styles.skill_title}>{skill.name}</h3>
                
                <span className={styles.skill_category}>
                    {categoryName}
                </span>
            </div>

            <div className={styles.skill_level}>
                <span className={styles.skill_level}>{skill.level}</span>
                
                {createLevel(["Advanced", "Intermediate", "Beginner"], skill.level)}
            </div>
        </div>
    );
}

function All({ skills }: { skills: AuthenticatedSkill[] }) {
    return (
        <>
            {skills.map(skill => <SkillListing skill={skill} key={skill.id}/>)}
        </>
    );
}

export function Populated() {
    const [activeFilter, setActiveFilter] = useState("All");
    // activeFilter will be used to decide which page to show
    const { skillsQuery: { skills } } = useSkillData();
    let pageToShow: JSX.Element = <></>;

    if(activeFilter === "All") {
        pageToShow = <All skills={skills}/>
    }

    console.log(activeFilter === "All")
    
    //console.log(filterSkills(skills, (state) => state === false));
    return (
        <>
            <div className={styles.populated_state}>
                <FilterOptions activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>

            <div className={styles.skills_grid}>
                {activeFilter === "All" && <All skills={skills}/>}
            </div>
        </>
    );
}