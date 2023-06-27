import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { filterUserForClient } from "~/lib/utils";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
   getUserById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.id);


      if (!user) {
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User not found" })
      }

      return filterUserForClient(user);
   }),
});
