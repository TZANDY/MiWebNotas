const mongoose = require('mongoose');

const { APP_MONGODB_HOST, APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${APP_MONGODB_HOST}/${APP_MONGODB_DATABASE}`;

// CONECTANDOSE A LA BASE DE DATOS
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db => console.log('DB IS CONNECTED'))
    .catch(err => console.log(err));