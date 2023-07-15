import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

function CompanyCard({ name, description, logoUrl, handle }) {
  return (

    <Card className="CompanyCard mb-2">
      <a href={`/companies/${handle}`}>
        <CardBody>
          <CardTitle tag="h6">
            {name}
            {logoUrl ? <CardImg alt={name} src={logoUrl} className="float-end ms-5" /> : ""}

          </CardTitle>
          <CardText>
            {description}
          </CardText>
        </CardBody>
      </a>
    </Card>

  );
}
export default CompanyCard;