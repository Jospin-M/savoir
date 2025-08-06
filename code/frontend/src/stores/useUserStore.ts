import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
    userID: string | null,
    setUserID: (id: string) => void,

    profileImageURL: string | null,
    setProfileImageURL: (url: string) => void,

    name: string | null,
    setName: (name: string) => void,

    bio: string | null,
    setBio: (bio: string) => void,

    clearUser: () => void
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userID: null,
            setUserID: (id: string) => set({ userID: id }),

            profileImageURL: null,
            setProfileImageURL: (url: string) => set({ profileImageURL: url }),

            name: null,
            setName: (name: string) => set({ name: name }),

            bio: null,
            setBio: (bio: string) => set({ bio: bio }),

            clearUser: () => set({ userID: null, profileImageURL: null, name: null, bio: null })
        }),
        {
            name: "user-storage"
        }
    )
);