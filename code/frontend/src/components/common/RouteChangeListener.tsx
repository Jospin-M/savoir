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
    const setIsSkillsUpdated = useUserStore(state => state.setIsSkillsUpdated);
    const isSkillsCacheUpdated = useUserStore(state => state.isSkillsCacheUpdated);
    
    const { refresh: refreshSkills } = useRefreshCache<Skill>("/skills", { key: "user-skills" });
    
    useEffect(() => {
        setPrevPath((prev) => {
            if(prev === "/skills" && isSkillsCacheUpdated && skills) {
                console.log("Request should be sent");
                refreshSkills(skills);
                setIsSkillsUpdated(false);
            }

            return pathname ? pathname: "";
        }); 

        return () => {}; // cleanup function is required here since not using one causes the Effect to be run twice
    }, [pathname])

    return <></>;
}