'use client';

const Footer = () => {
  return (
    <div className="mt-96 h-full w-full bg-transparent p-[15px] text-gray-200 shadow-lg ">
      <div className="m-auto flex w-full flex-col items-center justify-center">
        <div className="flex h-full w-full flex-row flex-wrap items-center justify-around">
          <div className="flex h-auto min-w-[200px] flex-col items-center justify-start">
            <div className="text-[16px] font-bold">Community</div>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <FaYoutube /> */}
              <span className="ml-[6px] text-[15px]">Youtube</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <RxGithubLogo /> */}
              <span className="ml-[6px] text-[15px]">Github</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <RxDiscordLogo /> */}
              <span className="ml-[6px] text-[15px]">Discord</span>
            </p>
          </div>
          <div className="flex h-auto min-w-[200px] flex-col items-center justify-start">
            <div className="text-[16px] font-bold">Social Media</div>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <FaYoutube /> */}
              <span className="ml-[6px] text-[15px]">Instagram</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <RxGithubLogo /> */}
              <span className="ml-[6px] text-[15px]">Twitter</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              {/* <RxDiscordLogo /> */}
              <span className="ml-[6px] text-[15px]">Linkedin</span>
            </p>
          </div>
          <div className="flex h-auto min-w-[200px] flex-col items-center justify-start">
            <div className="text-[16px] font-bold">About</div>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              <span className="ml-[6px] text-[15px]">Become Sponsor</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              <span className="ml-[6px] text-[15px]">Learning about me</span>
            </p>
            <p className="my-[15px] flex cursor-pointer flex-row items-center">
              <span className="ml-[6px] text-[15px]">nextlense-v1@vercel.app</span>
            </p>
          </div>
        </div>

        <div className="mb-[20px] text-center text-[15px]">
          &copy; NextLense 2024 Inc. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
