import Header from "../../components/common/Header";
import NavBar from "../../components/common/NavBar";
import SkillsContent from "../../components/skills/SkillsContent";

import styles from "../../components/common/Common.module.css";

export default function Skills() {
    return (
        <div>
            <Header/>
            
            <div className={styles.main_content}>
                <NavBar />
                
                <SkillsContent />
            </div>
        </div>
    );
}