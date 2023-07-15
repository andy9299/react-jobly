import React from "react";
import { Alert } from "reactstrap";

const ErrorMessages = ({ errors, classString = "" }) => {
  return ((Array.isArray(errors)) ?
    errors.map(err => <Alert className={classString} color="danger">An error has occurred: {err}</Alert>)
    : <Alert className={classString} color="danger">An error has occurred</Alert>);
};

export default ErrorMessages;