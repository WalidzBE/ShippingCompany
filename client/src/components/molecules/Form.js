import React from "react";
import { Formik, Form as FormikForm } from "formik";
import SubmitButton from "../atoms/SubmitButton";
import FormTextInput from "../atoms/FormTextInput";

function Form(props) {
  return (
    <div>
      <h2
        className={
          "mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        }
      >
        {props.title}
      </h2>
      <Formik
        initialValues={props.initialFormState}
        validate={props.validate}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm autoComplete="on" className="mt-8">
            {props.fields.map((props, index) => (
              <FormTextInput key={index} {...props} />
            ))}

            <div>
              <SubmitButton disabled={isSubmitting} title={props.submitTitle} />
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default Form;
