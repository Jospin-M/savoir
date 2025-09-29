export function validateFileSize(value: { file: File | null, url: string | undefined} | null) {
    if(value?.file) {
        if(value.file.size >= 5e6) {
            return "File too large. Maximum allowed size is 5MB."
        }
    }

    return true;
}