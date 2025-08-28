import styles from "./Modal.module.css";

export default function SaveButton({ isDisabled } : { isDisabled: boolean }) {
    return (
        <div className={styles.modal_footer}>
            <button className={styles.save_button} type="submit" disabled={isDisabled}>
                Save
            </button>
        </div>
    );
}