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
      <PageLayout>
        <div className="flex border-b border-slate-400 p-4 text-[hsl(280,99%,70%)]">
          @{data.username ?? ''}
        </div>
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
