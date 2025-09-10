import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useState } from "react";
import { useQueryClient as qc } from "@tanstack/react-query";
import { useQueryClient } from "../../hooks/useQueryClient";
import { SkillDataContext } from "../../hooks/useSkillsData";
import { type Category, getCategories, type Skill, getAuthenticatedUserSkills } from "../../../lib/queryFunctions";

export default function Skills() {
    const { data: categoriesData } = useQueryClient<Category[]>(
        ["categories"], 
        getCategories
    );

    const { data: skillsData } = useQueryClient<Skill[]>(
        ["profileSkills"],
        getAuthenticatedUserSkills
    );

    const [skills, setSkills] = useState(skillsData);
    const queryClient = qc();

    function updateSkill(updatedSkill: Skill) {
        setSkills((prev: Skill[]) =>
            prev.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill)
        );
        
        queryClient.setQueryData(["profileSkills"],  () => {
            return skillsData.map(skill => skill.id === updatedSkill.id ? updatedSkill: skill);
        })
    } 

    function addSkill(newSkill: Skill) {
        setSkills([...skills, newSkill]);
    }

    function deleteSkill(skillToDelete: Skill) {
        setSkills(skills.filter(skill => skill.id !== skillToDelete.id));
    }
    
    return (
        <SkillDataContext.Provider value={{
            categories: categoriesData,
            skillsQuery: {
                skills: skills
            },
            addSkill: addSkill,
            updateSkill: updateSkill,
            deleteSkill: deleteSkill
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