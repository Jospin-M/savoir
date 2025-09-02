import { DropdownField, InputField, RadioGroup, TextareaField } from "../../common/modal/Input";
import type { CurrentSkillData } from "./AddSkillModal";

import { useSkillData } from "../../../hooks/useSkillsData";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

export function Name({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    return (
        <Controller 
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
                <InputField inputTitle="Name" field={field} errors={errors} maxLength={22} />
            )}
        />
    );
}

export function Categories({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    const { categories } = useSkillData();
    
    return (
        <Controller 
            name="category_id"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
                <DropdownField dropdownTitle="Category" field={field} errors={errors} options={categories}/>
            )}
        />
    );
}

export function Levels({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    return (
        <Controller 
            name="level"
            control={control}
            rules={{ required: "Level is required" }}
            render={({ field }) => (
                <RadioGroup radioTitle="Level" field={field} errors={errors} options={["Beginner", "Intermediate", "Advanced"]}/>
            )}
        />
    );
}

export function Description({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    const placeholderText = "Describe what you'll teach and what learners can expect...";
    
    return (
        <Controller 
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
                <TextareaField textareaTitle="Description" field={field} errors={errors} maxLength={250} placeholder={placeholderText}/>
            )}
        />
    );
}

export function Prerequsites({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    const placeholderText = "e.g., Basic knowledge helpful but not required"; 

    return (
        <Controller 
            name="prerequisites"
            control={control}
            render={({ field }) => (
                <InputField inputTitle="Prequisites" field={field} errors={errors} placeholder={placeholderText}/>
            )}
        />
    );
}

export function Materials({ control, errors }: { control: Control<CurrentSkillData>, errors: FieldErrors<CurrentSkillData> }) {
    const placeholderText = "e.g., Supplies to follow along, good workspace";
    
    return (
        <Controller 
            name="materials_needed"
            control={control}
            render={({ field }) => (
                <InputField inputTitle="Materials Needed" field={field} errors={errors} placeholder={placeholderText}/>
            )}
        />
    );
}