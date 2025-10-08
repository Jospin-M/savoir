import Profile from "./profile.tsx";

import { getQueryClient } from "../../getQueryClient.tsx";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getProfileData, getLanguages, getAuthenticatedUserSkills } from "../../../lib/queryFunctions.ts";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } =  await params;
    const queryClient = getQueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ["user-profile", id],
        queryFn: () => getProfileData(id)
    });

    await queryClient.prefetchQuery({
        queryKey: ["languages"],
        queryFn: () => getLanguages()
    });

    await queryClient.prefetchQuery({
        queryKey: ["user-skills"],
        queryFn: () => getAuthenticatedUserSkills()
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Profile/>
        </HydrationBoundary>
    );
}