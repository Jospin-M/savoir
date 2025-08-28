import styles from "./Modal.module.css";

import type { ControllerRenderProps, FieldErrors, FieldValues, Path } from "react-hook-form";

export function InputField<T extends FieldValues>({ inputTitle, field, errors }: 
    { inputTitle: string, field: ControllerRenderProps<T, Path<T>>, errors: FieldErrors 
}) {
    return (
        <div className={styles.form_group}>
            <label htmlFor="input_field">{inputTitle}</label>

            <input 
                type="text"
                id="input_field"
                name={field.name}
                className={styles.form_control}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                onBlur={field.onBlur}
            />

            {errors[field.name] && <p className={styles.error_message}>{errors[field.name]?.message as string}</p>}
        </div>
    );
}

export function TextareaField<T extends FieldValues>({ textareaTitle, field, maxLength }: {
    textareaTitle: string, field: ControllerRenderProps<T, Path<T>>, maxLength: number
}) {
    return (
        <div className={styles.form_group}>
            <label htmlFor="textarea_field">{textareaTitle}</label>

            <textarea
                id="textarea_field"
                name={field.name}
                className={styles.form_control} 
                maxLength={maxLength} 
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
            />
        </div>
    );
}