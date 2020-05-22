const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const flash = require('connect-flash');
const sesion = require('express-session');
const passport = require('passport');

// Importanto el modulo para las rutas
const path = require('path');

const methodOverride = require('method-override');


// Inicializando
const app = express();
require('./Config/passport');


// CONECTANDOSE A LA BASE DE DATOS
/*mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('DB -CONNECTED-');
});*/


// Importando Rutas
//const routes = require('./Routes/routes')


// CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('common'));
// este modulo entendera la data enviada, extenteso falso porque no tendra imagenes o archivos pesados
app.use(express.urlencoded({ extended: false }));

//esta libreria permite recibir peticiones tipo PUT DELETE mas facill
app.use(methodOverride('_method'));

//
app.use(sesion({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Variable GLOBALES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));




// Rutas
app.use(require('./Routes/routes'));
app.use(require('./Routes/notes.routes'));
app.use(require('./Routes/users.routes'));


// Iniciando el servidor


module.exports = app;