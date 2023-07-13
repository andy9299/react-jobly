import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "reactstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCard from "../jobs/JobCard";
import JoblyApi from "../api";

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = async (handle) => {
    try {
      setIsLoading(true);
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search(handle);
  }, []);

  if (error) return <Alert color="danger">An error has occurred: {error}</Alert>;
  if (isLoading) return <LoadingSpinner />;
  if (!error && !isLoading) {
    return (
      <div className="col-md-8 offset-md-2">
        <h1>{company.name}</h1>
        <small>{company.description}</small>
        <div className="jobs-list">
          {company.jobs.map((job) => <JobCard title={job.title} salary={job.salary} equity={job.equity} />)}
        </div>
      </div>
    );
  }
}
export default CompanyDetails;