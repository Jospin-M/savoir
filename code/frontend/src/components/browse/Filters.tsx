import styles from "./Browse.module.css";

import { CheckboxField, DropdownField } from "../common/modal/Input";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

type SidebarState = {
    categoryID: number,
    skillLevel?: "Beginner" | "Intermediate" | "Advanced"
}

export function Filters() {
    // the reason we allow options to be disabled is so that the user can select
    // only those filters for which we have relevant entries in the database
    
    const categories = [{ id: 1, name: "All Categories", disabled: false }];
    const skillLevels = [
        { id: 1, name: "Beginner", disabled: true }, 
        { id: 2, name: "Intermediate", disabled: true }, 
        { id: 3, name: "Advanced", disabled: true }
    ];

    const sidebarState: SidebarState = {
        categoryID: categories[0].id
    }
    
    const { 
        control, 
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: sidebarState });

    return (
        <aside className={styles.sidebar}>
            <div className={styles.filter_section}>
                <h3>Categories</h3>

                <Controller
                    name="categoryID"
                    control={control}
                    render={({ field }) => (
                        <DropdownField dropdownTitle="" field={field} errors={errors} options={categories}/>
                    )}
                />
            </div>

            <div className={styles.filter_section}>
                <h3>Skill Level</h3>

                <Controller
                    name="skillLevel"
                    control={control}
                    render={({ field }) => (
                        <CheckboxField  field={field} options={skillLevels}/>
                    )}
                />
            </div>
        </aside>
    );
}