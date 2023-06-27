import { UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';
import CreatePost from '~/components/CreatePost';
import PostsFeed from '~/components/PostsFeed';

export default function Home() {
  const { user, isSignedIn } = useUser();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Twitopia home</title>
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
        <div className="h-full w-full border-zinc-100 py-4 md:max-w-2xl md:border-x">
          <div className="flex justify-end px-5">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Link href="/">
            <h1 className="py-6 text-center text-[5rem] font-extrabold tracking-tight">
              Twit<span className="text-[hsl(280,100%,70%)]">opia</span>
            </h1>
          </Link>
          <div className="flex border-b border-slate-400 p-4">
            {isSignedIn && <CreatePost />}
          </div>
          <PostsFeed />
        </div>
      </main>
    </>
  );
}
