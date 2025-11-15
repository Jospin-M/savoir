"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Skill } from "../../../lib/queryFunctions";
import { useRefreshCache } from "../../hooks/useRefreshCache";
import { type UserProfile, useUserStore } from "../../stores/useUserStore";

export function RouteChangeListener() {
    const pathname = usePathname();
    const [prevPath, setPrevPath] = useState(""); // useState is used here so we can obtain the previous path
    
    const userID = useUserStore(state => state.userID);
    const userProfile = useUserStore(state => state.userProfile);
    const isProfileUpdated = useUserStore(state => state.isProfileUpdated);
    const setIsProfileUpdated = useUserStore(state => state.setIsProfileUpdated);

    const skills = useUserStore(state => state.skills);
    const setIsSkillsUpdated = useUserStore(state => state.setIsSkillsUpdated);
    const isSkillsCacheUpdated = useUserStore(state => state.isSkillsCacheUpdated);

    const { refresh: updateSkills } = useRefreshCache<Skill[]>("/skills", "POST", { key: "user-skills" });
    const { refresh: updateProfile } = useRefreshCache<UserProfile>("/profiles/me", "PUT", { key: "user-profile", param: userID! });
    
    useEffect(() => {
        setPrevPath(pathname);
    }, [pathname]);

    useEffect(() => {
        if(prevPath === `/profile/${userID}` && isProfileUpdated && userProfile) {
            updateProfile(userProfile);
            setIsProfileUpdated(false);
        } else if(prevPath === "/skills" && isSkillsCacheUpdated && skills) {
            updateSkills(skills);
            setIsSkillsUpdated(false);
        }
        

        return () => {}; // cleanup function is required here since not using one causes the Effect to be run twice
    }, [pathname]); // the reason the other dependencies are not added is because they cause the effect to run on every change, which is not what we want 

    return <></>;
}