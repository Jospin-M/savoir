import SkillsHeader from "./SkillsHeader";
import { Empty, Populated } from "./States";

import styles from "./Skills.module.css";

import { useSkillData } from "../../hooks/useSkillsData";

export default function SkillsContent() {
    const { skillsQuery: { skills } } = useSkillData();
    const isEmpty = skills?.length === 0; 
    
    return (
        <div className={styles.page_content}>
            <SkillsHeader />

            {isEmpty ? <Empty />: <Populated />}
        </div>
    );
}