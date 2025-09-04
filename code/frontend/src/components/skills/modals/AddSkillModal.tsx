import SectionTitle from "../../common/modal/SectionTitle";
import StandardModal from "../../common/modal/StandardModal";
import { Name, Categories, Levels, Description, Prerequsites, Materials } from "./Textfields";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSkillData } from "../../../hooks/useSkillsData";
import type { Skill } from "../../../../lib/queryFunctions";
import { useUserStore } from "../../../stores/useUserStore";

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    const userID = useUserStore(state => state.userID)!;
    const [isLoading, setIsLoading] = useState(false);
    const { addSkill } = useSkillData();
    const defaultValues: Skill = {
        id: -1, // this is a placeholder (it's required for the RPC to work), when the skill is sent to the database, it receives a proper id
        user_id: userID,
        name: "",
        category_id: 1,
        level: "",
        description: "",
        prerequisites: "",
        materials_needed: "",
        active: true
    };
    
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: defaultValues });
    
    // onSubmit should only make local updates to the cache
    async function onSubmit(skillData: Skill) {
        setIsLoading(true);

        addSkill(skillData);
        // don't forget to call this function in the mutation function on useMutate call
        //await updateSkills();
        
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