import { CoverPhoto, ProfilePhoto } from "./Photos.tsx";
import NameAndBio from "./NameAndBio.tsx";
import Languages from "./Languages.tsx";
import type { Language } from "../edit_profile/Languages.tsx";

import styles from "./EditProfile.module.css";

import { useForm } from "react-hook-form";

export type ProfileData = {
    coverPhoto: { file: File | null, url: string } | null,
    profilePhoto: { file: File | null, url: string } | null,
    name: string,
    bio: string,
    languages: Language[]
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    // another method should be defined to handle the updating of profile information when react query is setup
    // default values should be populated with user data from server
    const defaultValues: ProfileData = { coverPhoto: null, profilePhoto: null, name: "", bio: "", languages: [] };
    // maybe define a loading state for the button, depending on how fast the requests are made
    const { 
        control,
        handleSubmit, 
        formState: { errors }
    } = useForm({ defaultValues: defaultValues });

    async function onSubmit(data: ProfileData) {
        console.log(data);
    }

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_header}>
                    <h2>Edit Profile</h2>
                    
                    <button className={styles.close_button} onClick={() => closeButtonHandler()}>
                        <i className={"ri-close-line"}></i>
                    </button>
                </div>

                <div className={styles.modal_body}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CoverPhoto control={control} errors={errors}/>
                        <ProfilePhoto control={control} errors={errors}/>
                        <NameAndBio control={control} errors={errors} />
                        <Languages control={control} errors={errors} />
                    
                        <div className={styles.modal_footer}>
                            <button className={styles.save_button} type="submit" >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}