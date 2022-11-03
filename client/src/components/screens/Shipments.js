import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveShipments, deleteAllShipments } from "../../actions/shipments";
import Loader from "../atoms/Loader";
import ShipmentCard from "../molecules/ShipmentCard";
import ShipmentListHeader from "../molecules/ShipmentListHeader";

const Shipments = (props) => {
  const [loading, setLoading] = useState(true);
  const shipments = useSelector((state) => state.shipments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveShipments())
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [dispatch]);

  const deleteShipments = () => {
    dispatch(deleteAllShipments())
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="mx-auto flex h-full justify-center  px-4 sm:px-6">
      <div className="w-full ">
        <ShipmentListHeader
          hasShipments={shipments && shipments.length > 0}
          deleteAllShipments={deleteShipments}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-wrap justify-center sm:justify-start">
            {shipments &&
              shipments.map((shipment) => (
                <div key={shipment.waybill} className="p-2 sm:p-4 lg:p-6">
                  <ShipmentCard {...shipment} />
                </div>
              ))}
            {shipments && shipments.length === 0 && (
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                No shipments yet!
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipments;
