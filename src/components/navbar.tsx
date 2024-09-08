"use client";

import { useWeb3AuthContext } from "@/hooks/web3auth-context";
import { LogOutIcon } from "lucide-react";
import React from "react";

function Navbar() {
  const { user, loggedIn, login, logout } = useWeb3AuthContext();

  return (
    <div className="container">
      <nav className="flex items-center justify-between p-4">
        {loggedIn ? (
          <>
            <h2 className="text-4xl font-bagel">1 in 1 Million</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col gap-0">
                  <span className="font-bold">{user?.name || "User"}</span>
                  <span className="text-sm">{`FID ${user?.verifierId || "User"}`}</span>
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
            <h2 className="text-4xl font-bagel">1 in 1 Million</h2>
            <button
              onClick={login}
              className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-white"
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
