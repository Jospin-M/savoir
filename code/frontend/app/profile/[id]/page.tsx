import Profile from "./profile.tsx";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { sendAuthenticatedHTTPRequest } from "../../../lib/utils.ts";
import { getSupabaseSession } from "../../../utils/supabase/server.ts";

async function getProfileData(id: string)  {
    return await sendAuthenticatedHTTPRequest(`/profiles/${id}`, "GET", {}, await getSupabaseSession());
}

async function getLanguages() {
    return await sendAuthenticatedHTTPRequest("/references/languages", "GET", {}, await getSupabaseSession());
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } =  await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["profileData", id],
        queryFn: () => getProfileData(id)
    });

    await queryClient.prefetchQuery({
        queryKey: ["languages"],
        queryFn: () => getLanguages()
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Profile/>
        </HydrationBoundary>
    );
}