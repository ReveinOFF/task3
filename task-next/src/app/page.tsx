import Link from "next/link";

export default function Home() {
  return (
    <div className="m-auto min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl">Welcome to SearchJob</h1>
      <p className="mt-10 mb-2">Do you want to get a job?</p>
      <Link href="/jobs">
        <button className="rounded-md shadow-sm shadow-black py-4 px-6 hover:shadow-md hover:shadow-black uppercase">
          Find a job
        </button>
      </Link>
    </div>
  );
}
