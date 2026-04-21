import { AuthCard } from "@/components/auth/AuthCard";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignUpPage() {
  return (
    <AuthShell>
      <AuthCard mode="sign-up" />
    </AuthShell>
  );
}
