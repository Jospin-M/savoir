import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { SkillDataContext } from "../../hooks/useSkillsData";
import { useData, isDataUpdated } from "../../hooks/useQueryClient";
import { type Category, getCategories, type Skill, getAuthenticatedUserSkills } from "../../../lib/queryFunctions";
import { QueryClient } from "@tanstack/react-query";

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
     
    const [localSkills, setLocalSkills] = useState(skills);
    const isCacheUpdated = isDataUpdated(["profileSkills"], localSkills);
    
    console.log(skillsData, localSkills)
    useEffect(() => {
        // this is a flag that is used in RouteChangeListener to determine whether or not a request should be sent to server
        setIsSkillsUpdated(isCacheUpdated);
    }, [localSkills]);

    function addSkill(newSkill: Skill) {
        setSkills([...localSkills, newSkill]); // manually set skills since the value of localSkills seems not to persist after a few route changes
        setLocalSkills([...localSkills, newSkill]);
    }

    function updateSkill(updatedSkill: Skill) {
        new QueryClient().setQueryData(["profileSkills"], localSkills.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill));
        setSkills(localSkills.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill));
        setLocalSkills(localSkills.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill));
    } 

    function deleteSkill(skillToDelete: Skill) {
        setSkills(localSkills.filter(skill => skill.id !== skillToDelete.id));
        setLocalSkills(localSkills.filter(skill => skill.id !== skillToDelete.id));
    }

    return (
        <SkillDataContext.Provider value={{
            categories: categoriesData,
            skillsQuery: {
                skills: localSkills
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