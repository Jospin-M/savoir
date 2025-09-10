"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Skill } from "../../../lib/queryFunctions";
import { useQueryClient } from "../../hooks/useQueryClient";
import { useRefreshCache } from "../../hooks/useRefreshCache";

export function RouteChangeListener() {
    const pathname = usePathname();
    const [, setPrevPath] = useState("");
    const[sendUpdatedSkills, setShouldUpdateSkills] = useState(false);
    const { refresh: refreshSkills } = useRefreshCache<Skill>("/skills", { key: "profileSkills" });
    const { data: updatedData, isCacheUpdated: isSkillsCacheUpdated } = useQueryClient<Skill[]>(["profileSkills"], () => new Promise((_resolve, _reject) => {}))

    useEffect(() => {
        console.log(`Router changed to: ${pathname}`);
        setPrevPath((prev) => {
            console.log("Previous route: ", prev);

            if(prev === "/skills" && isSkillsCacheUpdated) {
                setShouldUpdateSkills(true);
            }

            return pathname ? pathname: "";
        }); 
    }, [pathname])

    if(sendUpdatedSkills) {
        refreshSkills(updatedData);
        //refreshCache<Skill>("/skills", { key: "profileSkills" }, updatedData as Skill[]);
        setShouldUpdateSkills(false);
    }

    return <></>;
}