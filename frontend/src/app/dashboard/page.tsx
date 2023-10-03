import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:8000/api/dashboard");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Dashboard() {
  const { page } = await getData();
  return (
    <div>
      <div className="navbar bg-base-100">
        <h1 className="capitalize text-xl">{page}</h1>
      </div>
      <ul className="navbar bg-base-100 flex">
        <li className="mr-6">
          <Link className="btn btn-ghost normal-case text-xl" href="/login">
            Login
          </Link>
        </li>
        <li className="mr-6">
          <Link className="btn btn-ghost normal-case text-xl" href="/register">
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
}
