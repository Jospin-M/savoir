import Skills from "./skills";

import { getAuthenticatedUserSkills } from "../../lib/queryFunctions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../getQueryClient";

export default async function SkillsPage() {
   const queryClient = getQueryClient();
   
   await queryClient.prefetchQuery({
      queryKey: ["user-skills"],
      queryFn: () => getAuthenticatedUserSkills()
   });
   
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Skills />
      </HydrationBoundary>
   );
}