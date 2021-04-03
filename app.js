// Módulos
let express = require('express');
let app = express();

let expressSession = require('express-session');
app.use(expressSession({secret: 'abcdefg', resave: true, saveUninitialized: true}));
let crypto = require('crypto');

let fileUpload = require('express-fileupload');
app.use(fileUpload());
let mongo = require('mongodb');
let swig = require('swig');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app, mongo);

app.use(express.static('public'));

//Contraseña
let fs = require('fs');
let pass = fs.readFileSync('pass.txt', 'utf-8');

// Variables
app.set('port', 8081);
app.set('db', 'mongodb://admin:' + pass + '@tiendamusica-shard-00-00-8d9nh.mongodb.net:27017,tiendamusica-shard-00-01-8d9nh.mongodb.net:27017,tiendamusica-shard-00-02-8d9nh.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority');
app.set('clave', 'abcdefg');
app.set('crypto', crypto);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD);
require("./routes/rcanciones.js")(app, swig, gestorBD);
require("./routes/rautores.js")(app, swig, gestorBD);

// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo en http://localhost:8081/");
});