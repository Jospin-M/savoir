import UploadButton from "./UploadButton.tsx";
import type { ProfileData } from "./EditProfileModal.tsx";
import styles from "./EditProfile.module.css";

import { Controller, type Control } from "react-hook-form";

export default function ProfilePhoto({ control }: { control: Control<ProfileData> }) {
    return (
        <Controller 
            name="profilePhoto"
            control={control}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="profile_photo">Profile Photo</label>

                    <div className={styles.edit_profile_photo_container}>
                        <div className={styles.edit_profile_photo_container}>
                            <img className={styles.edit_profile_photo} src={field.value} id={field.name} />
                        </div>

                        <UploadButton promptText="Change Profile Photo" field={field} />
                    </div>
                </div>
            )}
        />
    );
}