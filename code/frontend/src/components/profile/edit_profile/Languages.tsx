import type { ProfileData } from "./EditProfileModal.tsx";
import type { Language } from "../sidebar/Sidebar.tsx";

import styles from "./EditProfile.module.css";

import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

function LanguageOptions({ selectedLanguage }: { selectedLanguage: Language }) {
    const languages: string[] = ["English", "French"] // will be replaced with list of languages provided by server
    const proficiencyLevels = ["Fluent", "Intermediate", "Beginner"];

    return (
        <div className={styles.language_items_container}>
            <select className={styles.language_select} defaultValue={selectedLanguage.name}>
                {languages.map((lang) => (
                    <option value={lang}>{lang}</option>
                ))}
            </select>

            <select className={styles.proficiency_select} defaultValue={selectedLanguage.proficiency}>
                {proficiencyLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                ))}
            </select>
        </div>
    );
}

/**
 * Generates an array of language item JSX elements from a list of known languages.
 *
 * Each item consists of:
 * - A `LanguageOptions` component pre-populated with the given language and the related proficiency.
 * - A delete button to remove the language from the list.
 *
 * @param knownLanguages - The languages the user has previously selected.
 */
function createLanguageItems(knownLanguages: Language[]) {
    const languageItems: React.JSX.Element[] = []
    
    knownLanguages.forEach((lang) => {
        languageItems.push((
            <div className={styles.language_item} key={lang.name}>
                <LanguageOptions selectedLanguage={lang}/>

                <button type="button" className={styles.remove_language}>
                    <i className={"ri-delete-bin-line"}/>
                </button>
            </div>
        ));
    });

    return languageItems;
}

export default function Languages({ control, errors }: { control: Control<ProfileData>, errors: FieldErrors<ProfileData> }) {
    /** Their should always be at least one language in this list. Enforce this somehow */
    return (
        <Controller 
            name="languages"
            control={control}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor={"languages"}>Languages</label>
                    
                    { createLanguageItems(field.value) }

                    <button type={"button"} className={styles.add_language}>
                        <i className={"ri-add-circle-line"} />
                        
                        { " Add new language " }
                    </button>
                </div>
            )}
        />
    );
}