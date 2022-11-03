import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/account";
import Form from "../molecules/Form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const initialAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formFields = [
  { type: "fname", name: "firstName", placeholder: "First Name" },
  { type: "lname", name: "lastName", placeholder: "Last Name" },
  { type: "email", name: "email", placeholder: "Email" },
  { type: "password", name: "password", placeholder: "Password" },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
  },
];

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(signUp(values))
      .then((data) => {
        console.log(data);
        navigate("/home", { replace: true });
      })
      .catch((e) => {
        console.log(e.response.data);
        console.log(JSON.stringify(e));
        if (e.response.data.type in initialAccountState)
          actions.setFieldError(e.response.data.type, e.response.data.message);
        else {
          actions.setFieldError("confirmPassword", e.response.data.message);
        }
        actions.setSubmitting(false);
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Form
          title="Create an account"
          initialFormState={initialAccountState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          fields={formFields}
          submitTitle="Sign Up"
        />
      </div>
    </div>
  );
};

export default SignUp;
