import { useEffect, type ReactNode } from "react";

type BackgroundProps = {
    color?: string;
    children?: ReactNode;
};

export default function Background({ color = "#EC9A29", children }: BackgroundProps) {
    useEffect(() => {
        const original = document.body.style.backgroundColor;
        document.body.style.backgroundColor = color;

        return () => {
            document.body.style.backgroundColor = original;
        };
    }, [color]);

    return (
        <div>
            {children}
        </div>
    );
}