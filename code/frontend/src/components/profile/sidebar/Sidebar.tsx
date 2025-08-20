"use client";

import EditProfileModal from "../edit_profile/EditProfileModal";
import Button from "../../common/Button";
import type { LanguageItem } from "../../../../lib/queryFunctions";
import styles from "./Sidebar.module.css";

import { useState, type JSX } from "react";
import { useProfileData } from "../../../hooks/useProfileData";

/**
 * Creates a visual representation of the user's proficiency in a list of languages.
 * 
 * @param languages A list of all the languages known by the user.
 */
export function createLanguageItems(languages: LanguageItem[]) {
    /**
     * Makes use of the user's profiency level in the language to determine how many stars should be shown next to the name of the language
     * on their profile.
     *  
     * @param states A mapping of the profiency level to the amount of stars that should be shown.
     */
    function createLevel(states: string[]) {
        const elements: JSX.Element[] = [];

        // if styles[state] = "active", then the <span> element will be colored orange
        // otherwise, it will be gray
        states.forEach((state, index) => elements.push(<span key={index} className={styles[state]}/>))
    
        return <div className={styles.language_level}>{elements}</div>;
    }

    const activeStates = {
        Fluent: ["active", "active", "active"],
        Intermediate: ["active", "active", ""],
        Beginner: ["active", "", ""]
    }

    const languageItems: JSX.Element[] = [];
    
    languages?.forEach((language, index) => {
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
    const { profileQuery: { data } } = useProfileData();
    const languageItems = data ? createLanguageItems(data.languages): null;

    const [showModal, setShowModal] = useState(false);

    return ((
        <div className={styles.sidebar_container}>
            <div className={styles.profile_sidebar}>
                <div className={styles.card} id={styles.profile}>
                    <div className={styles.card_header}>
                        <h2>About Me</h2>
                    </div>

                    <p className={styles.bio_text}>{data?.bio}</p>
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

                {showModal && 
                    <EditProfileModal closeButtonHandler={() => setShowModal(false)} />}
            </div>
        </div>
    ));
}