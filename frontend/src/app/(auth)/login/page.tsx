import LoginForm from "@/components/LoginForm";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:8000/auth/login");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function LoginPage() {
  const { page } = await getData();
  return (
    <div className="w-full max-w-xs">
      <Link className="btn btn-ghost"  href="/dashboard">back to Dashboard</Link>
      <div className="navbar bg-base-100">
        <h1 className="capitalize text-xl">{page}</h1>
      </div>
      <LoginForm />
    </div>
  );
}
