"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Skill } from "../../../lib/queryFunctions";
import { useUserStore } from "../../stores/useUserStore";
import { useRefreshCache } from "../../hooks/useRefreshCache";

export function RouteChangeListener() {
    const pathname = usePathname();
    const [, setPrevPath] = useState("");
    const skills = useUserStore(state => state.skills);
    const isSkillsCacheUpdated = useUserStore(state => state.isSkillsCacheUpdated);
    const setSkills = useUserStore(state => state.setSkills);

    const { refresh: refreshSkills } = useRefreshCache<Skill>("/skills", { key: "profileSkills" });
    console.log(isSkillsCacheUpdated)
    useEffect(() => {
        setPrevPath((prev) => {
            if(prev === "/skills" && isSkillsCacheUpdated && skills) {
                refreshSkills(skills);
                
                // query cache is not being updated for some reason
            }

            return pathname ? pathname: "";
        }); 

        return () => {}; // cleanup function is required here since not using one causes the Effect to be run twice
    }, [pathname])

    return <></>;
}