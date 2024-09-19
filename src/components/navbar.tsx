"use client";

import { useWeb3AuthContext } from "@/hooks/web3auth-context";
import { LogOutIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

function Navbar() {
  const { user, loggedIn, login, logout } = useWeb3AuthContext();

  return (
    <div className="sm:container px-2 py-4 md:px-4">
      <nav className="flex items-center justify-between ">
        {loggedIn ? (
          <>
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
              <h2 className="text-xl sm:text-4xl font-bagel">Milionario</h2>
            </div>
            <div className="flex items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                {user?.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col gap-0">
                  <span className="font-bold">{user?.name || "User"}</span>
                  <span className="text-sm">{`FID ${user?.verifierId || ""}`}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-3 bg-indigo-600 rounded-full hover:bg-indigo-700 text-white font-semibold transition duration-200"
              >
                <LogOutIcon className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h2 className="text-4xl font-bagel">Milionario</h2>
            </div>
            <button
              onClick={login}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            >
              Login
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
