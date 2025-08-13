import styles from "./Sidebar.module.css";

import type { JSX } from "react";

export type Language = {
    name: string,
    proficiency: "advanced" | "intermediate" | "beginner"
}

/**
 * Creates a visual representation of the user's proficiency in a list of languages.
 * 
 * @param languages A list of all the languages known by the user.
 */
export function createLanguageItems(languages: Language[]) {
    const languageItems: JSX.Element[] = [];

    /**
     * Makes use of the user's profiency level in the language to determine how many stars should be rendered in the 'active' state.
     *  
     * @param states A mapping of the profiency level to the amount of stars that should be shown.
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