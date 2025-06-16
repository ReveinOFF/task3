"use client";

import useSWR from "swr";
import axios from "@/services/axios";
import Image from "next/image";

const fetchJobDetails = async (job_id: string, country: string = "us") => {
  const url = `/job-details?job_id=${job_id}&country=${country}`;

  const { data } = await axios.get(url);
  return data;
};

export default function JobDetailsClient({ id }: { id: string }) {
  const country = "us";

  const { data, error, isLoading } = useSWR(["job-details", id, country], () =>
    fetchJobDetails(id, country)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error || !id) return <p>Error</p>;

  const dataMain = data.data[0];

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-center text-4xl">Job details</h1>
      <div className="mt-5 space-y-3">
        {dataMain.employer_logo ? (
          <p className="flex justify-center">
            <Image
              src={dataMain.employer_logo}
              alt="logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </p>
        ) : (
          <p className="mx-auto">
            <div className="logo">?</div>
          </p>
        )}
        <p>
          <strong>Vacancy:</strong> <span>{dataMain.job_title}</span>
        </p>
        <p>
          <strong>Employer:</strong> <span>{dataMain.employer_name}</span>
        </p>
        <p>
          <strong>
            Job is {dataMain.job_is_remote ? "remote" : "not remote"}
          </strong>
        </p>
        {dataMain.employer_website && (
          <p>
            <strong>Website:</strong>
            <span>{dataMain.employer_website}</span>
          </p>
        )}
        <p>
          <strong>Location:</strong> <span>{dataMain.job_location}</span>
        </p>
        <p>
          <strong>Description:</strong>
          <p>{dataMain.job_description}</p>
        </p>
      </div>
    </div>
  );
}
