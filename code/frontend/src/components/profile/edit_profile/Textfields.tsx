import type { CurrentProfileData } from "./EditProfileModal.tsx";

import styles from "./EditProfile.module.css";

import { Controller, type Control, type FieldErrors } from "react-hook-form";

function NameField({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    return (
        <Controller 
            name="name"
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="full_name">Full Name</label>

                    <input 
                        type="text" 
                        id={"full_name"}
                        name={field.name}
                        className={styles.form_control} 
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                    />

                    {errors.name && <p className={styles.error_message}>{errors.name.message}</p>}
                </div>
            )}
        />
    );
}

function BioField({ control }: { control: Control<CurrentProfileData> }) {
    return (
        <Controller 
            name="bio"
            control={control}
            render= {({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor={"bio"}>Bio</label>

                    {/* If the user already has a bio, we pre-populate the textarea with it. Otherwise, the default is shown.*/}
                    
                    <textarea
                        id={"bio"}
                        name={field.name}
                        className={styles.form_control} 
                        maxLength={230} 
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        />
                </div>
            )}
        />
    );
}

export default function Textfields({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    return(
        <div>
            <NameField control={control} errors={errors}/>
            <BioField control={control}/>
        </div>
    );
}