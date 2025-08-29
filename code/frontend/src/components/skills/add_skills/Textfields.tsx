import { DropdownField, InputField } from "../../common/modal/Input";

import type { CurrentSkillData } from "./AddSkillModal";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

export function Name({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    return (
        <Controller 
            name="name"
            control={control}
            rules={{ required: "Skill name is required" }}
            render={({ field }) => (
                <InputField inputTitle="Name" field={field} errors={errors} />
            )}
        />
    );
}

export function Categories({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    return (
        <Controller 
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
                <DropdownField dropdownTitle="Category" field={field} errors={errors} options={["Coding"]}/>
            )}
        />
    );
}