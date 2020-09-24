const express = require('express');
require('dotenv').config();
const cors = require('cors')

// const pedidosRoutes = require('./routes/pedidos');
// const platosRoutes = require('./routes/platos');
const homeRoutes = require('./routes/home');
const usuariosRoutes = require('./routes/usuario');
require('./db.js');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.static('public'));

server.use(cors())

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/users', usuariosRoutes)
server.use('/', homeRoutes)

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});