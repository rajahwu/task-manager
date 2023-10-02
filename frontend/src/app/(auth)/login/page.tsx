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
    <div>
      <h1>{ page }</h1>
      <Link href="/dashboard">back to Dashboard</Link>
      <LoginForm />
    </div>
  );
}
