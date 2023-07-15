import React from "react";
import { Alert } from "reactstrap";

const ErrorMessages = ({ errors }) => {
  return ((Array.isArray(errors)) ?
    errors.map(err => <Alert color="danger">An error has occurred: {err}</Alert>)
    : <Alert color="danger">An error has occurred</Alert>);
};

export default ErrorMessages;