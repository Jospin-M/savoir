import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
    userID: string | null,
    setUserID: (id: string) => void,

    profileImageURL: string | null,
    setProfileImageURL: (url: string) => void,

    clearUser: Function
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id: string) => set({ userID: id }),

            profileImageURL: null,
            setProfileImageURL: (url: string) => set({ profileImageURL: url }),

            clearUser: () => set({ userID: null, profileImageURL: null })
        }),
        {
            name: "user-storage"
        }
    )
);