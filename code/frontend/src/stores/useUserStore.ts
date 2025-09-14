import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Skill } from "../../lib/queryFunctions";

export type UserState = {
    userID: string | null
    setUserID: (id: string) => void
    clearUserID: () => void

    skills: Skill[]
    setSkills: (skills: Skill[]) => void

    isSkillsCacheUpdated: boolean
    setIsSkillsUpdated: (isUpdated: boolean) => void
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id) => set({ userID: id }),
            clearUserID: () => set({ userID: null }),

            skills: [],
            setSkills: (skills) => set({ skills: [...skills] }),

            isSkillsCacheUpdated: false,
            setIsSkillsUpdated: (isUpdated) => set({ isSkillsCacheUpdated: isUpdated })
        }),
        {
            name: "user-storage"
        }
    )
);