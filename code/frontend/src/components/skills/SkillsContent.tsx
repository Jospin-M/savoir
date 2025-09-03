import SkillsHeader from "./SkillsHeader";
import { Empty, Populated } from "./States";

import styles from "./Skills.module.css";

import { useSkillData } from "../../hooks/useSkillsData";

export default function SkillsContent() {
    const { skillsQuery: { skills } } = useSkillData();
    const isEmpty = skills?.length === 0; 

    // this is where we'll check for location change, before using useMutate to send a request
    // THE SERVER SHOULD USE AN RPC INSTEAD OF A NORMAL INSERT SINCE WE WANT TO KEEP ONLY THOSE
    // SKILLS THE USER SENT
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