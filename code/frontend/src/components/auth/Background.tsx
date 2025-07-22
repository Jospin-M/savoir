import { useEffect, type ReactNode } from "react";

import style from "./Auth.module.css";

type BackgroundProps = {
    color?: string;
    children?: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    const color = "#EC9A29";

    useEffect(() => {
        const original = document.body.style.backgroundColor;
        document.body.style.backgroundColor = color;

        return () => {
            document.body.style.backgroundColor = original;
        };
    }, [color]);

    return (
        <div className={style.auth_background}>
            {children}
        </div>
    );
}