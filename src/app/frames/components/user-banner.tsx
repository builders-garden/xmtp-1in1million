import { UserDataReturnType } from "frames.js";

interface UserBannerProps {
  user?: UserDataReturnType & { fid: number };
}

const UserBanner = ({ user }: UserBannerProps) => {
  return user ? (
    <div tw="flex w-full absolute top-[15px] left-[15px] items-center">
      {user.fid != -1 ? (
        <img
          src={`${user.profileImage}`}
          alt={`${user.displayName} profile image`}
          tw="w-[78px] h-[78px] rounded-full"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="48"
          height="48"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <p tw="h-[48px] text-[38px] m-0 p-0 ml-[20px]">
        {user.username && user.username?.length > 14
          ? `${user.username.slice(0, 10)}...`
          : user.username}
      </p>
    </div>
  ) : undefined;
};

export { UserBanner };
