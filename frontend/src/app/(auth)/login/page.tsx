import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <Link href="/dashboard">back to Dashboard</Link>
      <LoginForm />
    </div>
  );
}