import type { ProfileData } from "./EditProfileModal.tsx";

import styles from "./EditProfile.module.css";

import { Controller, type Control, type FieldErrors } from "react-hook-form";

function NameField({ control, errors }: { control: Control<ProfileData>, errors: FieldErrors<ProfileData> }) {
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

function BioField({ control }: { control: Control<ProfileData> }) {
    return (
        <Controller 
            name="bio"
            control={control}
            render= {({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="bio">Bio</label>

                    {/* If the user already has a bio, we pre-populate the textarea with it. Otherwise, the default is shown.*/}
                    
                    { field.value ? 
                        <textarea 
                            name={field.name}
                            className={styles.form_control} 
                            maxLength={230} 
                            value={field.value}
                            onChange={e => field.onChange(e.target.value)}/> : 
                        <textarea
                            name={field.name}
                            className={styles.form_control} 
                            maxLength={230} 
                            placeholder="Describe your skills, passions, and experience."
                        />
                    }
                </div>
            )}
        />
    );
}

export default function NameAndBio({ control, errors }: { control: Control<ProfileData>, errors: FieldErrors<ProfileData> }) {
    return(
        <div>
            <NameField control={control} errors={errors}/>
            <BioField control={control}/>
        </div>
    );
}