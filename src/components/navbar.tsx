"use client";

import { useWeb3AuthContext } from "@/hooks/web3auth-context";
import React from "react";

function Navbar() {
  const { user, loggedIn, login, logout } = useWeb3AuthContext();

  return (
    <div className="container">
      <nav className="flex items-center justify-between p-4 bg-slate-100">
        {loggedIn ? (
          <>
            <h2 className="text-2xl font-bold">1 in 1 million</h2>
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
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">1 in 1 million</h2>
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
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
