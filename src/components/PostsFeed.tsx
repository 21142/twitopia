import Loading from './Loading';
import Posts from './Posts';
import { api } from '~/lib/api';

const PostsFeed = () => {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (!data) return <div>No posts retrieved</div>;

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

export default PostsFeed;
