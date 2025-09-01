"use server"

import { revalidateTag } from "next/cache";

/**
 * Invalidates the user data that was previously cached by the server so that the next time
 * the page is rendered, it is hydrated with the most recent data.
 */
export async function updateUser() {
    revalidateTag("user-profile");
}

/**
 * Invalidates the user's skill data that was previously cached by the server so that the next time
 * the page is rendered, it is hydrated with the most recent data.
 */
export async function updateSkills() {
    revalidateTag("user-skills");
}