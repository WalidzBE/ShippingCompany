import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateShipment } from "../../actions/shipments";
import ShipmentService from "../../services/ShipmentService";
import Loader from "../atoms/Loader";
import ShipmentForm from "../molecules/ShipmentForm";

const initialShipmentState = {
  id: null,
  customerAddress: "",
  customerName: "",
  customerPhoneNumber: "",
};

const EditShipment = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialState, setInitialState] = useState(initialShipmentState);
  const { waybill } = useParams();

  const dispatch = useDispatch();

  const getShipment = (waybill) => {
    ShipmentService.get(waybill)
      .then((response) => {
        console.log(response.data);
        setInitialState(response.data);
        setLoading(false);
      })
      .catch((e) => {});
  };

  const updateShipmentHandler = (values) => {
    dispatch(updateShipment(initialState.waybill, values))
      .then((response) => {
        console.log(response);
        navigate("/shipments");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getShipment(waybill);
  }, [waybill]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <ShipmentForm
          title={`Edit shipment waybill #${initialState.waybill}`}
          initialFormState={initialState}
          onSubmit={updateShipmentHandler}
          submitTitle="Edit shipment"
        />
      </div>
    </div>
  );
};

export default EditShipment;
