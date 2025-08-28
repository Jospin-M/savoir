import styles from "./Modal.module.css";

export default function ModalHeader({ modalName, closeButtonHandler }: { modalName: string, closeButtonHandler: () => void }) {
    return (
        <div className={styles.modal_header}>
            <h2>{modalName}</h2>
            
            <button className={styles.close_button} onClick={() => closeButtonHandler()}>
                <i className={"ri-close-line"}/>
            </button>
        </div>
    );
}