import SectionTitle from "../../common/modal/SectionTitle";
import StandardModal from "../../common/modal/StandardModal";
import { Name, Categories, Levels, Description, Prerequsites, Materials } from "./Textfields";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSkillData } from "../../../hooks/useSkillsData";
import type { Skill } from "../../../../lib/queryFunctions";

export default function EditSkillModal({ skill, closeButtonHandler }: { 
    skill: Skill,
    closeButtonHandler: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const defaultValues: Skill = { ...skill };
    const { updateSkill } = useSkillData();

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: defaultValues });
    
    async function onSubmit(skillData: Skill) {
        setIsLoading(true);

        const newSkill = { 
            ...skillData, id: skill.id, category_id: skillData.category_id, active: skill.active! 
        };

        updateSkill(skill.id!, newSkill);
        
        closeButtonHandler();
        setIsLoading(false);
    }

    const hasErrors = !!errors.name || !!errors.category_id || !!errors.level || !!errors.description; 
    const isDisabled = hasErrors || isLoading || !isDirty;

    return (
        <StandardModal
            title={"Edit Skill"}
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