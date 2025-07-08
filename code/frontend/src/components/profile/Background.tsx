import { type ReactNode } from "react";

type BackgroundProps = {
    color?: string;
    children?: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
    document.body.style.backgroundColor = "#FFFFFF";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    
    return (
        <div>
            {children}
        </div>
    );
}