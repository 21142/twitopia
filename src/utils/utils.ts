import { type User } from "@clerk/nextjs/dist/types/server";

export const filterUserForClient = (user: User) => {
   return {
      id: user.id,
      username: user.username ?? user.firstName?.concat(" ").concat(user.lastName ?? ""),
      profileImageUrl: user.profileImageUrl,
   }
};