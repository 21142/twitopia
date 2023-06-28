import { type FC } from 'react';
import { api } from '~/lib/api';
import Loading from './Loading';
import Posts from './Posts';

interface UserFeedProps {
  userId: string;
}

const UserFeed: FC<UserFeedProps> = ({ userId }) => {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({ userId });

  if (isLoading) return <Loading />;

  if (!data || data.length === 0) return <div>User has not posted yet</div>;

  return (
    <div className="flex flex-col">
      {data &&
        data.map((postWithAuthor) => (
          <Posts
            {...postWithAuthor}
            key={postWithAuthor.post.id}
          />
        ))}
    </div>
  );
};

export default UserFeed;
