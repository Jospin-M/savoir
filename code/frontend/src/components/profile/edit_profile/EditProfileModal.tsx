import { CoverPhoto, ProfilePhoto } from "./Photos.tsx";
import Textfields from "./Textfields.tsx";
import Languages from "./Languages.tsx";

import styles from "./EditProfile.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProfileData } from "../../../hooks/useProfileData.ts";
import type { LanguageItem } from "../../../../lib/queryFunctions.ts";
import { sendAuthenticatedHTTPRequest, uploadFiles } from "../../../../lib/utils.ts";

export type CurrentProfileData = {
    coverPhoto: { file: File | null, url: string | undefined, blob: Blob | null} | null,
    profilePhoto: { file: File | null, url: string | undefined, blob: Blob | null} | null,
    name: string | undefined,
    bio: string | undefined,
    languages: LanguageItem[] | undefined
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    // another method should be defined to handle the updating of profile information when react query is setup
    const { profileQuery: { data, refetch }, userID } = useProfileData();
    const defaultValues: CurrentProfileData = { 
        coverPhoto: { file: null, url: data?.coverImageUrl!, blob: null }, // remove url parameter since blob can be read on <img> element
        profilePhoto: { file: null, url: data?.profileImageUrl, blob: null}, 
        name: data?.fullName, 
        bio: data?.bio, 
        languages: data?.languages
    };
    
    // button should be disabled as requests are being made as a form of rate limiting
    const { 
        control,
        handleSubmit, 
        formState: { errors }
    } = useForm({ defaultValues: defaultValues });
    
    const hasErrors = !!errors.coverPhoto || !!errors.profilePhoto || !!errors.name || !!errors.bio || !!errors.languages;
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(profileData: CurrentProfileData) {
        setIsLoading(true);

        const files: File[] = [];
        const folders = [];

        if(profileData.coverPhoto?.file) {
            folders.push("covers");
            files.push(profileData.coverPhoto?.file)
        } else if(profileData.profilePhoto?.file!) {
            folders.push("avatars");
            files.push(profileData.profilePhoto?.file!);
        }

        const updatedProfile = {
            name: profileData.name,
            bio: profileData.bio,
            languages: profileData.languages,
            coverPhoto: "",
            profilePhoto: ""
        }

        const compressionOptions = {
            avatars: {
                maxSizeMB: 0.2,           
                maxWidthOrHeight: 300,    
                useWebWorker: true,       
                initialQuality: 0.7 
            },
            covers: {
                maxSizeMB: 1,           
                maxWidthOrHeight: 1280,   
                useWebWorker: true,
                initialQuality: 0.8       
            }
        }

        if(files.length > 0) {
            const fileData = { bucket: "user-images", folders: folders, id: userID };
            const filePaths = await uploadFiles(fileData, files, "user-images", compressionOptions);
            
            if(folders.includes("covers")) {
                updatedProfile.coverPhoto = filePaths.find((path) => path.includes("covers"))!;
            }

            if(folders.includes("avatars")) {
                updatedProfile.profilePhoto = filePaths.find((path) => path.includes("avatars"))!;
            }
        }

        await sendAuthenticatedHTTPRequest("/profiles/me", "PUT", updatedProfile);
        await refetch?.(); // refresh the data on the page so that the data stored in the query client cache is fresh
        // NOTE: refetch() is used instead of invalidateQueryClient() since hooks can only be called in components

        closeButtonHandler();
        setIsLoading(false);
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
                            <button className={styles.save_button} type="submit" disabled={hasErrors || isLoading}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}