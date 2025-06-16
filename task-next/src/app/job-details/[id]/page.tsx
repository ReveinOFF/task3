import JobDetailsClient from "./jobDetailsClient";

export default function JobDetails({ params }: { params: { id: string } }) {
  return <JobDetailsClient id={params.id} />;
}
