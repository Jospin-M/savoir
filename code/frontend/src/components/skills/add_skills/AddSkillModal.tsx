import StandardModal from "../../common/modal/StandardModal";
import SectionTitle from "../../common/modal/SectionTitle";
import { Name, Categories } from "./Textfields";

import { useForm } from "react-hook-form";

export type CurrentSkillData = {
    name: string
    category: string
};

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const defaultValues: CurrentSkillData = {
        name: "",
        category: ""
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
        </StandardModal>
    );
}