import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";

import supabase from "../../../lib/supabaseClient.ts";

export default function Authenticated() {
    supabase.auth.getSession().then((session) => {
        console.log(session);
    })
    // use placeholder values for fields not yet stored in the database (e.g. bio)
    return (
        <Background>
            <NavBar />
        </Background>
    );
}