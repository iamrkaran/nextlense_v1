"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { translateText } from '@/lib/translate';

interface PostCaptionProps {
  username: string;
  caption?: string;
}

const PostCaption: React.FC<PostCaptionProps> = ({ username, caption }) => {
  const [translatedCaption, setTranslatedCaption] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const handleTranslate = async () => {
    if (caption) {
      setIsTranslating(true);
      try {
        const translation = await translateText(caption, username);
        setTranslatedCaption(translation); // Set translated caption
      } catch (error) {
        console.error('Error translating caption:', error);
      } finally {
        setIsTranslating(false);
      }
    }
  };

//   console.log('PostCaption -> translatedCaption', translatedCaption);
  return (
    <div>
      {caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>
          <p>{translatedCaption ? translatedCaption : caption}</p>
          <button
            onClick={handleTranslate}
            className="ml-2 rounded bg-blue-500 px-2 py-1 text-white"
            disabled={isTranslating}
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCaption;
