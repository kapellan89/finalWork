const app = require('express')();
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config.js');
const electronicsData = require('../data/electronics.json')
const appliancesData = require('../data/appliances.json')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const Joi = require('joi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Schema = mongoose.Schema;
const flash = require('connect-flash');


const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('dev'));
/*  PASSPORT SETUP  */


app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(flash())
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})

//Обработка регистрации
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
},{ versionKey: false });
 
const User = mongoose.model('user', userSchema);

const usersSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
})

app.post('/registration')
  app.post('/registration', async (req, res, next) => {
      console.log(req.body);
    try {
      const result = Joi.validate(req.body, usersSchema)
      if (result.error) {
        console.log('error', 'Data entered is not valid. Please try again.')
        res.redirect('/registration')
        return
      }
 
      const user = await User.findOne({ 'email': result.value.email })
      if (user) {
        req.flash('error', 'Email is already in use.')
        res.redirect('/registration')
        return
      }
      const newUser = await new User(result.value)
      await newUser.save()
      console.log('it is work3');
      req.flash('success', 'Registration successfully, go ahead and login.')
      res.redirect('/autorization')
 
    } catch(error) {
      next(error)
    }
  })

app.get('/api/data/electronics', function(req, res, next){
   res.json(electronicsData); 
   console.log('electronicsData отправлен на клиент')
});
app.get('/api/data/appliances', function(req, res, next){
    res.json(appliancesData);
});


//Обработка авторизации
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findOne({
         username 
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        
        if (!user) {
          console.log('name err');
          return done(null, false);
        }

        if (user.password != password) {
          console.log('pass err');
          return done(null, false);
        }
        return done(null, user);
      });
      
  }
));

app.post('/autorization',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/personal');
  });
 
 app.get('/personal',
    function(req,res,next){
        if(req.user===undefined){
            res.redirect('/autorization')
        }else{
            next()
        }
    })

app.post('/personal',
    function(req,res){
    res.json(req.user);
})


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    app.listen(8000, ()=>{
       console.log('Server run in 8000 port'); 
    });
  });