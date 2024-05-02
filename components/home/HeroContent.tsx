'use client';
import React from 'react';
import { motion } from 'framer-motion';

import { SparklesIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/actions/utils/motion';

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="z-[20] mt-20 flex flex-col items-center justify-center px-5 sm:px-10 md:px-20 lg:px-32"
    >
      <div className="m-auto flex flex-col items-center justify-center gap-5 text-center">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box border border-[#7042f88b] px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 opacity-[0.9]"
        >
          <SparklesIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#b49bff]" />
          <h1 className="Welcome-text text-xs sm:text-base md:text-lg lg:text-xl">Connect with the Future</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mt-4 sm:mt-6 flex flex-col items-center gap-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        >
          <span>
            Experience the
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {' '}
              NextLense{' '}
            </span>
            Revolution
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="my-3 sm:my-5 max-w-full text-sm sm:text-base md:text-lg lg:text-xl text-gray-400"
        >
          Join our next-generation social media platform and immerse yourself in
          a cyberpunk-inspired digital world. Connect with friends, explore
          futuristic cityscapes, and experience a new era of social networking.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          href="/auth/register"
          className="button-primary mt-16 w-1/3 cursor-pointer rounded-lg py-4 text-center text-white"
        >
          Get Started
        </motion.a>
      </div>
    </motion.div>
  );
};

export default HeroContent;
