import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { type Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const filterUserForClient = (user: User) => {
   return {
      id: user.id,
      username: user.username ?? user.firstName?.concat(" ", user.lastName ?? ""),
      profileImageUrl: user.profileImageUrl,
      externalUsername: user.externalAccounts.find((externalAccount) => externalAccount.provider === "oauth_github")?.username || null
   }
};

export const formatRelativeTimeFrom = (date: Date): string => {
   return dayjs(date).fromNow();
}

export const addUserDataToPost = async (posts: Post[]) => {
   const userId = posts.map((post) => post.authorId);
   const users = (
      await clerkClient.users.getUserList({
         userId: userId,
         limit: 110,
      })
   ).map(filterUserForClient);

   return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author) {
         console.error("AUTHOR NOT FOUND", post);
         throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
         });
      }
      if (!author.username) {
         if (!author.externalUsername) {
            throw new TRPCError({
               code: "INTERNAL_SERVER_ERROR",
               message: `Author has no GitHub Account: ${author.id}`,
            });
         }
         author.username = author.externalUsername;
      }
      return {
         post,
         author: {
            ...author,
            username: author.username ?? "(username not found)",
         },
      };
   });
};