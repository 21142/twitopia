import { UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';

export default function UserProfilePage() {
  return (
    <>
      <Head>
        <title>User profile</title>
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
              <span className="text-[hsl(280,100%,70%)]">@macG</span>
              <span> profile</span>
            </h1>
          </Link>
          <div className="flex border-b border-slate-400 p-4">@macg</div>
        </div>
      </main>
    </>
  );
}
