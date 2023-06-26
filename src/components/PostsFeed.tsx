import { type FC } from 'react';
import { type PostWithAuthor } from '~/types';
import Posts from './Posts';

interface PostsFeedProps {
  data: PostWithAuthor[];
}

const PostsFeed: FC<PostsFeedProps> = ({ data }) => {
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
