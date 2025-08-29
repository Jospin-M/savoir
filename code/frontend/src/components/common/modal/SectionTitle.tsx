import styles from "./Modal.module.css";

export default function SectionTitle({ sectionName }: { sectionName: string }) {
    return (
        <div className={styles.section}>
            <h3 className={styles.section_title}>{sectionName}</h3>
        </div>
    );
}