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

/**
 * Determines whether the fields on the authentication page meet the minimum length.
 * 
 * @param form - the username and password input fields
 */
export function validateAuthForm(form: { email: string, password: string }): boolean {
    const validEmail = validateEmail(form.email);
    const validPassword = validateInputLength(form.password, 8);
    
    return !(validEmail && validPassword);
}

/**
 * Determine whether an email matches the expected format.
 * 
 * @param email  - the email entered by the user
 */
function validateEmail(email: string): boolean {
    // handle cases where mail server has a TLD of 2 or 3 characters

    const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]{2}$/; 
    const emailRegex3 = /^[^\s@]+@[^\s@]+\.[^\s@]{3}$/;

    return emailRegex2.test(email) || emailRegex3.test(email);
}

/**
 * Determine whether the fields on the sign up page match the expected format.
 * 
 * @param form - the values full name, email, and password input fields
 */
export function validateSignUpForm(form: { fullName: string, email: string, password: string }): boolean {
    const validName = validateInputLength(form.fullName, 1);
    const validEmail = validateEmail(form.email);
    const validPassword = validateInputLength(form.password, 8);
    
    console.log("valid name: ", validName, "valid email: ", validEmail, "valid password: ", validPassword)

    return !(validName && validEmail && validPassword);
}

// LOOK INTO ZOD FOR INPUT VALIDATION WITH DATABASE