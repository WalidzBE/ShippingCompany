import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createShipment } from "../../actions/shipments";
import ShipmentForm from "../molecules/ShipmentForm";

const AddShipment = (props) => {
  const navigate = useNavigate();

  const initialShipmentState = {
    id: null,
    customerAddress: "",
    customerName: "",
    customerPhoneNumber: "",
  };

  const dispatch = useDispatch();

  const saveShipment = (values, actions) => {
    dispatch(createShipment(values))
      .then((data) => {
        navigate("/shipments");

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <ShipmentForm
          title="Create new shipment"
          initialFormState={initialShipmentState}
          onSubmit={saveShipment}
          submitTitle="Add shipment"
        />
      </div>
    </div>
  );
};

export default AddShipment;
