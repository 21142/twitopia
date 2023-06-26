import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const CreatePost = () => {
  const { user } = useUser();

  if (!user) return null;

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
      />
    </div>
  );
};

export default CreatePost;
