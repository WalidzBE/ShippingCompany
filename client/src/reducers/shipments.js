import {
  CREATE_SHIPMENT,
  RETRIEVE_SHIPMENTS,
  UPDATE_SHIPMENT,
  DELETE_SHIPMENT,
  DELETE_ALL_SHIPMENTS,
} from "../actions/shipments/types";

const initialState = [];

const shipmentReducer = (shipments = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SHIPMENT:
      return [...shipments, payload];

    case RETRIEVE_SHIPMENTS:
      return payload;

    case UPDATE_SHIPMENT:
      return shipments.map((shipment) => {
        if (shipment.waybill === payload.waybill) {
          return {
            ...shipment,
            ...payload,
          };
        } else {
          return shipment;
        }
      });

    case DELETE_SHIPMENT:
      console.log(payload.waybill);
      return shipments.filter(({ waybill }) => waybill !== payload.waybill);

    case DELETE_ALL_SHIPMENTS:
      return [];

    default:
      return shipments;
  }
};

export default shipmentReducer;
