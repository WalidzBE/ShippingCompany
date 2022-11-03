import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../actions/account";
import MyForm from "../molecules/Form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const initialAccountState = {
  email: "",
  password: "",
};

const formFields = [
  { type: "email", name: "email", placeholder: "Email" },
  { type: "password", name: "password", placeholder: "Password" },
];

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LogIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .then((data) => {
        console.log("akal", data);
        navigate("/home", { replace: true });
      })
      .catch((e) => {
        console.log("error", e.response.data);
        if (e.response.data.type in initialAccountState)
          actions.setFieldError(e.response.data.type, e.response.data.message);
        else {
          actions.setFieldError("password", e.response.data.message);
        }
        actions.setSubmitting(false);
      });
  };

  return (
    // <div className="submit-form">
    //       <div className="form-group">
    //         <label htmlFor="email">Email</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="email"
    //           required
    //           value={account.email}
    //           onChange={handleInputChange}
    //           name="email"
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="password"
    //           required
    //           value={account.password}
    //           onChange={handleInputChange}
    //           name="password"
    //         />
    //       </div>

    //       <button onClick={logInUser} className="btn btn-success">
    //         Submit
    //       </button>
    //     </div>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <MyForm
          title="Log In"
          initialFormState={initialAccountState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          fields={formFields}
          submitTitle="Log In"
        />
      </div>
    </div>
  );
};

export default LogIn;
