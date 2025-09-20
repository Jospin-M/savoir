import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { SkillDataContext } from "../../hooks/useSkillsData";
import { useData } from "../../hooks/useQueryClient";
import { type Category, getCategories, type Skill, getAuthenticatedUserSkills } from "../../../lib/queryFunctions";

export default function Skills() {
    const { data: categoriesData } = useData<Category[]>(
        ["categories"], 
        getCategories
    );

    const { data: skillsData } = useData<Skill[]>(
        ["profileSkills"],
        getAuthenticatedUserSkills
    );

    const skills = useUserStore(state => state.skills);
    const setSkills = useUserStore(state => state.setSkills);
    const setIsSkillsUpdated = useUserStore(state => state.setIsSkillsUpdated);
    
    useEffect(() => {
        // create a shallow copy of the skill data and save it with Zustand so we don't have to directly modify the query cache
        const skillsDataCopy = Array.from(skillsData ? skillsData: []);

        // only initialiaze skills on the first load, otherwise, reuse the values already present in the Zustand store
        if(skills.length == 0) { 
            setSkills(skillsDataCopy);
        }
    }, [skillsData]);

    function addSkill(newSkill: Skill) {
        setSkills([...skills, newSkill]); // manually set skills since the value of skills seems not to persist after a few route changes
        setIsSkillsUpdated(true);
    }

    function updateSkill(updatedSkill: Skill) {
        setSkills(skills.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill));
        setIsSkillsUpdated(true);
    } 

    function deleteSkill(skillToDelete: Skill) {
        setSkills(skills.filter(skill => skill.id !== skillToDelete.id));
        setIsSkillsUpdated(true);
    }

    return (
        <SkillDataContext.Provider value={{
            categories: categoriesData,
            skillsQuery: {
                skills: skills
            },
            addSkill,
            updateSkill,
            deleteSkill
        }}>
            <div>
                <Header/>
                
                <div className={styles.main_content}>
                    <NavBar />
                    
                    <SkillsContent />
                </div>
            </div>
        </SkillDataContext.Provider>
    );
}