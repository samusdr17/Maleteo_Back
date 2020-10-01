const express = require('express');
require('dotenv').config();
const cors = require('cors')


const homeRoutes = require('./routes/home');
const usuariosRoutes = require('./routes/usuario');
const guardianRoutes = require('./routes/guardian');
const bultosRoutes = require('./routes/bultos');
require('./db.js');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.static('public'));

server.use(cors())

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/guardian', guardianRoutes)
server.use('/bultos', bultosRoutes)
server.use('/users', usuariosRoutes)
server.use('/', homeRoutes)

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});