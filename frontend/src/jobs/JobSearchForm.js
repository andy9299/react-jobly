import React from "react";
import useFields from "../hooks/useFields";
import { Button, Input } from "reactstrap";

function JobSearchForm({ search }) {
  const [formData, handleChange, resetForm] = useFields({
    name: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    search(formData.name);
    resetForm();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-2">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Search a Job" />
        <Button color="secondary">Search</Button>
      </div>
    </form>
  );
}

export default JobSearchForm;