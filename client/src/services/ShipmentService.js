import http from "../http-common";

const getAll = () => {
  return http.get("/shipments");
};

const get = (waybill) => {
  return http.get(`/shipments/${waybill}`);
};

const create = (data) => {
  return http.post("/shipments", data);
};

const update = (waybill, data) => {
  return http.put(`/shipments/${waybill}`, data);
};

const remove = (waybill) => {
  return http.delete(`/shipments/${waybill}`);
};

const removeAll = () => {
  return http.delete(`/shipments`);
};

const ShipmentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ShipmentService;
