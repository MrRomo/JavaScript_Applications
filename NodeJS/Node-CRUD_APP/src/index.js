const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
//Inicializaciones
const app = express()
require('./database')
require('./config/passport')

//Settings
app.set('port', process.env.PORT || 5000);//utiliza el puerto del servicio en la nube || usa el 3000 for default
app.set('views', path.join(__dirname, 'views')) // para configurar la ruta de la carpeta views
app.engine('.hbs', exhbs({
    defaultLayout: 'main', //corresponde al archivo de configuracion general de la aplicacion
    layoutsDir: path.join(app.get('views'),'layouts'), //configura la ruta obteniendo la direccion de views
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


//Global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.user = req.user || null 

    next();
})

//Routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

//Static files
app.use(express.static(path.join(__dirname,'public')))

//Server is listening

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})