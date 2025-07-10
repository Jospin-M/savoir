import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";
import { useLoaderData } from "react-router-dom";

export default function Messages() {
    const { globalProfileImageURL } = useLoaderData();
    
    return (
        <Background>
            <NavBar profileImageUrl={globalProfileImageURL}/>
        </Background>
    );
}