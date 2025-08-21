import { createContext, useContext } from "react";
import type { Language, ProfileLanguageItem, ProfileData } from "../../lib/clientQueryFunctions";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type ContextProfileData = {
    fullName: string,
    bio: string,
    profilePhoto: { url: string, location: string},
    coverPhoto: { url: string, location: string},
    languages: ProfileLanguageItem[]
}

export const ProfileDataContext = createContext<{
    userID: string,
    profileQuery: {
        data: ContextProfileData | null,
        refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileData, Error>>) | null
    },
    languages: Language[] | null
}>({ userID: "", profileQuery: { data: null, refetch: null }, languages: null });

export const useProfileData = () => useContext(ProfileDataContext);