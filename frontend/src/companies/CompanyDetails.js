import React from "react";
import { useParams } from "react-router-dom";

function CompanyDetails() {
  const { handle } = useParams();
  return (
    <div>
      In CompanyDetails for {handle}
    </div>
  );
}
export default CompanyDetails;