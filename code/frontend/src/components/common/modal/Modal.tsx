import styles from "./Modal.module.css";

import type { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    );
}