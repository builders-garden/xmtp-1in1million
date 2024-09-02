import { UserDataReturnType } from "frames.js";

interface UserBannerProps {
  user?: UserDataReturnType;
}

const UserBanner = ({ user }: UserBannerProps) => {
  return user ? (
    <div tw="flex w-full absolute top-[15px] left-[15px] items-center">
      <img
        src={`${user.profileImage}`}
        alt={`${user.displayName} profile image`}
        tw="w-[78px] h-[78px] rounded-full"
      />
      <p
        tw="h-[48px] text-[38px]  m-0 p-0 ml-[20px]"
        style={{ fontFamily: "Outfit-Bold" }}
      >
        {user.username && user.username?.length > 14
          ? `${user.username.slice(0, 10)}...`
          : user.username}
      </p>
    </div>
  ) : undefined;
};

export { UserBanner };
