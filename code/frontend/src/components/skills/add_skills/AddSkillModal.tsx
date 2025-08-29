import StandardModal from "../../common/modal/StandardModal";
import SectionTitle from "../../common/modal/SectionTitle";
import { Name, Categories, Levels, Description, Prerequsites, Materials } from "./Textfields";

import { useForm } from "react-hook-form";

export type CurrentSkillData = {
    name: string
    category: string
    level: string
    description: string
    prerequisites: string
    materialsNeeded: string
};

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const defaultValues: CurrentSkillData = {
        name: "",
        category: "",
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
    
    return (
        <StandardModal
            title={"Add New Skill"}
            onClose={closeButtonHandler}
            onSubmit={() => {}}
            isDisabled={true}
        >
            <SectionTitle sectionName="Skill Information" />
            <Name control={control} errors={errors}/>
            <Categories control={control} errors={errors} />
            <Levels control={control} errors={errors} />
            <Description control={control} errors={errors} />

            <SectionTitle sectionName="Additional Details" />
            <Prerequsites control={control} errors={errors} />
            <Materials control={control} errors={errors} />
        </StandardModal>
    );
}