import { type PostWithAuthor } from '~/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

dayjs.extend(relativeTime);

const Posts = (props: PostWithAuthor) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="flex items-center gap-4 border-b border-slate-400 p-4"
    >
      <Image
        src={author?.profileImageUrl}
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
        alt="Author profile image"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-xs font-medium text-slate-300">
          <span className="">{`@${author?.username}`}</span>
          <span className="font-light">{`• ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="text-xl">{post?.content}</span>
      </div>
    </div>
  );
};

export default Posts;
