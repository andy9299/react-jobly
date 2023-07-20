import React, { useEffect, useState } from "react";
import ErrorMessages from "../common/ErrorMessages";
import JobCard from "./JobCard";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api";
import JobSearchForm from "./JobSearchForm";

function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const search = async (title) => {
    try {
      setIsLoading(true);
      const jobs = await JoblyApi.getJobs({ title });
      setJobs(jobs);
    }
    catch (err) {
      setErrors(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);


  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="col-md-8 offset-md-2">
      <JobSearchForm search={search} />
      {errors ? <ErrorMessages errors={errors} />
        :
        jobs.map(job =>
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />)
      }
    </div>
  );

}
export default JobsList;