import { createContext, useContext } from "react";
import type { UserProfile } from "../stores/useUserStore";
import type { Language, ProfileLanguageItem } from "../../lib/queryFunctions";

type Photo = {
    url: string;
    location: string;
}

export type ContextProfileData = {
    fullName: string;
    bio: string;
    profilePhoto: Photo;
    coverPhoto: Photo;
    languages: ProfileLanguageItem[];
}

export const ProfileDataContext = createContext<{
    userID: string, 
    languages: Language[],
    profileQuery: { data: ContextProfileData | null },
    updateProfile: ((dataToUpload: UserProfile, dataToDisplay: ContextProfileData) => void) | null
}>({ 
    userID: "", 
    profileQuery: { data: null }, 
    languages: [], 

    updateProfile: null
});

export const useProfileData = () => useContext(ProfileDataContext);