import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
    userID: string | null,
    setUserID: (id: string) => void,

    clearUserID: () => void
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id) => set({ userID: id }),
            clearUserID: () => set({ userID: null })
        }),
        {
            name: "user-storage"
        }
    )
);