import { createContext, useContext } from "react";
import type { LanguageItem, ProfileData } from "../../lib/queryFunctions";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type ContextProfileData = {
    fullName: string,
    bio: string,
    profilePhoto: { url: string, path: string},
    coverPhoto: { url: string, path: string},
    languages: LanguageItem[]
}

export const ProfileDataContext = createContext<{
    userID: string,
    profileQuery: {
        data: ContextProfileData | null,
        refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileData, Error>>) | null
    },
    languages: { id: number, name: string}[] | null
}>({ userID: "", profileQuery: { data: null, refetch: null }, languages: null });

export const useProfileData = () => useContext(ProfileDataContext);