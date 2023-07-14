import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import JobCard from "./JobCard";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api";
import JobSearchForm from "./JobSearchForm";

function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = async (title) => {
    try {
      setIsLoading(true);
      const jobs = await JoblyApi.getJobs({ title });
      setJobs(jobs);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  if (error) return <Alert color="danger">An error has occurred: {error}</Alert>;

  if (isLoading) return <LoadingSpinner />;

  if (!error && !isLoading) {
    return (
      <div className="col-md-8 offset-md-2">
        <JobSearchForm search={search} />
        {jobs.map(job =>
          <JobCard
            key={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />)}
      </div>
    );
  }

}
export default JobsList;