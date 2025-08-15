import UploadButton from "./UploadButton.tsx";
import type { CurrentProfileData } from "./EditProfileModal.tsx";

import styles from "./EditProfile.module.css";

import { Controller, type Control, type FieldErrors } from "react-hook-form";

export function validateFileSize(value: { file: File | null, url: string | undefined} | null) {
    if(value?.file) {
        if(value.file.size >= 5e6) {
            return "File too large. Maximum allowed size is 5MB."
        }
    }

    return true;
}

export function CoverPhoto({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    return (
        <Controller 
            name="coverPhoto"
            control={control}
            rules={{ validate:  validateFileSize}}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="photo">Cover Photo</label>

                    <div className={styles.modal_cover_photo}>
                        <img src={field.value?.url} id={field.name}/>
                    </div>

                    <UploadButton promptText="Change Cover Photo" field={field} />

                    {errors.coverPhoto && <p className={styles.error_message}>{errors.coverPhoto.message}</p>}
                </div>
            )}
        />
    );
}

export function ProfilePhoto({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    return (
        <Controller 
            name="profilePhoto"
            control={control}
            rules={{ validate: validateFileSize }}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="photo">Profile Photo</label>

                    <div className={styles.edit_profile_photo_container}>
                        <div className={styles.edit_profile_photo_container}>
                            <img className={styles.edit_profile_photo} src={field.value?.url} />
                        </div>

                        <UploadButton promptText="Change Profile Photo" field={field} />

                        {errors.profilePhoto && <p className={styles.error_message}>{errors.profilePhoto.message}</p>}
                    </div>
                </div>
            )}
        />
    );
}