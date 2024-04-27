import { Post } from '@/lib/definitions';
import { HeartIcon, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function PostsGrid({ posts }: { posts: Post[] }) {
  if (posts?.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-3 pb-20 lg:max-w-4xl">
        <p className="text-sm font-semibold text-neutral-400">No more posts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts?.map((post) => (
        <Link
          href={`/dashboard/posts/${post._id}`}
          key={post._id}
          className="group relative col-span-1 flex h-44 items-center justify-center md:h-64 lg:h-80"
        >
          <Image
            src={post.image}
            fill
            alt="Post preview"
            className="-z-10 object-cover transition group-hover:blur-[2px] group-hover:brightness-90 group-hover:filter"
          />
          <div className="flex items-center justify-center space-x-6 opacity-0 transition group-hover:opacity-100">
            {post?.likes?.length > 0 && (
              <div className="flex items-center space-x-1 font-bold">
                <HeartIcon className="fill-white text-white" />
                <p className="text-white">{post.likes.length}</p>
              </div>
            )}

            {post?.comments?.length > 0 && (
              <div className="flex items-center space-x-1 font-bold">
                <MessageCircle className="fill-white text-white" />
                <p className="text-white">{post.comments.length}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostsGrid;
