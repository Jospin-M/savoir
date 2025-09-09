import { createContext, useContext } from "react";
import type { Skill, Category } from "../../lib/queryFunctions";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type ContextSkillData = {
    categories: Category[],
    addSkill: (newSkill: Skill) => void,
    updateSkill: (skillToUpdate: Skill) => void,
    deleteSkill: (skillToDelete: Skill) => void,
    skillsQuery: { 
        skills: Skill[], 
        refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Skill[], Error>>) | null
    }
};

export const SkillDataContext = createContext<ContextSkillData>({ 
    categories: [], 
    addSkill: () => {},
    updateSkill: () => {},
    deleteSkill: () => {},
    skillsQuery: { skills: [], refetch: null }
});

export const useSkillData = () => useContext(SkillDataContext);