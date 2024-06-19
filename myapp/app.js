var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const data = require("./database/models");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productoRouter = require("./routes/producto");

var app = express();

// view engine setup .....
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* configuracion para session */
app.use(session({
  secret: "myapp",
  resave: false,
  saveUninitialized: true,
}));

/* de session a locals */
/* haders si esta o no logueado*/
app.use(function(req, res, next){
  if(req.session.usuarioLogueado != undefined){
    res.locals.usuarioLogueado = req.session.usuarioLogueado
  }
  return next()
});

/* configuracion de cookies*/
app.use(function(req, res, next){
  if (req.cookies.login != undefined && req.session.usuarioLogueado == undefined) {
    //id del usuario que se logueo 
    let id = req.cookies.login;
    
    data.Usuario.findByPk(id)
    .then(function(result){
      //recuperar la informacion del usuario una vez q vuleve a entrar
      req.session.usuarioLogueado = result;
      res.locals.usuarioLogueado

      return next;
    }).catch(function(err){
      return console.log(err);
    }); 
  } else {
    return next()
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/producto", productoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
