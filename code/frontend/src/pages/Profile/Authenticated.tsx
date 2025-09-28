import Header from "../../components/common/Header.tsx";
import { NavBar } from "../../components/common/Navigation.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";
import ProfileContent from "../../components/profile/ProfileContent.tsx";

import styles from "../../components/common/Common.module.css";

import { createURLs } from "../../../lib/utils.ts";
import type { UserProfile } from "../../stores/useUserStore";
import { useUserStore } from "../../stores/useUserStore";
import { useData } from "../../hooks/useQueryClient";
import { ProfileDataContext, type ContextProfileData } from "../../hooks/useProfileData";
import { getProfileData, type ProfileData, getLanguages, type Language } from "../../../lib/queryFunctions.ts";
import { useEffect, useState } from "react";
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
    const pictureURLs = createURLs([profileData?.coverPhoto?.buffer, profileData?.profilePhoto?.buffer]);

    let contextProfileData: ContextProfileData = {
        fullName: "",
        bio: "",
        coverPhoto: { url: "", location: "" },
        profilePhoto: { url: "", location: "" },
        languages: []
    };
    
    contextProfileData =  {
        fullName: profileData?.fullName,
        bio: profileData?.bio,
        coverPhoto: { url: pictureURLs[0], location: profileData?.coverPhoto?.location }, 
        profilePhoto: { url: pictureURLs[1], location: profileData?.profilePhoto?.location },
        languages: profileData?.languages
    }

    const [profile, setProfileData] = useState<ContextProfileData>(contextProfileData);

    useEffect(() => {
        setProfileData(contextProfileData);
    }, [profileData]); // initially, use the data provided by the server, otherwise, work with data in user store

    const userID = useUserStore(state => state.userID);
    const { refresh: updateProfileData } = useRefreshCache<UserProfile>(`/profiles/${userID}`, "PUT", { key: "user-skills", param: userID! })

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

    }, [isProfileUpdated, userProfile]);

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
                    
                    <div className={styles.page_content}>
                        <ProfileHeader />
                        <ProfileContent />
                    </div>
                </div>
            </div>
        </ProfileDataContext.Provider>
    );
}