import { createContext, useContext } from "react";
import type { AuthenticatedSkill, Category } from "../../lib/queryFunctions";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type ContextSkillData = {
    categories: Category[]
    skillsQuery: { 
        skills: AuthenticatedSkill[], 
        refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<AuthenticatedSkill[], Error>>) | null
    }
};

export const SkillDataContext = createContext<ContextSkillData>({ 
    categories: [], 
    skillsQuery: { skills: [], refetch: null } 
});

export const useSkillData = () => useContext(SkillDataContext);