import StandardModal from "../../common/modal/StandardModal";
import SectionTitle from "../../common/modal/SectionTitle";
import { Name, Categories, Levels, Description, Prerequsites, Materials } from "./Textfields";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendAuthenticatedHTTPRequest } from "../../../../lib/utils";

export type CurrentSkillData = {
    name: string
    category_id: number
    level: string
    description: string
    prerequisites: string
    materials_needed: string
};

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const defaultValues: CurrentSkillData = {
        name: "",
        category_id: 0,
        level: "",
        description: "",
        prerequisites: "",
        materials_needed: ""
    };
    
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: defaultValues });
    
    async function onSubmit(skillData: CurrentSkillData) {
        setIsLoading(true);

        await sendAuthenticatedHTTPRequest("/skills", "POST", skillData);
        // call to refetch() will be placed here to update ui with new skill
        
        closeButtonHandler();
        setIsLoading(false);
    }

    const hasErrors = !!errors.name || !!errors.category_id || !!errors.level || !!errors.description; 
    const isDisabled = hasErrors || isLoading || !isDirty;

    return (
        <StandardModal
            title={"Add New Skill"}
            onClose={closeButtonHandler}
            onSubmit={handleSubmit(onSubmit)}
            isDisabled={isDisabled}
        >
            <SectionTitle sectionName="Skill Information" />
            <Name control={control} errors={errors}/>
            <Categories control={control} errors={errors}/>
            <Levels control={control} errors={errors} />
            <Description control={control} errors={errors} />
            
            <SectionTitle sectionName="Additional Details" />
            <Prerequsites control={control} errors={errors} />
            <Materials control={control} errors={errors} />
        </StandardModal>
    );
}