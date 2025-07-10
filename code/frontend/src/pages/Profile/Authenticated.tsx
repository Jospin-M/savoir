import Background from "../../components/profile/Background";
import NavBar from "../../components/common/NavBar.tsx";
import Button from "../../components/common/Button.tsx";
import styles from "../../components/profile/Profile.module.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLoaderData } from "react-router-dom";

export default function Authenticated() {
    const { profileData: { fullName, bio, profileImageUrl } } = useLoaderData();
    
    // make a seperate component for Skills, Reviews, Saved, History
    return (
        <Background>
            <NavBar profileImageUrl={profileImageUrl}/>

            <div className={styles.profile_header}> 
                <div className={styles.profile_header_top_layer}>
                    <img className={styles.profile_pic} src={profileImageUrl}/>
            
                    <div className={styles.name_container}>
                        <div className={styles["roboto-name"]}>{fullName}</div>
                    </div>

                    <div className={styles.edit_profile_button_container}>
                        <Button prompt="Edit Profile" buttonCSSClass="edit_profile_button" buttonTitleCSSClass="roboto-edit_profile" isDisabled={false} handleClick={() => {}}/>
                    </div>
                </div>  

                <div className={styles.bio_container}>
                    <p className={styles["roboto-bio"]}>{bio}</p>
                </div>  

                <div className={styles.profile_sections_container}>
                    <Tabs id={styles.outline}>
                        <TabList className={styles.profile_sections}>
                            <Tab className={styles["roboto-sections"]} selectedClassName={styles.profile_sections_selected}>
                                Skills
                            </Tab>

                            <Tab className={styles["roboto-sections"]} selectedClassName={styles.profile_sections_selected}>
                                Reviews
                            </Tab>

                            <Tab className={styles["roboto-sections"]} selectedClassName={styles.profile_sections_selected}>
                                Saved
                            </Tab>

                            <Tab className={styles["roboto-sections"]} selectedClassName={styles.profile_sections_selected}>
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
                </div>
            </div>
        </Background>
    );
}