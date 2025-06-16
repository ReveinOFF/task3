"use client";

import useSWR from "swr";
import axios from "@/services/axios";
import axiosMain from "axios";
import { useEffect, useState } from "react";
import Card from "@/components/card/component";

export interface Job {
  job_id: string;
  job_title: string;
  employer_name?: string;
  employer_logo?: string;
  employer_website?: string;
  job_description?: string;
  job_is_remote?: unknown;
  job_location?: string;
  [key: string]: unknown;
}

const fetchJobSearch = async (
  query: string,
  country: string = "us",
  page: string = "1",
  num_pages: string = "1",
  date_posted: string = "all"
) => {
  const { data } = await axios.get("/search", {
    params: {
      query,
      page,
      num_pages,
      country,
      date_posted,
    },
  });
  return data;
};

const fetchProfile = async (token: string) => {
  const { data } = await axiosMain.get(
    `${process.env.NEXT_PUBLIC_MY_API_URL}/api/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export default function Jobs() {
  const [query, setQuery] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("at");
    if (!token) return;

    fetchProfile(token)
      .then((profile) => {
        if (profile?.job) {
          setQuery(profile.job);
        } else {
          setQuery("all");
        }
      })
      .catch(() => {
        setQuery("all");
      })
      .finally(() => setProfileLoaded(true));
  }, []);

  const { data, error, isLoading } = useSWR(
    profileLoaded && query ? ["jobs", query] : null,
    () => fetchJobSearch(query!)
  );

  if (!profileLoaded) return <p>Loading profile...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleSearch = () => {
    if (inputValue.trim()) {
      setQuery(inputValue.trim());
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {(data.data as Job[]).map((item) => (
          <Card job={item} key={item.job_id} />
        ))}
      </div>
    </div>
  );
}
