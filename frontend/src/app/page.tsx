import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:8000/api");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Index() {
  const { page } = await getData();
  return (
    <main>
      <h1>{ page }</h1>
      <Link href="/dashboard">to dashboard</Link>
    </main>
  );
}
