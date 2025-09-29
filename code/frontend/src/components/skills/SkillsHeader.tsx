import AddSkillModal from "./modals/AddSkillModal";
import styles from "./Skills.module.css";

import { useState } from "react";

export default function SkillsHeader() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.page_header}>
            <h1 className={styles.page_title}>Skills</h1>

            { showModal &&
                <AddSkillModal closeButtonHandler={() => setShowModal(false)} /> }

            <button className={styles.add_skill_btn} onClick={() => setShowModal(true)}>
                Add New Skill
            </button>
        </div>
    );
}