import Header from "../../components/common/Header.tsx";
import NavBar from "../../components/common/NavBar.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";
import ProfileContent from "../../components/profile/ProfileContent.tsx";

import styles from "../../components/common/Common.module.css";

import { useUserStore } from "../../stores/useUserStore";
import { useQueryClient } from "../../hooks/useQueryClient";
import { ProfileDataContext, type ContextProfileData } from "../../hooks/useProfileData";
import { getProfileData, type ProfileData, getLanguages, type Language } from "../../../lib/queryFunctions.ts";

function createURLs(profileData: ProfileData) {
    const urls = [];
    const files = [profileData?.coverPhoto.buffer, profileData?.profilePhoto.buffer];
    
    for(let file of files) {
        if(file) {
            const byteArray = new Uint8Array(file.data);
            const blob = new Blob([byteArray]);
            const url = URL.createObjectURL(blob);
            urls.push(url);
        }
    }

    return urls;
}

export default function Authenticated() {
    // to decide which page should be shown (authenticated vs. unauthenticated),
    // compare the stored user id with the one from the query parameter (which can be obtained with useParams)
    const id = useUserStore((state) => state.userID)!;
    const { data: profileData, refetch } = useQueryClient<ProfileData>(
        ["profileData", id], 
        getProfileData, 
        id
    );

    const { data: languagesData } = useQueryClient<Language[]>(["languages"], getLanguages);
    const pictureURLs = createURLs(profileData);

    let contextProfileData: ContextProfileData = {
        fullName: "",
        bio: "",
        coverPhoto: { url: "", path: "" },
        profilePhoto: { url: "", path: "" },
        languages: []
    };
    
    contextProfileData =  {
        fullName: profileData?.fullName,
        bio: profileData?.bio,
        coverPhoto: { url: pictureURLs[0], path: profileData?.coverPhoto.location }, 
        profilePhoto: { url: pictureURLs[1], path: profileData?.profilePhoto.location },
        languages: profileData?.languages
    }

    return (
        <ProfileDataContext.Provider value={{
            userID: id,
            profileQuery: { 
                data: contextProfileData, 
                refetch: refetch
            },
            languages: languagesData
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