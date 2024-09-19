import React from "react";
import {
  IconBrandX,
  IconLink,
  IconBrandGithub,
  IconBrandYoutube,
  IconMessageCirclePlus,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

const Footer = () => {
  const links = [
    {
      title: "XMTP Bot: Send DM",
      icon: <IconMessageCirclePlus className="h-full w-full text-indigo-300" />,
      href: "https://converse.xyz/dm/a-milly.eth",
    },

    {
      title: "Github",
      icon: <IconBrandGithub className="h-full w-full text-indigo-300" />,
      href: "https://github.com/builders-garden/xmtp-1in1million",
    },
    {
      title: "YouTube",
      icon: <IconBrandYoutube className="h-full w-full text-indigo-300" />,
      href: "https://youtu.be/GNFNrhv3T9k",
    },
    {
      title: "Learn More",
      icon: <IconLink className="h-full w-full text-indigo-300" />,
      href: "https://ethglobal.com/showcase/milionario-eq7of",
    },
  ];
  return (
    <div className="flex items-center justify-center h-auto py-5 w-full">
      <FloatingDock items={links} />
    </div>
  );
};

export default Footer;
