import Header from "../../components/common/Header.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";
import NavBar from "../../components/common/NavBar.tsx";

import "../../index.css";

import { useUserStore } from "../../stores/useUserStore.ts";
import { sendAuthenticatedHTTPRequest } from "../../../lib/utils.ts";

export default function Authenticated() {
    // use React query -- reference tutorial

    const setProfileImageURL = useUserStore((state) => state.setProfileImageURL);
    const setName = useUserStore((state) => state.setName);
    const setBio = useUserStore((state) => state.setBio);
    
    const userID = useUserStore((state) => state.userID);
    sendAuthenticatedHTTPRequest(`/auth/profile/${userID}`, "GET", {})
    .then(profileData => {
        setProfileImageURL(profileData.profileImageUrl);
        setName(profileData.fullName);
        setBio(profileData.bio);
    });

    return (
        <div>
            <Header/>
            <NavBar />
            
            <div className="container">
                <ProfileHeader/>
            </div>
        </div>
    );
}