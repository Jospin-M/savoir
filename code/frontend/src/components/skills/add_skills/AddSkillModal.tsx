import StandardModal from "../../common/modal/StandardModal";
import SectionTitle from "../../common/modal/SectionTitle";
import { Name, Categories, Levels, Description, Prerequsites, Materials } from "./Textfields";

import { useForm } from "react-hook-form";

export type CurrentSkillData = {
    name: string
    category_id: number
    level: string
    description: string
    prerequisites: string
    materialsNeeded: string
};

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const defaultValues: CurrentSkillData = {
        name: "",
        category_id: 0,
        level: "",
        description: "",
        prerequisites: "",
        materialsNeeded: ""
    };
    
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: defaultValues });
    
    function onSubmit(skillData: CurrentSkillData) {
        console.log(skillData)
    }

    const hasErrors = !!errors.name || !!errors.category_id || !!errors.level || !!errors.description; 
    const isDisabled = hasErrors || !isDirty;

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