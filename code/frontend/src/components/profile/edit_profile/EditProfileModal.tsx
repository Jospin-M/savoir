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
    coverPhoto: { file: File | null, url: string | undefined } | null,
    profilePhoto: { file: File | null, url: string | undefined } | null,
    name: string | undefined,
    bio: string | undefined,
    languages: LanguageItem[] | undefined
}

/**
 * Prepares file data for upload based on the user’s profile information. 
 * 
 * @param profileData - the user’s profile data object. It may include optional 
 * coverPhoto and profilePhoto entries, each of which can hold a File object.
 * 
 * @returns two parallel arrays: one containing the files themselves and one containing 
 * the corresponding storage folder names.
 */
function initializeFiles(profileData: CurrentProfileData): [File[], string[]] {
    const files: File[] = [];
    const folders = []; // represents the folders within the storage bucket that the files will go into

    if(profileData.coverPhoto?.file) {
        folders.push("covers");
        files.push(profileData.coverPhoto?.file)
    } 
    
    if(profileData.profilePhoto?.file!) {
        folders.push("avatars");
        files.push(profileData.profilePhoto?.file!);
    }

    return [files, folders];
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const { profileQuery: { data, refetch }, userID } = useProfileData();
    
    async function onSubmit(profileData: CurrentProfileData) {
        setIsLoading(true);

        const updatedProfile = {
            name: profileData.name,
            bio: profileData.bio,
            languages: profileData.languages,
            coverPhoto: "",
            profilePhoto: ""
        };

        const [files, folders] = initializeFiles(profileData);
        const fileData = { bucket: "user-images", folders: folders, id: userID };
        const compressionOptions = {
            avatars: { maxSizeMB: 0.2, maxWidthOrHeight: 300, useWebWorker: true, initialQuality: 0.7 },
            covers: { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true, initialQuality: 0.8 }
        };

        if(files.length > 0) { 
            const filePaths = await uploadFiles(fileData, files, "user-images", compressionOptions);
            
            if(folders.includes("covers")) {
                updatedProfile.coverPhoto = filePaths.find((path) => path.includes("covers"))!;
            }
            
            if(folders.includes("avatars")) {
                updatedProfile.profilePhoto = filePaths.find((path) => path.includes("avatars"))!;
            } 
        } else {
            updatedProfile.coverPhoto = data?.coverPhoto.path!;
            updatedProfile.profilePhoto = data?.profilePhoto.path!;
        }

        await sendAuthenticatedHTTPRequest("/profiles/me", "PUT", updatedProfile);
        await refetch?.(); // refresh the data on the page so that the data stored in the query client cache is fresh
        // NOTE: refetch() is used instead of invalidateQueryClient() since hooks can only be called in components

        closeButtonHandler();
        setIsLoading(false);
    }
    
    // pre-populate fields with data provided by Context
    const defaultValues: CurrentProfileData = { 
        coverPhoto: { file: null, url: data?.coverPhoto!.url }, 
        profilePhoto: { file: null, url: data?.profilePhoto.url }, 
        name: data?.fullName, 
        bio: data?.bio, 
        languages: data?.languages
    };
    
    const { 
        control,
        handleSubmit, 
        formState: { errors }
    } = useForm({ defaultValues: defaultValues });
    
    const hasErrors = !!errors.coverPhoto || !!errors.profilePhoto || !!errors.name || !!errors.bio || !!errors.languages;
 
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