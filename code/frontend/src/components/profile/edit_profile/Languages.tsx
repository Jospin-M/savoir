import styles from "./EditProfile.module.css";

import type { Control, FieldErrors } from "react-hook-form";
import type { ProfileData } from "./EditProfileModal";

export default function Languages({ control, errors }: { control: Control<ProfileData>, errors: FieldErrors<ProfileData> }) {
    return (
        <div className={styles.form_group}>
            <label htmlFor={"languages"}>Languages</label>
            
            <div className={styles.language_item}>
                <select className={styles.language_select}>
                    <option value={"english"} selected>English</option>
                </select>

                <select className={styles.proficiency_select}>
                    <option value={"Fluent"} selected>Fluent</option>
                </select>

                <button type="button" className={styles.remove_language}>
                    <i className={"ri-delete-bin-line"}/>
                </button>
            </div>

            <button type={"button"} className={styles.add_language}>
                <i className={"ri-add-circle-line"} />
                
                { " Add new language " }
            </button>
        </div>
    );
}