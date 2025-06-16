"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("at");
      if (!raw) return;

      setIsAuth(raw.length > 1);
    } catch (e) {
      console.error("Failed to get token:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("at");
    window.location.reload();
  };

  return (
    <header className="container mx-auto flex gap-3 justify-end mt-2 items-center">
      <Link href="/jobs">Jobs</Link>
      <Link href="/liked">Liked</Link>
      {isAuth ? (
        <button onClick={handleLogout} className="py-2 px-3">
          Logout
        </button>
      ) : (
        <Link href="/login">SignIn</Link>
      )}
    </header>
  );
}
