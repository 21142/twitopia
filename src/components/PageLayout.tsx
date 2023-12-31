import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { type FC } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <main className="flex h-screen justify-center overflow-y-scroll">
      <div className="h-full w-full border-zinc-100 md:max-w-2xl md:border-x">
        <div className={className ?? ''}>
          <div className="flex justify-end px-5 pt-4">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Link href="/">
            <h1 className="py-6 text-center text-[5rem] font-extrabold tracking-tight">
              Twit<span className="text-[hsl(280,100%,70%)]">opia</span>
            </h1>
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
