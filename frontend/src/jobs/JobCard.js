import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

function JobCard({ title, salary, equity, id }) {
  const { currentUser, apply } = useContext(UserContext);

  if (!currentUser) return <LoadingSpinner />;

  const isApplied = currentUser.applications.includes(id);

  return (

    <Card className="JobCard mb-2">
      <CardBody>
        <CardTitle tag="h6">
          {title}
          {id}
          {isApplied ?
            <Button disabled className="float-end ms-5" >Applied</Button>
            :
            <Button onClick={() => apply(id)} className="float-end ms-5">Apply</Button>
          }
        </CardTitle>
        <CardText>
          Salary: {salary ? salary : "N/A"} <br />
          Equity: {equity ? equity : "N/A"}
        </CardText>
      </CardBody>
    </Card>

  );
}
export default JobCard;