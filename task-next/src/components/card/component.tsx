"use client";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../favoriteBtn/component";
import { Job } from "@/app/jobs/page";

export default function Card({ job }: { job: Job }) {
  return (
    <div
      className="rounded-md shadow-md shadow-black grid p-5 gap-2"
      key={job.job_id}
    >
      {job.employer_logo ? (
        <p className="flex justify-center">
          <Image
            src={job.employer_logo}
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
      <hr />
      <p>
        <strong>Vacancy:</strong> <span>{job.job_title}</span>
      </p>
      <p>
        <strong>Employer:</strong> <span>{job.employer_name}</span>
      </p>
      <Link href={`/job-details/${job.job_id}`} className="mx-auto">
        <button>Details</button>
      </Link>
      <FavoriteButton id={job.job_id} />
    </div>
  );
}
