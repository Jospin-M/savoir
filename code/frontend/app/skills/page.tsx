import Skills from "./skills";

import { getAuthenticatedUserSkills } from "../../lib/queryFunctions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../getQueryClient";
import { createClient } from "../../utils/supabase/server";

export default async function SkillsPage() {
   const queryClient = getQueryClient();

   const { data: { user } } = await (await createClient()).auth.getUser();
   const { id } = user!;
   
   await queryClient.prefetchQuery({
      queryKey: ["user-skills", id],
      queryFn: () => getAuthenticatedUserSkills()
   });
   
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Skills />
      </HydrationBoundary>
   );
}