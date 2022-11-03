import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteShipment } from "../../actions/shipments";

function ShipmentCard(props) {
  const dispatch = useDispatch();
  const removeShipment = () => {
    console.log("ehie");
    dispatch(deleteShipment(props.waybill))
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white w-72 sm:w-96  max-w-sm">
      <div>
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          Shipment waybill #{props.waybill}
        </h5>
        <p className="text-gray-700 text-base mb-4">
          Customer Name: {props.customerName}
        </p>
        <p className="text-gray-700 text-base mb-4">
          Customer Address: {props.customerAddress}
        </p>
        <p className="text-gray-700 text-base mb-4">
          Customer Phone number: {props.customerPhoneNumber}
        </p>
      </div>
      <span className="flex justify-evenly">
        <button
          onClick={removeShipment}
          className=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Remove
        </button>
        <Link
          to={`/shipments/${props.waybill}`}
          className=" inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Edit
        </Link>
      </span>
    </div>
  );
}

export default ShipmentCard;
