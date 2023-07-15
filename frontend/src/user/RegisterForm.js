import React, { useContext, useState } from "react";
import useFields from "../hooks/useFields";
import { Button, Input } from "reactstrap";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../common/ErrorMessages";

function RegisterForm() {
  const { register } = useContext(UserContext);
  const history = useNavigate();
  const [formData, handleChange, resetForm] = useFields({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [errors, setErrors] = useState(null);
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await register(formData);
      resetForm();
      history('/');
    }
    catch (err) {
      setErrors(err);
    }
  };
  return (
    <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
      <div className="mb-2">
        <Input
          className="mb-2"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username" />
        <Input
          className="mb-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password" />
        <Input
          className="mb-2"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name" />
        <Input
          className="mb-2"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name" />
        <Input
          className="mb-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email" />
        <Button>Register</Button>
      </div>
      {errors ? <ErrorMessages errors={errors} /> : null}
    </form>
  );
}

export default RegisterForm;