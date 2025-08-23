import styles from "./Skills.module.css";

export default function SkillsHeader() {
    return (
        <div className={styles.page_header}>
            <h1 className={styles.page_title}>My Skills</h1>

            <button className={styles.add_skill_btn}>
                Add New Skill
            </button>
        </div>
    );
}