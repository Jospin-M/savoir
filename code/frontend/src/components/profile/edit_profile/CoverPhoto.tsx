import UploadButton from "./UploadButton";

import styles from "./EditProfile.module.css";

import type { ProfileData } from "./EditProfileModal";
import { Controller, type Control } from "react-hook-form";

export default function CoverPhoto({ control }: { control: Control<ProfileData> }) {
    return (
        <Controller 
            name="coverPhoto"
            control={control}
            render={({ field }) => (
                <div className={styles.form_group}>
                    <label htmlFor="cover_photo">Cover Photo</label>

                    <div className={styles.modal_cover_photo}>
                        <img src={field.value} id={field.name}/>
                    </div>

                    <UploadButton promptText="Change Cover Photo" field={field} />
                </div>
            )}
        />
    );
}