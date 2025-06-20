import styles from "./General.module.css"
import { type ReactNode } from "react";

export default function Rectangle({ children }: { children: ReactNode }) {
    return (
        <div className={styles.login_background}>
            {children}
        </div>
    );
}