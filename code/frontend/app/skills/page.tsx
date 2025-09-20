import Skills from "./skills";

import { getAuthenticatedUserSkills } from "../../lib/queryFunctions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function SkillsPage() {
   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: Infinity,
            gcTime: Infinity
         }
      }
   });

   await queryClient.prefetchQuery({
      queryKey: ["profileSkills"],
      queryFn: () => getAuthenticatedUserSkills()
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Skills />
      </HydrationBoundary>
   );
}