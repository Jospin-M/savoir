import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";

import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
    const { profileImage } = useLoaderData();
    
    return (
        <Background>
            <NavBar profileImageUrl={profileImage}/>
        </Background>
    );
}