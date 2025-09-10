import { createContext, useContext } from "react";
import type { Skill, Category } from "../../lib/queryFunctions";

export type ContextSkillData = {
    categories: Category[],
    addSkill: (newSkill: Skill) => void,
    updateSkill: (skillToUpdate: Skill) => void,
    deleteSkill: (skillToDelete: Skill) => void,
    skillsQuery: { 
        skills: Skill[]}
};

export const SkillDataContext = createContext<ContextSkillData>({ 
    categories: [], 
    addSkill: () => {},
    updateSkill: () => {},
    deleteSkill: () => {},
    skillsQuery: { skills: []}
});

export const useSkillData = () => useContext(SkillDataContext);