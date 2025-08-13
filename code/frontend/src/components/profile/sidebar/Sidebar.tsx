"use client";

import EditProfileModal from "../edit_profile/EditProfileModal";
import Button from "../../common/Button";

import styles from "./Sidebar.module.css";

import { useState } from "react";
import {type Language, createLanguageItems} from "./utils";

export default function Sidebar() {
    // editing the profile in any way should refresh the page so that updated data
    // is shown when the user completes the action
    const languages: Language[] = [ // these would be retrieved from the database
        { name: "English", proficiency: "advanced" },
        { name: "French", proficiency: "advanced" },
        { name: "Swahili", proficiency: "intermediate" },
        { name: "Lingala", proficiency: "beginner" }
    ];
    const languageItems = createLanguageItems(languages);

    const [showModal, setShowModal] = useState(false);

    return ((
        <div className={styles.sidebar_container}>
            <div className={styles.profile_sidebar}>
                <div className={styles.card} id={styles.profile}>
                    <div className={styles.card_header}>
                        <h2>About Me</h2>
                    </div>

                    <p className={styles.bio_text}>
                        Passionate language teacher with 5+ years of experience. I love helping others discover new cultures through language learning. In my free time, I enjoy hiking and photography and exploring local cuisine with friends from Italy.    
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <h2>Languages</h2>
                    </div>

                    <div className={styles.languages_container}>
                        {languageItems}
                    </div>
                </div>

                <div className={styles.edit_profile_button_container}>
                    <Button prompt="Edit Profile" isDisabled={false} handleClick={() => setShowModal(true)}/>
                </div>

                {showModal && <EditProfileModal closeButtonHandler={() => setShowModal(false)} />}
            </div>
        </div>
    ));
}