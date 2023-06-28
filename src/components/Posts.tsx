import { type PostWithAuthor } from '~/types';
import Image from 'next/image';
import { formatRelativeTimeFrom } from '~/lib/utils';
import Link from 'next/link';

const Posts = (props: PostWithAuthor) => {
  const { post, author } = props;
  return (
    <Link href={`/post/${post.id}`}>
      <div
        key={post.id}
        className="flex items-center gap-4 border-b border-slate-400 p-4 transition-colors ease-in hover:cursor-pointer hover:bg-zinc-900"
      >
        <Link href={`/${author?.id}`}>
          <Image
            src={author?.profileImageUrl}
            className="h-12 w-12 rounded-full transition-colors hover:ring-2 hover:ring-[hsl(280,99%,70%)]"
            width={48}
            height={48}
            alt="Author profile image"
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-1 text-xs font-medium text-slate-300">
            <Link href={`/${author?.id}`}>
              <span className="hover:cursor-pointer hover:text-[hsl(280,99%,70%)]">{`@${author?.username}`}</span>
            </Link>
            <span className="font-light">{`• ${formatRelativeTimeFrom(
              post.createdAt
            )}`}</span>
          </div>
          <span className="text-xl">{post?.content}</span>
        </div>
      </div>
    </Link>
  );
};

export default Posts;
