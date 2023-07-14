import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function JobCard({ title, salary, equity }) {
  return (

    <Card className="JobCard mt-2">
      <CardBody>
        <CardTitle tag="h6">
          {title}
        </CardTitle>
        <CardText>
          Salary: {salary} <br />
          Equity: {equity}
        </CardText>
      </CardBody>
    </Card>

  );
}
export default JobCard;