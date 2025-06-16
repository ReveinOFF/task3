"use client";

import { useEffect, useState } from "react";
import axios from "@/services/axios";
import Card from "@/components/card/component";

type Job = {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
};

const fetchJobDetails = async (job_id: string): Promise<Job | null> => {
  try {
    const { data } = await axios.get("/job-details", {
      params: { job_id, country: "us" },
    });
    return data.data[0];
  } catch (error) {
    console.error("Failed to fetch job:", job_id, error);
    return null;
  }
};

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      const raw = localStorage.getItem("job_fav");
      if (!raw) return;

      try {
        const jobIds: string[] = JSON.parse(raw);
        const responses = await Promise.all(
          jobIds.map((id) => fetchJobDetails(id))
        );
        const validJobs = responses.filter((job): job is Job => job !== null);
        setSavedJobs(validJobs);
      } catch (e) {
        console.error("Failed to load saved jobs", e);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!savedJobs.length) return <p>No saved jobs</p>;

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Saved Jobs</h1>
      <div className="grid grid-cols-3 gap-4">
        {savedJobs.map((job) => (
          <Card job={job} key={job.job_id} />
        ))}
      </div>
    </div>
  );
}
