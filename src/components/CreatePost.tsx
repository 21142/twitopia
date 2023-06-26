import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { api } from '~/lib/api';

const CreatePost = () => {
  const [input, setInput] = useState('');

  const { user } = useUser();

  if (!user) return null;

  const postsContext = api.useContext().posts;

  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('');
      void postsContext.invalidate();
    },
  });

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
        alt="Profile image"
      />
      <input
        className="w-full bg-transparent outline-none"
        placeholder="Type an emoji"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={() => mutate({ content: input, authorId: user.id })}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;
