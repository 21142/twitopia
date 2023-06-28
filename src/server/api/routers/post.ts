import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { addUserDataToPost, filterUserForClient } from "~/lib/utils";
import { z } from "zod";
import { ratelimit } from "~/lib/ratelimit";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: {
        createdAt: "desc"
      }
    })

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100
    })).map(filterUserForClient);


    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author || !author.username) throw new TRPCError({ code: "NOT_FOUND", message: "Author not found" });

      return {
        post,
        author: {
          ...author,
          username: author.username
        }
      }
    });
  }),

  getPostById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: {
        id: input.id
      }
    })

    if (!post) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" })
    }

    return (await addUserDataToPost([post]))[0];
  }),

  getPostsByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        authorId: input.userId
      },
      take: 100,
      orderBy: {
        createdAt: "desc"
      }
    })

    if (!posts) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Posts not found" })
    }

    return addUserDataToPost(posts);
  }),

  create: protectedProcedure.input(z.object({
    content: z.string().emoji("Only emojis are welcome").min(1).max(280),
    authorId: z.string()
  })).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;

    const { success } = await ratelimit.limit(authorId)
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Rate limited" });

    const post = await ctx.prisma.post.create({
      data: {
        content: input.content,
        authorId
      }
    });

    return post;
  })
});
