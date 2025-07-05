import { type ChangeEventHandler }   from "react";

/**
 * Provides a custom hook that dynamically updates the variables managing a form's state.
 * 
 * @param useStateHook an instance of the useState hook
 * @returns a stateful value, and a function to update it.
 */
export function useForm<T>(useStateHook: [T, React.Dispatch<React.SetStateAction<T>>]) {
    const [form, setForm] = useStateHook;

    function saveInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // TODO: learn about custom hooks to find more efficient way to maintain state

    type UseFormHook = [
        form: T,
        saveInput: ChangeEventHandler<HTMLInputElement>
    ]
    const hook: UseFormHook = [form, saveInput];

    return hook; 
}

