const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('./config/db');
const setupRoutes = require('./app/App');

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Allimages', express.static(__dirname + '/Allimages'));
setupRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});
