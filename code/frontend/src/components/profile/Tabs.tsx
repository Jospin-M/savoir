import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "../../components/profile/Profile.module.css";

export default function Sections() {
    // make a seperate component for Skills, Reviews, Saved, History

    return (
        <Tabs id={styles.outline}>
            <TabList className={styles.profile_sections}>
                <Tab className={styles["sections"]} selectedClassName={styles.profile_sections_selected}>
                    Skills
                </Tab>

                <Tab className={styles["sections"]} selectedClassName={styles.profile_sections_selected}>
                    Reviews
                </Tab>

                <Tab className={styles["sections"]} selectedClassName={styles.profile_sections_selected}>
                    Saved
                </Tab>

                <Tab className={styles["sections"]} selectedClassName={styles.profile_sections_selected}>
                    History
                </Tab>
            </TabList>

            <TabPanel>
                <h2>Skills</h2>
            </TabPanel>

            <TabPanel>
                <h2>Reviews</h2>
            </TabPanel>

            <TabPanel>
                <h2>Saved</h2>
            </TabPanel>

            <TabPanel>
                <h2>History</h2>
            </TabPanel>
        </Tabs>
    );
}