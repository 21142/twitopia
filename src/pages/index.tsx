import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Twitopia</title>
        <meta name="description" content="Twitopia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center
      ">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-800 sm:text-[5rem]">
            Twit<span className="text-[hsl(280,100%,70%)]">opia</span>
          </h1>
          <UserButton afterSignOutUrl="/" />
          <pre className="text-xl w-1/2 font-extrabold tracking-tight text-zinc-900">
            {user && JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </main>
    </>
  );
}
