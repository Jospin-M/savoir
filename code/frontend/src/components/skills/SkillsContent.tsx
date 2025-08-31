import SkillsHeader from "./SkillsHeader";

import styles from "./Skills.module.css";

import { useState } from "react";
import EmptyState from "./EmptyState";
import { useSkillData } from "../../hooks/useSkillsData";

export default function SkillsContent() {
    // the value of this boolean will be determined by the length of the user's skill array
    const [isEmpty, setIsEmpty] = useState(true); 
    const { skillsQuery: { skills } } = useSkillData();

    return (
        <div className={styles.page_content}>
            <SkillsHeader />

            {isEmpty && <EmptyState />}
        </div>
    );
}