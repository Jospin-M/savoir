/**
 * Validates the length of the user's input.
 * 
 * @param input - the user input to validate
 * @param minLength - the minimum length of the user's input
 * @returns True if the input is greater than the minimum length, false otherwise.
 */
export function validateInputLength(input: string, minLength: number): boolean {
    return input.length >= minLength;
}