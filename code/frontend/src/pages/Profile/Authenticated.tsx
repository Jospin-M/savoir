import Header from "../../components/common/Header.tsx";
import ProfileHeader from "../../components/profile/ProfileHeader.tsx";
import NavBar from "../../components/common/NavBar.tsx";

export default function Authenticated() {
    // use React query -- reference tutorial

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