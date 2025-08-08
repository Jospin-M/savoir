import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
    userID: string | null,
    setUserID: (id: string) => void,

    user: { id: string, first_name: string, last_name: string, email: string } | null,
    setUser: ((userInfo: { id: string, first_name: string, last_name: string, email: string }) => void)

    clearUserID: () => void,
    clearUser: () => void,
    clearData: () => void
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id) => set({ userID: id }),

            user: null,
            setUser: (userInfo) => set({ user: userInfo }),

            clearUserID: () => set({ userID: null }),
            clearUser: () => set({ user: null }),
            clearData: () => set({ user: null, userID: null })
        }),
        {
            name: "user-storage"
        }
    )
);