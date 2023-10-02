import Link from "next/link";

export default function Index() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/dashboard">to dashboard</Link>
    </main>
  );
}
