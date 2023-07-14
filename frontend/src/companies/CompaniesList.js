import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api";
import CompanySearchForm from "./CompanySearchForm";

function CompaniesList() {
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = async (name) => {
    try {
      setIsLoading(true);
      const companies = await JoblyApi.getCompanies({ name });
      setCompanies(companies);
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  if (error) return error.map(err => <Alert color="danger">An error has occurred: {err}</Alert>);
  ;
  if (isLoading) return <LoadingSpinner />;
  if (!error && !isLoading) {
    return (
      <div className="col-md-8 offset-md-2">
        <CompanySearchForm search={search} />
        {companies.map(company =>
          <CompanyCard
            key={company.handle}
            name={company.name}
            description={company.description}
            handle={company.handle}
            logoUrl={company.logoUrl}
          />)}
      </div>
    );
  }

}
export default CompaniesList;