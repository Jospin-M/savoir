import { createContext, useContext } from "react";
import type { Language, ProfileLanguageItem } from "../../lib/queryFunctions";

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
        data: ContextProfileData | null}, 
    languages: Language[]
}>({ userID: "", profileQuery: { data: null }, languages: [] });

export const useProfileData = () => useContext(ProfileDataContext);