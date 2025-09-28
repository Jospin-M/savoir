"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Skill } from "../../../lib/queryFunctions";
import { useRefreshCache } from "../../hooks/useRefreshCache";
import { type UserProfile, useUserStore } from "../../stores/useUserStore";

export function RouteChangeListener() {
    const pathname = usePathname();
    const [, setPrevPath] = useState(""); // useState is used here so we can obtain the previous path
    
    const userID = useUserStore(state => state.userID);
    const userProfile = useUserStore(state => state.userProfile);

    const skills = useUserStore(state => state.skills);

    const { refresh: updateSkills } = useRefreshCache<Skill[]>("/skills", "POST", { key: "user-skills", param: userID! });
    const { refresh: updateProfile } = useRefreshCache<UserProfile>("/profiles/me", "PUT", { key: "user-profile" });
    
    useEffect(() => {
        setPrevPath((prev) => {
            if(prev === `/profile/${userID}` && userProfile) {
                updateProfile(userProfile);
            } else if(prev === "/skills" && skills) {
                updateSkills(skills);
            }

            return pathname ? pathname: "";
        }); 

        return () => {}; // cleanup function is required here since not using one causes the Effect to be run twice
    }, [pathname])

    return <></>;
}