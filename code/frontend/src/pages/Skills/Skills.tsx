import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";

import styles from "../../components/common/Common.module.css";

export default function Skills() {
    return (
        <div>
            <Header/>
            
            <div className={styles.main_content}>
                <NavBar />
                
                <div className={styles.page_content}>
                   hello 
                </div>
            </div>
        </div>
    );
}