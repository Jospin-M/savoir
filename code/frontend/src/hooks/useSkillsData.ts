import { createContext, useContext } from "react";
import type { Category } from "../../lib/clientQueryFunctions";

export type ContextSkillData = {
    categories: Category[]
};

export const SkillDataContext = createContext<ContextSkillData>({ categories: [] });

export const useSkillData = () => useContext(SkillDataContext);