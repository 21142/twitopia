import { clerkClient } from '@clerk/nextjs';
import { TRPCError } from '@trpc/server';
import {
  type InferGetStaticPropsType,
  type GetStaticPaths,
  type GetStaticPropsContext,
  type NextPage,
} from 'next';
import Head from 'next/head';
import PageLayout from '~/components/PageLayout';
import { api } from '~/lib/api';
import { ssghelpers } from '~/lib/ssg';
import Image from 'next/image';
import UserFeed from '~/components/UserFeed';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const UserProfilePage: NextPage<PageProps> = ({ userId }) => {
  const { data } = api.profile.getUserById.useQuery({ id: userId });

  if (!data) return <div>No user retrieved</div>;
  return (
    <>
      <Head>
        <title>{data.username}</title>
        <meta
          name="description"
          content="Twitopia"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageLayout className="bg-zinc-900">
        <div className="relative h-24 bg-zinc-900 p-4 text-[hsl(280,99%,70%)]">
          <Image
            src={data.profileImageUrl}
            className="border-full absolute bottom-0 left-0 -mb-[48px] ml-4 rounded-full border-4 border-black"
            width={128}
            height={128}
            alt={`${data.username ?? ''}'s profile picture`}
          />
        </div>
        <div className="h-[64px]" />
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? data.externalUsername ?? ''
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        <UserFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export default UserProfilePage;

export async function getStaticProps(context: GetStaticPropsContext) {
  const userId = context.params?.slug as string;
  if (!userId)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found for id',
    });

  await ssghelpers.profile.getUserById.prefetch({ id: userId });
  return {
    props: {
      trpcState: ssghelpers.dehydrate(),
      userId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await clerkClient.users.getUserList();
  return {
    paths: users.map((user) => ({
      params: {
        slug: user.id,
      },
    })),
    fallback: 'blocking',
  };
};
