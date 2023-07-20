import React, { useContext, useState } from "react";
import useFields from "../hooks/useFields";
import { Button, Input } from "reactstrap";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../common/ErrorMessages";

function ProfileForm() {
  const { editProfile, currentUser } = useContext(UserContext);
  const history = useNavigate();
  const [formData, handleChange] = useFields({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  });
  const [errors, setErrors] = useState(null);
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await editProfile(formData);
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
          disabled
          className="mb-2"
          type="text"
          name="username"
          placeholder={currentUser.username} />
        <Input
          className="mb-2"
          type="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder='First Name' />
        <Input
          className="mb-2"
          type="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder='Last Name' />
        <Input
          className="mb-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Email' />
        <Button>Edit Profile</Button>
      </div>
      {errors ? <ErrorMessages errors={errors} /> : null}
    </form>
  );
}
export default ProfileForm;