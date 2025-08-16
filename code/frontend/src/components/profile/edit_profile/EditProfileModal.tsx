import { CoverPhoto, ProfilePhoto } from "./Photos.tsx";
import Textfields from "./Textfields.tsx";
import Languages from "./Languages.tsx";

import styles from "./EditProfile.module.css";

import { useForm } from "react-hook-form";
import type { LanguageItem } from "./Languages.tsx";
import { useProfileData } from "../../../hooks/useProfileData.ts";
import supabase, { sendAuthenticatedHTTPRequest } from "../../../../lib/utils.ts";

export type CurrentProfileData = {
    coverPhoto: { file: File | null, url: string | undefined} | null,
    profilePhoto: { file: File | null, url: string | undefined} | null,
    name: string | undefined,
    bio: string | undefined,
    languages: LanguageItem[] | undefined
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    // another method should be defined to handle the updating of profile information when react query is setup
    const { profileQuery: { data, refetch } } = useProfileData();
    const defaultValues: CurrentProfileData = { 
        coverPhoto: { file: null, url: data?.coverImageUrl!}, 
        profilePhoto: { file: null, url: data?.profileImageUrl}, 
        name: data?.fullName, 
        bio: data?.bio, 
        languages: data?.languages as LanguageItem[]
    };
    
    // maybe define a loading state for the button, depending on how fast the requests are made
    const { 
        control,
        handleSubmit, 
        formState: { errors }
    } = useForm({ defaultValues: defaultValues });

    const hasErrors = !!errors.coverPhoto || !!errors.profilePhoto || !!errors.name || !!errors.bio || !!errors.languages;
    
    async function onSubmit(data: CurrentProfileData) {
        const { data: { session } } = await supabase.auth.getSession();

        await sendAuthenticatedHTTPRequest("/profile/me", "POST", data, session?.access_token!);
        await refetch?.(); // refresh the data on the page so that the data stored in the query client cache is fresh
        // NOTE: refetch() is used instead of invalidateQueryClient() since hooks can only be called in components

        closeButtonHandler();
    }
 
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_header}>
                    <h2>Edit Profile</h2>
                    
                    <button className={styles.close_button} onClick={() => closeButtonHandler()}>
                        <i className={"ri-close-line"}/>
                    </button>
                </div>

                <div className={styles.modal_body}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CoverPhoto control={control} errors={errors}/>
                        <ProfilePhoto control={control} errors={errors}/>
                        <Textfields control={control} errors={errors}/>
                        <Languages control={control} errors={errors}/>
                    
                        <div className={styles.modal_footer}>
                            <button className={styles.save_button} type="submit" disabled={hasErrors}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}