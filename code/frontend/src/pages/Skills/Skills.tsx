import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useQueryClient } from "../../hooks/useQueryClient";
import { SkillDataContext } from "../../hooks/useSkillsData";
import { type Category, getCategories, type AuthenticatedSkill, getAuthenticatedUserSkills } from "../../../lib/queryFunctions";

export default function Skills() {
    const { data: categoriesData } = useQueryClient<Category[]>(
        ["categories"], 
        getCategories
    );

    const { data: skillsData, refetch } = useQueryClient<AuthenticatedSkill[]>(
        ["skills"],
        getAuthenticatedUserSkills
    );
    
    return (
        <SkillDataContext.Provider value={{
            categories: categoriesData,
            skillsQuery: {
                skills: skillsData,
                refetch: refetch
            }
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