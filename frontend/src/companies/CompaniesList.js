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
      setIsLoading(false);
    }
    catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    search();
  }, []);
  if (error) return <Alert color="danger">An error has occured.</Alert>;
  if (isLoading) return <LoadingSpinner />;
  if (!error && !isLoading) {
    return (
      <div className="col-md-8 offset-md-2">
        <CompanySearchForm search={search} />
        {Object.keys(companies).map((keyName) => (
          <CompanyCard name={companies[keyName].name} description={companies[keyName].description}
            handle={companies[keyName].handle} logoUrl={companies[keyName].logoUrl} />
        ))}
      </div>
    );
  }

}
export default CompaniesList;