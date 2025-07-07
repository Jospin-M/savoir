import { type ReactNode } from "react";

type BackgroundProps = {
    color?: string;
    children?: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    document.body.style.backgroundColor = "#FFFFFF";

    return (
        <div>
            {children}
        </div>
    );
}