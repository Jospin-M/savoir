import { createContext, useContext } from "react";
import type { ProfileData } from "../../lib/queryFunctions";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export const ProfileDataContext = createContext<{
    userID: string,
    profileQuery: {
        data: ProfileData | null,
        refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileData, Error>>) | null
    },
    languages: { id: number, name: string, proficiency: string }[] | null
}>({ userID: "", profileQuery: { data: null, refetch: null }, languages: null });

export const useProfileData = () => useContext(ProfileDataContext);