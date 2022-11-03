import {
  CREATE_SHIPMENT,
  RETRIEVE_SHIPMENTS,
  UPDATE_SHIPMENT,
  DELETE_SHIPMENT,
  DELETE_ALL_SHIPMENTS,
} from "./types";

import ShipmentDataService from "../../services/ShipmentService";

export const createShipment = (shipment) => async (dispatch) => {
  try {
    const res = await ShipmentDataService.create(shipment);

    dispatch({
      type: CREATE_SHIPMENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveShipments = () => async (dispatch) => {
  try {
    const res = await ShipmentDataService.getAll();
    console.log("from inside action", res);
    dispatch({
      type: RETRIEVE_SHIPMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateShipment = (waybill, data) => async (dispatch) => {
  try {
    const res = await ShipmentDataService.update(waybill, data);

    dispatch({
      type: UPDATE_SHIPMENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteShipment = (waybill) => async (dispatch) => {
  try {
    await ShipmentDataService.remove(waybill);

    dispatch({
      type: DELETE_SHIPMENT,
      payload: { waybill },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllShipments = () => async (dispatch) => {
  try {
    const res = await ShipmentDataService.removeAll();

    dispatch({
      type: DELETE_ALL_SHIPMENTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
