import React, { useContext, useEffect, useState } from "react";
import { Alert } from "reactstrap";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api";
import CompanySearchForm from "./CompanySearchForm";
import UserContext from "../context/UserContext";
import ErrorMessages from "../common/ErrorMessages";

function CompaniesList() {
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const search = async (name) => {
    try {
      setIsLoading(true);
      const companies = await JoblyApi.getCompanies({ name });
      setCompanies(companies);
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
      <CompanySearchForm search={search} />
      {errors ? <ErrorMessages errors={errors} />
        :
        companies.map(company =>
          <CompanyCard
            key={company.handle}
            name={company.name}
            description={company.description}
            handle={company.handle}
            logoUrl={company.logoUrl}
          />)
      }
    </div>
  );


}
export default CompaniesList;;