import { UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import CreatePost from '~/components/CreatePost';
import PostsFeed from '~/components/PostsFeed';

export default function Home() {
  const { user, isSignedIn } = useUser();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Twitopia</title>
        <meta
          name="description"
          content="Twitopia"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-zinc-100 p-4 md:max-w-2xl">
          <div className="flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </div>
          <h1 className="py-6 text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Twit<span className="text-[hsl(280,100%,70%)]">opia</span>
          </h1>
          <div className="flex border-b border-slate-400 p-4">
            {isSignedIn && <CreatePost />}
          </div>
          <PostsFeed />
        </div>
      </main>
    </>
  );
}
