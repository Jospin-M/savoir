import SkillsHeader from "./SkillsHeader";
import { Empty, Populated } from "./States";

import styles from "./Skills.module.css";

import type { Skill } from "../../../lib/queryFunctions";
import { useSkillData } from "../../hooks/useSkillsData";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { sendAuthenticatedHTTPRequest } from "../../../lib/utils";

export default function SkillsContent() {
    const { skillsQuery: { skills } } = useSkillData();
    const isEmpty = skills?.length === 0; 
    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: async (updatedSkills: Skill[]) => {
            return await sendAuthenticatedHTTPRequest("/skills", "POST", updatedSkills)
        },

        onMutate: async function(updatedSkills: Skill[]) {
            await queryClient.cancelQueries({ queryKey: ["profileSkills"] });

            // snapshot the previous data
            const previousSkills = queryClient.getQueryData(["profileSkills"]);

            // optimistically update the cache 
            queryClient.setQueryData(["profileSkills"], () => updatedSkills);

            // return context value with snapshotted data
            return { previousSkills };

        },

        // roll back on mutation fail
        onError: (_err, _updateSkills, context) => {
            queryClient.setQueryData(["profileSkills"], context?.previousSkills);
        },

        // trigger a refetch to update the cache after we have sent the request
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["profileSkills"] });
        }
    });
    
    // this is where we'll check for location change, before using useMutate to send a request
    // once this functionality is working, generalize it into a method and move
    // it to utils.ts. then, after the check has been completed, a call will be made to this method
    // repeat the last step for the profile page 

    return (
        <div className={styles.page_content}>
            <SkillsHeader />

            {isEmpty ? <Empty />: <Populated />}
        </div>
    );
}