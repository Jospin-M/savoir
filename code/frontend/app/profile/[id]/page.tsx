import Profile from "./profile.tsx";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { sendAuthenticatedHTTPRequest } from "../../../lib/utils.ts";
import { createClient } from "../../../utils/supabase/server.ts";

async function getSupabaseSession(): Promise<string> {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    return session?.access_token!;
}

async function getProfileData(id: string)  {
    return await sendAuthenticatedHTTPRequest(`/profile/${id}`, "GET", {}, await getSupabaseSession());
}

async function getLanguages() {
    return await sendAuthenticatedHTTPRequest("/reference/languages", "GET", {}, await getSupabaseSession());
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