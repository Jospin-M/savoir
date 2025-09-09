"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSkillData } from "../../hooks/useSkillsData";
import { useQueryClient } from "../../hooks/useQueryClient";

export function RouteChangeListener() {
    const pathname = usePathname();
    const [, setChanges] = useState(0);

    const { data } = useQueryClient(["profileSkills"], () => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
        }, 2000)
    }))
    console.log(data);
    
    useEffect(() => {
        console.log(`Router changed to: ${pathname}`);
        setChanges((prev) => prev + 1);
    }, [pathname])

    return <></>;
}
