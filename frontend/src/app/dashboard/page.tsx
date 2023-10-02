import Link from "next/link";

async function getData() {
    const res = await fetch("http://localhost:8000/api/dashboard");
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  

export default async function Dashboard() {
    const { page } = await getData()
    return(
    <div>
        <h1>{ page }</h1>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
    </div>   
    );
  }
  