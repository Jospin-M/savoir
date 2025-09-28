"use server"

import { revalidateTag as revalidate } from "next/cache";

/**
 * Invalidates the user data that was previously cached by the Next server so that the next time
 * the page is rendered, it is hydrated with the most recent data.
 */
export async function revalidateTag(tag: string) {
    revalidate(tag);
}