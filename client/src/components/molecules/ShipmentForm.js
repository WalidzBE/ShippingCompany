import React from "react";
import Form from "../molecules/Form";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";

const phoneNumberMask = [
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
];

const formFields = [
  { type: "text", name: "customerAddress", placeholder: "Customer Address" },
  { type: "text", name: "customerName", placeholder: "Customer Name" },
  {
    name: "customerPhoneNumber",
    children: ({ field }) => (
      <MaskedInput
        {...field}
        mask={phoneNumberMask}
        id="phone"
        placeholder="Customer Phone Number"
        type="text"
        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    ),
  },
];

const validationSchema = Yup.object({
  customerAddress: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  customerPhoneNumber: Yup.string()
    .test({
      name: "is-complete",
      skipAbsent: true,
      test(value, ctx) {
        if (value?.includes("_")) {
          return ctx.createError({
            message: "Please complete the phone number",
          });
        }
        return true;
      },
    })
    .required("Required"),
});

function ShipmentForm(props) {
  return (
    <Form
      title={props.title}
      initialFormState={props.initialFormState}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
      fields={formFields}
      submitTitle={props.submitTitle}
    />
  );
}

export default ShipmentForm;
