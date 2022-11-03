import React from "react";
import { Field, ErrorMessage } from "formik";

function FormTextInput(props) {
  return (
    <div className="pb-2">
      <Field
        render={props.render}
        type={props.type}
        autoComplete={props.autoComplete}
        name={props.name}
        placeholder={props.placeholder}
        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {props.children}
      </Field>
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-xs font-medium text-red-500"
      />
    </div>
  );
}

export default FormTextInput;
