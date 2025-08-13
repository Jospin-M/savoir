import styles from "./EditProfile.module.css";


import { useRef } from "react";
import { type ControllerRenderProps } from "react-hook-form";

type UploadProps = {
    promptText: string, 
    field: ControllerRenderProps<any>
}

export default function UploadButton({ promptText, field}: UploadProps) {
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
                            field.onChange(url);
                        }
                    }
                }}
            />
        </div>
    );
}