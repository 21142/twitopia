import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '~/lib/api';
import Loading from './Loading';

const CreatePost = () => {
  const [input, setInput] = useState('');

  const { user } = useUser();

  if (!user) return null;

  const postsContext = api.useContext().post;

  const { mutate, isLoading } = api.post.create.useMutation({
    onSuccess: () => {
      setInput('');
      void postsContext.invalidate();
    },
    onError: (e) => {
      const errorMessages = e.data?.zodError?.fieldErrors.content;
      if (errorMessages && errorMessages[0]) {
        toast.error(errorMessages[0]);
      } else {
        toast.error('Something went wrong');
      }
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            mutate({ content: input, authorId: user.id });
          }
        }}
        disabled={isLoading}
      />
      <button
        onClick={() => mutate({ content: input, authorId: user.id })}
        disabled={isLoading}
      >
        Post
      </button>
      {isLoading && <Loading />}
    </div>
  );
};

export default CreatePost;
