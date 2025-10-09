import Header from "../../components/common/Header";
import { NavBar } from "../../components/common/Navigation";

import styles from "../../components/common/Common.module.css";

export default function Browse() {
    return (
        <div>
            <Header/>
            
            <div className={styles.main_content}>
                <NavBar />
            </div>
        </div>
    );
}