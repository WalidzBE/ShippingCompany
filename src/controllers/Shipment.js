const _ = require('lodash');
const { Shipment } = require('../config/db.config');

// Create a new shipment
exports.create = async (req, res) => {
  const { customerAddress, customerName, customerPhoneNumber } = req.body;

  if (!customerAddress || !customerName || !customerPhoneNumber) { return res.status(400).json({ message: 'Missing data' }); }

  const shipment = Shipment.build({
    customerAddress,
    customerName,
    customerPhoneNumber,
    userId: req.user.id
  });
  try {
    const savedShipmentRes = await shipment.save();

    const resShipment = _.pick(shipment, ['waybill', 'customerAddress', 'customerName', 'customerPhoneNumber', 'userId', 'createdAt']);

    if (savedShipmentRes) { return res.status(201).send(resShipment); }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Find all user's shipments
exports.findAll = async (req, res) => {
  try {
    const shipments = await req.user.getShipments();
    return res.status(200).send(shipments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Find user's shipment with id
exports.findOne = async (req, res) => {
  const { shipmentId } = req.params;
  console.log(shipmentId);
  try {
    const shipment = await Shipment.findOne({
      where: {
        userId: req.user.id,
        waybill: shipmentId
      }
    });
    // todo error handle
    if (!shipment) { throw new Error('Shipment not found'); }
    res.status(200).send(shipment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a shipment by the id in the request
exports.updateOne = async (req, res) => {
  const { shipmentId } = req.params;
  const updatableFields = ['customerAddress', 'customerName', 'customerPhoneNumber'];

  try {
    const shipment = await Shipment.findOne({
      where: {
        userId: req.user.id,
        waybill: shipmentId
      }
    });
    if (!shipment) {
      return res.status(400).json({ message: 'Shipment not found' });
    }

    updatableFields.forEach((element) => {
      if (req.body[element]) {
        shipment[element] = req.body[element];
      }
    });

    // todo add trim to all values
    const saveValue = await shipment.save();
    console.log(saveValue);
    res.status(201).send({ message: 'Update successful' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Cancel shipment with the specified id in the request
exports.deleteOne = async (req, res) => {
  const { shipmentId } = req.params;
  try {
    const destroyRes = await Shipment.destroy({
      where: {
        userId: req.user.id,
        waybill: shipmentId
      }
    });
    if (!destroyRes) {
      return res.status(400).json({ message: 'Shipment not found' });
    }
    res.status(200).send({ message: 'Delete successful' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Cancel all user shipments
exports.deleteAll = async (req, res) => {
  console.log(req.user);
  console.log(req.user.id);
  console.log(req);
  try {
    const destroyRes = await Shipment.destroy({
      where: {
        userId: req.user.id,
      }
    });
    if (!destroyRes) {
      return res.status(400).json({ message: 'No shipments' });
    }
    res.status(200).send({ message: 'Delete successful' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
