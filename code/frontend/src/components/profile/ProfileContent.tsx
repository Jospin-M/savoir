import Sidebar from "./sidebar/Sidebar";
import ProfileHeader from "./ProfileHeader";
import { Stars } from "../skills/SkillListing";

import styles from "./Profile.module.css";
import skillStyles from "../skills/Skills.module.css"
import commonStyles from "../common/Common.module.css";

import { useRouter } from "next/navigation";
import { useData } from "../../hooks/useQueryClient";

import { type Skill, getAuthenticatedUserSkills } from "../../../lib/queryFunctions";

function SkillPreviews() {
    const previews: React.JSX.Element[] = [];

    const router = useRouter();
    const { data: skills } = useData<Skill[]>(["user-skills"], getAuthenticatedUserSkills);

    skills.forEach((skill) => {
        previews.push(
            <div className={skillStyles.profile_skill_card} key={skill.id}>
                <div className={skillStyles.profile_skill_card_header}>
                    <h3>{skill.name}</h3>
                </div>

                <div className={skillStyles.profile_skill_level}>
                    {skill.level}
                </div>

                <div className={skillStyles.profile_skill_rating}>
                    <Stars starsToColor={4.3}/> 

                    <span>
                        4.5
                    </span>
                </div>
            </div>
        );
    });

    return (
        <div className={skillStyles.profile_skills_grid}>
            {previews}

            <div className={skillStyles.profile_add_skill} onClick={() => router.push("/skills")}>
                <i className="ri-add-circle-line"/>

                <span>Add New Skill</span>
            </div>
        </div>
    );
}

export default function ProfileContent() {
    return (
        <div className={commonStyles.page_content}>
            <ProfileHeader />

            <div className={styles.profile_content}>
                <Sidebar />

                <div className={styles.profile_main}>
                    <div className={styles.card}>
                        <div className={styles.card_header}>
                            <h2>Skills</h2>
                        </div>

                        <SkillPreviews />
                    </div>
                </div>
            </div>
        </div>
    );
}