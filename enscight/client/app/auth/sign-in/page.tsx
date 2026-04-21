import { AuthCard } from "@/components/auth/AuthCard";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignInPage() {
  return (
    <AuthShell>
      <AuthCard mode="sign-in" />
    </AuthShell>
  );
}
