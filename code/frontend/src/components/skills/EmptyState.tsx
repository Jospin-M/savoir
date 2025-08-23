import styles from "./Skills.module.css";

export default function EmptyState() {
    return (
        <div className={styles.empty_state}>
            <div className={styles.empty_illustration}>
                <i className={"ri-book-open-line "}/>
            </div>

            <h2 className={styles.empty_title}>
                You haven't added any skills yet
            </h2>

            <p className={styles.empty_description}>
                Share your skills with the community by adding skills you can teach
            </p>
        </div>
    );
}