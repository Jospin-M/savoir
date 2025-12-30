import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Skill } from "../../lib/queryFunctions";
import type { ProfileLanguageItem } from "../../lib/queryFunctions";

export type UserProfile = {
    name: string;
    bio: string;
    languages: ProfileLanguageItem[];
    coverPhoto: string;
    profilePhoto: string;
}

type RegistrationForm = {
    id: string;
    first_name: string;
    last_name: string;
    email: string
}

export type UserState = {
    userID: string | null;
    clearUserID: () => void;
    setUserID: (id: string) => void;

    userProfile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;

    registrationInfo: RegistrationForm | null,
    setRegistrationInfo: (info: RegistrationForm) => void;
    clearRegistrationInfo: () => void;

    isProfileUpdated: boolean;
    setIsProfileUpdated: (isUpdated: boolean) => void;

    skills: Skill[];
    setSkills: (skills: Skill[]) => void;

    isSkillsCacheUpdated: boolean;
    setIsSkillsUpdated: (isUpdated: boolean) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id) => set({ userID: id }),
            clearUserID: () => set({ userID: null }),

            userProfile: null,
            setProfile: (profile) => set({ userProfile: profile }),

            registrationInfo: null,
            setRegistrationInfo: (info) => set({ registrationInfo: info }),
            clearRegistrationInfo: () => set({ registrationInfo: null }),

            isProfileUpdated: false,
            setIsProfileUpdated: (isUpdated) => set({ isProfileUpdated: isUpdated }),

            skills: [],
            setSkills: (skills) => set({ skills: [...skills] }),

            isSkillsCacheUpdated: false,
            setIsSkillsUpdated: (isUpdated) => set({ isSkillsCacheUpdated: isUpdated })
        }),

        { name: "user-storage" }
    )
);