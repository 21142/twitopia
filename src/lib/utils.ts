import { type User } from "@clerk/nextjs/dist/types/server";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const filterUserForClient = (user: User) => {
   return {
      id: user.id,
      username: user.username ?? user.firstName?.concat(" ", user.lastName ?? ""),
      profileImageUrl: user.profileImageUrl,
   }
};

export const formatRelativeTimeFrom = (date: Date): string => {
   return dayjs(date).fromNow();
}