import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

import { useQueryClient } from "../../hooks/useQueryClient";
import { type Category, getCategories } from "../../../lib/clientQueryFunctions";
import { SkillDataContext } from "../../hooks/useSkillsData";
import { useUserStore } from "../../stores/useUserStore";

export default function Skills() {
    const id = useUserStore(state => state.userID)!;
    const { data: categoriesData } = useQueryClient<Category[]>(
        ["categories"], 
        getCategories,
        id    
    );
    
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