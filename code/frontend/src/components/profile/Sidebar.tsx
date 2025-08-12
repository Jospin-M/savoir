"use client";

import type { JSX } from "react";
import EditProfileModal from "./EditProfileModal";
import Button from "../common/Button";

import styles from "./Profile.module.css";

import { useState } from "react";

type Language = {
    name: string,
    proficiency: "advanced" | "intermediate" | "beginner"
}

/**
 * Creates a visual representation of the user's proficiency in a list of languages.
 * 
 * @param languages A list of all the languages known by the user.
 */
function createLanguageItems(languages: Language[]) {
    const languageItems: JSX.Element[] = [];

    /**
     * Makes use of the user's profiency level in the language to determine how many stars should be rendered in the 'active' state.
     *  
     * @param states A mapping of the profiency level to the amount of stars that should be shown in.
     */
    function createLevel(states: string[]) {
        const elements: JSX.Element[] = []

        states.forEach((state, index) => elements.push(<span key={index} className={styles[state]}/>))
    
        return <div className={styles.language_level}>{elements}</div>;
    }

    const activeStates = {
        advanced: ["active", "active", "active"],
        intermediate: ["active", "active", ""],
        beginner: ["active", "", ""]
    }
    
    languages.forEach((language, index) => {
        languageItems.push((
            <div key={index} className={styles.language_item}>
                <span>{language.name}</span>

                {createLevel(activeStates[language.proficiency])}
            </div>
        ));
    });

    return languageItems;
}

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