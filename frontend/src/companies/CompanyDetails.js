import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCard from "../jobs/JobCard";
import JoblyApi from "../api";
import ErrorMessages from "../common/ErrorMessages";

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const search = async (handle) => {
    try {
      setIsLoading(true);
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    catch (err) {
      setErrors(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search(handle);
  }, []);

  if (errors) return <ErrorMessages errors={errors} />;
  if (isLoading) return <LoadingSpinner />;
  if (!errors && !isLoading) {
    return (
      <div className="col-md-8 offset-md-2">
        <h1>{company.name}</h1>
        <small>{company.description}</small>
        <div className="jobs-list">
          {company.jobs.map((job) => <JobCard key={job.id} title={job.title} salary={job.salary} equity={job.equity} />)}
        </div>
      </div>
    );
  }
}
export default CompanyDetails;