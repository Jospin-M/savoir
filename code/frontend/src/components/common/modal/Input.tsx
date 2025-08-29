import styles from "./Modal.module.css";

import type { ControllerRenderProps, FieldErrors, FieldValues, Path } from "react-hook-form";

export function SaveButton({ isDisabled } : { isDisabled: boolean }) {
    return (
        <div className={styles.modal_footer}>
            <button className={styles.save_button} type="submit" disabled={isDisabled}>
                Save
            </button>
        </div>
    );
}

export function InputField<T extends FieldValues>({ inputTitle, field, errors, placeholder }: 
    { inputTitle: string, field: ControllerRenderProps<T, Path<T>>, errors: FieldErrors, placeholder?: string 
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
                placeholder={placeholder}
            />

            {errors[field.name] && <p className={styles.error_message}>{errors[field.name]?.message as string}</p>}
        </div>
    );
}

export function TextareaField<T extends FieldValues>({ textareaTitle, field, errors, maxLength, placeholder }: {
    textareaTitle: string, field: ControllerRenderProps<T, Path<T>>, errors: FieldErrors , maxLength: number, placeholder: string
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
                placeholder={placeholder}
                onChange={e => field.onChange(e.target.value)}
            />

            <div className={styles.char_count}>
                {field.value.length}/{maxLength} characters
            </div>

            {errors[field.name] && <p className={styles.error_message}>{errors[field.name]?.message as string}</p>}
        </div>
    );
}

export function DropdownField<T extends FieldValues>({ dropdownTitle,  field, errors, options }: 
    { dropdownTitle: string, field: ControllerRenderProps<T, Path<T>>, errors: FieldErrors, options: string[] 
}) {
    // options array should be populated with values from database, so request won't be needed since we can use queryClient
    // for populating category with value from the database, use same approach as in Languages
    return (
        <div className={styles.form_group}>
            <label htmlFor="dropdown_field">{dropdownTitle}</label>

            <select id="dropdown_field" className={styles.dropdown}>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

export function RadioGroup<T extends FieldValues>({ radioTitle,  field, errors, options }: 
    { radioTitle: string, field: ControllerRenderProps<T, Path<T>>, errors: FieldErrors, options: string[] 
}) {
    // options array should be populated with values from database, so request won't be needed since we can use queryClient
    // for populating category with value from the database, use same approach as in Languages
    return (
        <div className={styles.form_group}>
            <label htmlFor="radio_field">{radioTitle}</label>
            
            <div id="radio_field" className={styles.radio_option}>
                {options.map((opt) => (
                    <label key={opt} htmlFor={opt} className={styles.radio_group}>
                        <input key={opt} id={opt} type="radio" name="skill-level" value={opt} />
                        
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );
}