import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useQueryClient } from "../../hooks/useQueryClient";
import { type Category, getCategories } from "../../../lib/clientQueryFunctions";
import { SkillDataContext } from "../../hooks/useSkillsData";

export default function Skills() {
    const { data: categoriesData } = useQueryClient<Category[]>(["categories"], getCategories)
    
    return (
        <SkillDataContext.Provider value={{
            categories: categoriesData
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