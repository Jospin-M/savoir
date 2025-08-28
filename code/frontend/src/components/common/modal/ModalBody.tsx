import styles from "./Modal.module.css";

import type { FormEventHandler, ReactNode } from "react";

export default function ModalBody({ handleSubmit, children }: { handleSubmit: FormEventHandler<HTMLFormElement>, children: ReactNode }) {
    return (
        <div className={styles.modal_body}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </div>
    );
}