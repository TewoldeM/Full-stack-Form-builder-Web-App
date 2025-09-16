import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-items-center">
      <SignUp />
    </div>
  );
}