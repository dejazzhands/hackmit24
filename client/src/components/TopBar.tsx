"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { ConnectToTerraButton } from "@tryterra/terra-ui";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter()

  const getWidgetAsync = async () => {
    try {
      const response = await fetch(
        "https://api.tryterra.co/v2/auth/generateWidgetSession",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "dev-id": "testingTerra",
            "content-type": "application/json",
            "x-api-key": "4o9iI1_TsKsg8FgDWmsOu_OdZoQkJZMR", //TODO: Remove
          },
          body: JSON.stringify({
            providers:
              "FITBIT",
            language: "en",
            auth_success_redirect_url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
            auth_failure_redirect_url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get widget");
      }
      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sticky bg-slate-700 p-4 flex items-center justify-between rounded-lg mt-4 m-2">
      {isLoaded && isSignedIn && (
        <div className="flex items-center gap-2">
          <UserButton /> {`Welcome back, ${user?.fullName || "User"}`}
        </div>
      )}
      <ConnectToTerraButton onClick={getWidgetAsync} />
      <SignOutButton>
        <Button variant="contained">Log out</Button>
      </SignOutButton>
    </div>
  );
};

export default TopBar;
