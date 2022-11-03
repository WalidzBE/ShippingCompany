const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: 'shipping_company_api',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models
const User = require('../models/User')(sequelize);
const Shipment = require('../models/Shipment')(sequelize);

// add associations
User.hasMany(Shipment, { foreignKey: { name: 'userId' }, onDelete: 'CASCADE' });
Shipment.belongsTo(User, { foreignKey: { name: 'userId' }, onDelete: 'CASCADE' });

(async () => {
  await User.sync();
  await Shipment.sync();
})();

// add models to db object
db.User = User;
db.Shipment = Shipment;

module.exports = db;
