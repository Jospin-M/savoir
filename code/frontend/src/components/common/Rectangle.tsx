import { type ReactNode } from "react";
import styles from "./Common.module.css"

type RectangleProps = {
    cssClass: string,
    children: ReactNode
}

export default function Rectangle({ cssClass, children }: RectangleProps) {
    return (
        <div className={styles[cssClass]}>
            {children}
        </div>
    );
}