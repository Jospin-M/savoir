import Header from "../../components/common/Header";
import { Filters } from "../../components/browse/Filters";
import styles from "../../components/common/Common.module.css";

export default function SearchResults() {
    return (
        <div>
            <Header/>
            
            <div className={styles.main_content}>
                <Filters />
                
                <div className={styles.page_content}>
                    
                </div>
            </div>
        </div>
    );
}