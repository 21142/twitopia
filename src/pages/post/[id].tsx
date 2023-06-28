import { TRPCError } from '@trpc/server';
import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next';
import Head from 'next/head';
import PageLayout from '~/components/PageLayout';
import Posts from '~/components/Posts';
import { api } from '~/lib/api';
import { prisma } from '~/lib/db';
import { ssghelpers } from '~/lib/ssg';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<PageProps> = ({ id }) => {
  const { data, isLoading } = api.post.getPostById.useQuery({ id });

  if (isLoading) {
    console.log('POST DATA LOADING!!!');
  }

  if (!data) return <div>No post retrieved</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} • ${data.author.username}`}</title>
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
        <div className="flex justify-center p-4 text-[3rem]">
          {data.post.content}
        </div>
        <Posts {...data} />
      </PageLayout>
    </>
  );
};

export default PostPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id as string;
  if (!id)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Post not found for id',
    });

  await ssghelpers.post.getPostById.prefetch({ id });

  return {
    props: {
      trpcState: ssghelpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  if (!posts) return { paths: [], fallback: 'blocking' };

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    fallback: 'blocking',
  };
};
