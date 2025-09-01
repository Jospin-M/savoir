"use client";

import Button from "../../common/Button";
import EditProfileModal from "../edit_profile/EditProfileModal";

import styles from "./Sidebar.module.css";
import commonStyles from "../../common/Common.module.css";

import { useState, type JSX } from "react";
import { useProfileData } from "../../../hooks/useProfileData";
import type { ProfileLanguageItem } from "../../../../lib/queryFunctions";

/**
 * Makes use of the user's profiency level to determine how many stars should be shown.
 *  
 * @param options Array of proficiency level names (e.g., ["Advanced", "Intermediate", "Beginner"]) used as keys for the star display mapping.
 * @param level The user's current proficiency level, must match one of the values in the options array.
 */
export function createLevel(options: string[], level: string) {
    const activeOptions: { [key: string]: string[] } = {};
    const activeStates = [
        ["active", "active", "active"],
        ["active", "active", ""],
        ["active", "", ""]
    ];

    activeStates.forEach((states, index) => {
        activeOptions[options[index]] = states;
    })

    // if styles[state] = "active", then the <span> element will be colored orange
    // otherwise, it will be gray
    const elements: JSX.Element[] = [];
    activeOptions[level]?.forEach((state, index) => elements.push(<span key={index} className={commonStyles[state]}/>))
   
    return <div className={commonStyles.proficiency_level}>{elements}</div>;
}

/**
 * Creates a visual representation of the user's proficiency in a list of languages.
 * 
 * @param languages A list of all the languages known by the user.
 */
export function createLanguageItems(languages: ProfileLanguageItem[]) {
    const languageItems: JSX.Element[] = [];
    
    languages?.forEach((language, index) => {
        languageItems.push((
            <div key={index} className={styles.language_item}>
                <span>{language.name}</span>

                {createLevel(["Fluent", "Intermediate", "Beginner"], language.proficiency)}
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