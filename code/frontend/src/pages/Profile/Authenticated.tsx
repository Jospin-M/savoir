import Header from "../../components/common/Header.tsx";

import "../../index.css";

import NavBar from "../../components/common/NavBar.tsx";

export default function Authenticated() {
    return (
        <div>
            <Header />
            <NavBar />
            <div className="container">
                hello
            </div>
        </div>
    );
}