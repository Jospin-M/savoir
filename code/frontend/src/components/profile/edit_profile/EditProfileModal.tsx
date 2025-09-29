import StandardModal from "../../common/modal/StandardModal.tsx";
import { CoverPhoto, ProfilePhoto } from "./Photos.tsx";
import Textfields from "./Textfields.tsx";
import Languages from "./Languages.tsx";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { uploadFiles } from "../../../../lib/utils.ts";
import { useProfileData } from "../../../hooks/useProfileData.ts";
import type { ProfileLanguageItem } from "../../../../lib/queryFunctions.ts";

type FileData = { 
    file: File | null;
    url: string | undefined;
    location: string | undefined;
}

export type CurrentProfileData = {
    coverPhoto:  FileData | null,
    profilePhoto: FileData | null,
    name: string | undefined,
    bio: string | undefined,
    languages: ProfileLanguageItem[] | undefined
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
function initializeFiles(coverPhoto: FileData, profilePhoto: FileData): [File[], string[]] {
    const files: File[] = [];
    const folders = []; // represents the folders within the storage bucket that the files will go into

    if(coverPhoto.file) {
        folders.push("covers");
        files.push(coverPhoto.file)
    } 
    
    if(profilePhoto.file) {
        folders.push("avatars");
        files.push(profilePhoto?.file);
    }

    return [files, folders];
}

export default function EditProfileModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const { profileQuery: { data }, userID, updateProfile } = useProfileData();

    async function onSubmit(profileData: CurrentProfileData) {
        setIsLoading(true);
        
        const updatedProfile = {
            name: profileData.name!,
            bio: profileData.bio!,
            languages: profileData.languages!,
            coverPhoto: "",
            profilePhoto: ""
        };

        const [files, folders] = initializeFiles(profileData.coverPhoto!, profileData.profilePhoto!);
        const fileData = { bucket: "user-images", folders: folders, id: userID };
        const compressionOptions = {
            avatars: { maxSizeMB: 0.2, maxWidthOrHeight: 300, useWebWorker: true, initialQuality: 0.7 },
            covers: { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true, initialQuality: 0.8 }
        };

        if(files.length > 0) {
            const filePaths = await uploadFiles(fileData, files, "user-images", compressionOptions);
            
            if(folders.includes("covers")) {
                updatedProfile.coverPhoto = filePaths.find((path) => path.includes("covers"))!;
            } else {
                updatedProfile.coverPhoto = data?.coverPhoto.location as string;
            }
            
            if(folders.includes("avatars")) {
                updatedProfile.profilePhoto = filePaths.find((path) => path.includes("avatars"))!;
            } else {
                updatedProfile.profilePhoto = data?.profilePhoto.location as string;
            }
        } else {
            updatedProfile.coverPhoto = data?.coverPhoto.location as string;
            updatedProfile.profilePhoto = data?.profilePhoto.location as string;
        } 

        updateProfile?.(updatedProfile, {
            fullName: profileData.name!,
            bio: profileData.bio!,
            profilePhoto: { url: profileData.profilePhoto?.url, location: profileData.profilePhoto?.url },
            coverPhoto: { url: profileData.coverPhoto?.url, location: profileData.coverPhoto?.url },
            languages: profileData.languages!
        });
        
        closeButtonHandler();
        setIsLoading(false);
    }
    
    // pre-populate fields with data provided by Context
    const defaultValues: CurrentProfileData = { 
        coverPhoto: { file: null, url: data?.coverPhoto!.url, location: data?.coverPhoto!.location }, 
        profilePhoto: { file: null, url: data?.profilePhoto.url, location: data?.profilePhoto!.location  }, 
        name: data?.fullName, 
        bio: data?.bio, 
        languages: data?.languages
    };
    
    const { 
        control,
        handleSubmit, 
        formState: { errors, isDirty }
    } = useForm({ defaultValues: defaultValues });
    
    const hasErrors = !!errors.coverPhoto || !!errors.profilePhoto || !!errors.name || !!errors.bio || !!errors.languages;
    const isDisabled = hasErrors || isLoading || !isDirty;
 
    return (
        <StandardModal
            title={"Edit Profile"}
            onClose={closeButtonHandler} 
            onSubmit={handleSubmit(onSubmit)}
            isDisabled={isDisabled}
        >
            <CoverPhoto control={control} errors={errors}/>
            <ProfilePhoto control={control} errors={errors}/>
            <Textfields control={control} errors={errors}/>
            <Languages control={control} errors={errors}/>
        </StandardModal>
    );
}