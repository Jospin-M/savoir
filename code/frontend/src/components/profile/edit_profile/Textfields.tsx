import type { CurrentProfileData } from "./EditProfileModal.tsx";
import { InputField, TextareaField } from "../../common/modal/Input.tsx";

import { Controller, type Control, type FieldErrors } from "react-hook-form";

export default function Textfields({ control, errors }: { control: Control<CurrentProfileData>, errors: FieldErrors<CurrentProfileData> }) {
    return (
        <div>
            <Controller 
                name="name"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field }) => (
                    <InputField inputTitle="Full Name" field={field} errors={errors}/>
                )}
            />

            <Controller 
                name="bio"
                control={control}
                render= {({ field }) => (
                    <TextareaField textareaTitle="Bio" field={field} maxLength={230}/>
                )}
            />
        </div>
    );
}