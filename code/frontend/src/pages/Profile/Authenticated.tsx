import Header from "../../components/common/Header.tsx";
import { NavBar } from "../../components/common/Navigation.tsx";
import ProfileContent from "../../components/profile/ProfileContent.tsx";

import styles from "../../components/common/Common.module.css";

import { useEffect, useState } from "react";
import { useData } from "../../hooks/useQueryClient";
import { useUserStore, type UserProfile } from "../../stores/useUserStore";
import { ProfileDataContext, type ContextProfileData } from "../../hooks/useProfileData";
import { getProfileData, type ProfileData, getLanguages, type Language } from "../../../lib/queryFunctions.ts";

import { useRefreshCache } from "../../hooks/useRefreshCache.ts";

export default function Authenticated() {
    // to decide which page should be shown (authenticated vs. unauthenticated),
    // compare the stored user id with the one from the query parameter (which can be obtained with useParams)
    const id = useUserStore((state) => state.userID)!;
    const { data: profileData } = useData<ProfileData>(["user-profile", id], getProfileData, id);

    const setProfile = useUserStore(state => state.setProfile);
    const userProfile = useUserStore(state => state.userProfile);
    const isProfileUpdated = useUserStore(state => state.isProfileUpdated);
    const setIsProfileUpdated = useUserStore(state => state.setIsProfileUpdated);

    const { data: languagesData } = useData<Language[]>(["languages"], getLanguages);
    const [profile, setProfileData] = useState<ContextProfileData>({ ...profileData });

    useEffect(() => {
        setProfileData({ ...profileData });
    }, [profileData]); // initially, use the data provided by the server, otherwise, work with data in user store

    const userID = useUserStore(state => state.userID);
    const { refresh: updateProfileData } = useRefreshCache<UserProfile>(`/profiles/${userID}`, "PUT", { key: "user-profile", param: userID! })

    // Saves pending profile changes when user switches tabs, minimizes window, or closes page
    useEffect(() => {
        function updateCache() {
            if(isProfileUpdated && userProfile) {
                updateProfileData(userProfile);
                setIsProfileUpdated(false);
            }
        }

        document.addEventListener("visibilitychange", updateCache);

        return () => document.removeEventListener("visibilitychange", updateCache);

    }, [isProfileUpdated, userProfile, setIsProfileUpdated, updateProfileData]);

    function updateProfile(dataToUpload: UserProfile, dataToDisplay: ContextProfileData) {
        setProfile(dataToUpload);
        setIsProfileUpdated(true);
        setProfileData(dataToDisplay);
    }

    return (
        <ProfileDataContext.Provider value={{
            userID: id,
            languages: languagesData,
            profileQuery: { 
                data: profile
            },

            updateProfile
        }}>
            <div>
                <Header/>
                
                <div className={styles.main_content}>
                    <NavBar />
                    
                    <ProfileContent />
                </div>
            </div>
        </ProfileDataContext.Provider>
    );
}