"use client";
import { useEffect, useState } from "react";

export default function FavoriteButton({ id }: { id: string }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("job_fav");
    if (!raw) return;

    try {
      const list = JSON.parse(raw) as string[];
      setIsFav(list.includes(id));
    } catch (e) {
      console.error("Failed to parse favorites:", e);
    }
  }, [id]);

  const toggleFav = () => {
    try {
      const raw = localStorage.getItem("job_fav");
      let list = raw ? (JSON.parse(raw) as string[]) : [];

      if (list.includes(id)) {
        list = list.filter((val) => val !== id);
        setIsFav(false);
      } else {
        list.push(id);
        setIsFav(true);
      }

      localStorage.setItem("job_fav", JSON.stringify(list));
    } catch (e) {
      console.error("Failed to update favorites:", e);
    }
  };

  return (
    <button onClick={toggleFav} className="mx-auto">
      {isFav ? "Unfavorite" : "Favorite"}
    </button>
  );
}
