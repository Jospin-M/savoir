import Profile from "./profile.tsx";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProfileData, getLanguages } from "../../../lib/queryFunctions.ts";

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