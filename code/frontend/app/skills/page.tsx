import Skills from "./skills";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCategories } from "../../lib/serverQueryFunctions";

export default async function SkillsPage() {
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories()
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Skills />
      </HydrationBoundary>
   );
}