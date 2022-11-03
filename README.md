# Shipping Company Full stack

### using MySQL Sequelize Express Node and React

## Getting Started

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/WalidzBE/ShippingCompany.git myproject

# Change directory
cd myproject

#set up a local MySql server and create `shipping_company_api` schema
#edit DB_HOST, DB_USER, and DB_PASSWORD in .env.example

# Build Client App
npm run build

# Install NPM dependencies
npm install

# Then simply start your app
npm run start
```

**Warning:** If you want to run the frontend on another port, you will need to add CORS.

```javascript
//add these lines to src/index.js
const cors = require('cors');
...
app.use(cors({
  origin: 'http://localhost:CLIENT_PORT',
  credentials: true,
}));
```
