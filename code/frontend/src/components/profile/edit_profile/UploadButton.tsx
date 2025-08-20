import styles from "./EditProfile.module.css";


import { useRef } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import type { CurrentProfileData } from "./EditProfileModal.tsx";

type UploadProps = {
    promptText: string, 
    field: ControllerRenderProps<CurrentProfileData, "coverPhoto" | "profilePhoto">
}

export default function UploadButton({ promptText, field }: UploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    return (
        <div>
            <button className={styles.upload_button} onClick={(e) => {
                e.preventDefault();
                fileInputRef?.current?.click();
            }}>
                <i className={"ri-image-add-line"}>
                    {` ${promptText} `}
                </i>
            </button>

            <input 
                id={"photo"}
                name={field.name}
                type="file" 
                accept="image/*"
                ref={fileInputRef} 
                style={{ display: "none" }}
                onChange={(e) => {
                    // Update the field with the user's selection
                    if(e.target) {
                        const file = e.target.files ? e.target.files[0] : undefined

                        if(file) {
                            const url = URL.createObjectURL(file);

                            field.onChange({ file: file, url: url});
                        }
                    }
                }}
            />
        </div>
    );
}