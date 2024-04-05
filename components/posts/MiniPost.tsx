"use client";

import Link from "next/link";
import PostOptions from "./PostOptions";
import UserAvatar from "../profile/UserAvatar";
import { Post as PostType, User } from "@/lib/definitions";
import Timestamp from "../Timestamp";

function MiniPost({ post, user }: { post: PostType , user:User  }) {
  const username = user?.username;
  const href = `/dashboard/${username}`;

  if (!user) return null;

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar user={user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={post.createdAt} />
          <PostOptions
            post={post}
            className="hidden group-hover:inline"
          />
        </div>
      </div>
    </div>
  );
}

export default MiniPost;
