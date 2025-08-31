import type { CurrentProfileData } from "./EditProfileModal.tsx";

import styles from "./EditProfile.module.css";
import modalStyles from "../../common/modal/Modal.module.css";

import type { ChangeEvent } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import { useProfileData } from "../../../hooks/useProfileData.ts";
import type { Language, ProfileLanguageItem } from "../../../../lib/queryFunctions.ts";
import { Controller, type ControllerRenderProps } from "react-hook-form";

function LanguageOptions({ field, index }: { field:  ControllerRenderProps<CurrentProfileData, "languages">, index: number }) {
    const proficiencyLevels = ["Fluent", "Intermediate", "Beginner"];
    
    // obtain the list of languages for use in the display of available options to be selected
    const languageNames: string[] = [];
    const { languages: languageData } = useProfileData();
    languageData?.forEach(lang => languageNames.push(lang.name));
    
    /**
     * Updates the selected language choice in a <select> element.
     */
    function updateLanguageChoice(e: ChangeEvent<HTMLSelectElement>) {
        const newChoices = [...field.value!];
        newChoices[index] = {...newChoices[index], name: e.target.value};

        // using the name of the language, we find the matching entry in the languageData array and 
        // obtain its id. a reference to the language id needs to be maintained so that the server 
        // can correctly process the updated language choices.
        const { id: newLanguageID } = languageData?.find(lang => lang.name == newChoices[index].name) as Language;
        newChoices[index] = {...newChoices[index], id: Number(newLanguageID)};
        field.onChange(newChoices);
    }

    /**
     * Updates the selected language choice in a <select> element.
     */
    function updateProficiencyChoice(e: ChangeEvent<HTMLSelectElement>) {
        const newChoices = [...field.value!];
        newChoices[index] = {...newChoices[index], proficiency: e.target.value as "Fluent" | "Intermediate" | "Beginner"};
        
        field.onChange(newChoices);
    }

    return (
        <div className={styles.language_items_container}>
            <select className={styles.language_select} value={field.value![index].name} onChange={updateLanguageChoice}>
                {languageNames.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>

            <select className={styles.proficiency_select} value={field.value![index].proficiency} onChange={updateProficiencyChoice}>
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
function createLanguageItems(knownLanguages: ProfileLanguageItem[], field: ControllerRenderProps<CurrentProfileData, "languages">) {
    const languageItems: React.JSX.Element[] = []
    
    knownLanguages.forEach((lang, index) => {
        languageItems.push((
            <div className={styles.language_item} key={index}>
                <LanguageOptions field={field} index={index}/>

                <button 
                    type="button" 
                    className={styles.remove_language}
                    onClick={() => {
                        const newValue = field.value!.filter((value) => value !== lang);
                        field.onChange(newValue);
                    }}
                >
                    <i className={"ri-delete-bin-line"}/>
                </button>
            </div>
        ));
    });

    return languageItems;
}

export default function Languages({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    /**
     * Validates an array of Language objects according to length and uniqueness rules.
     */
    function formValidator(value: ProfileLanguageItem[] | undefined) {
        if (!value) return "At least 1 language is required."; 

        if(value.length > 5) {
            return "Maximum 5 languages allowed.";
        } else if(value.length < 1) {
            return "At least 1 language is required.";
        }

        const languageNames: string[] = [];
        value.forEach((lang) => {
            languageNames.push(lang.name)
        });
        
        if((new Set(languageNames)).size < value.length) {
            return "Each language must be unique.";
        }
    }
    
    return (
        <Controller 
            name="languages"
            control={control}
            rules={{ validate: formValidator}}
            render={({ field }) => (
                <div className={modalStyles.form_group}>
                    <label htmlFor={"languages"}>Languages</label>
                    
                    { createLanguageItems(field.value!, field) }

                    <button 
                        id={"languages"}
                        type={"button"} 
                        className={styles.add_language} 
                        onClick={() => {
                            field.onChange([...field.value!, { name: "English", proficiency: "Beginner", id: 1 }]);
                        }}
                    >
                        <i className={"ri-add-circle-line"} />
                        
                        { " Add new language " }
                    </button>

                    {errors.languages && <p className={styles.error_message}>{errors.languages.message}</p>}
                </div>
            )}
        />
    );
}