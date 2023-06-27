import { useUser } from '@clerk/nextjs';
import CreatePost from '~/components/CreatePost';
import PageLayout from '~/components/PageLayout';
import PostsFeed from '~/components/PostsFeed';

export default function Home() {
  const { user, isSignedIn } = useUser();

  if (!user) return null;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {isSignedIn && <CreatePost />}
      </div>
      <PostsFeed />
    </PageLayout>
  );
}
