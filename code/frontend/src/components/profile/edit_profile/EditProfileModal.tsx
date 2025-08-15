import { CoverPhoto, ProfilePhoto } from "./Photos.tsx";
import Textfields from "./Textfields.tsx";
import Languages from "./Languages.tsx";
import type { Language } from "../edit_profile/Languages.tsx";

import styles from "./EditProfile.module.css";

import { useForm } from "react-hook-form";
import { useProfileData } from "../../../hooks/useProfileData.ts";

export type CurrentProfileData = {
    coverPhoto: { file: File | null, url: string | undefined} | null,
    profilePhoto: { file: File | null, url: string | undefined} | null,
    name: string | undefined,
    bio: string | undefined,
    languages: Language[] | undefined
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    // another method should be defined to handle the updating of profile information when react query is setup
    const { profileQuery: { data, refetch } } = useProfileData();
    const defaultValues: CurrentProfileData = { 
        coverPhoto: { file: null, url: data?.coverImageUrl!}, 
        profilePhoto: { file: null, url: data?.profileImageUrl}, 
        name: data?.fullName, 
        bio: data?.bio, 
        languages: data?.languages as Language[]
    };
    
    // maybe define a loading state for the button, depending on how fast the requests are made
    const { 
        control,
        handleSubmit, 
        formState: { errors }
    } = useForm({ defaultValues: defaultValues });

    async function onSubmit(data: CurrentProfileData) {
        refetch?.();
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
                        <Textfields control={control} errors={errors} />
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