import { SignInButton } from "@clerk/nextjs";
import { Button } from "@mui/material";

const SignInBtn = () => {
  return (
    <SignInButton mode="modal">
      <Button variant="contained">
        Sign In with Clerk
      </Button>
    </SignInButton>
  );
};

export default SignInBtn;
