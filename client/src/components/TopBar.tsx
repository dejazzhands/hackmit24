"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";

const TopBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="sticky bg-slate-700 p-4 flex items-center justify-between rounded-lg mt-4 m-2">
      {isLoaded && isSignedIn && (
        <div className="flex items-center gap-2">
          <UserButton /> {`Welcome back, ${user?.fullName || "User"}`}
        </div>
      )}
      <SignOutButton>
        <Button variant="contained">Log out</Button>
      </SignOutButton>
    </div>
  );
};

export default TopBar;
