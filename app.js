var express             = require('express')
var expressNunjucks     = require('express-nunjucks');
var dateFilter          = require('nunjucks-date-filter');
var imgxFilter          = require('./lib/nunjucks/imgx-filter');
var json_encode         = require('./lib/nunjucks/json_encode');
var markdownToHtml      = require('./lib/nunjucks/markdownToHtml');
var limitTo             = require('./lib/nunjucks/limitTo');
var arrayToString       = require('./lib/nunjucks/arrayToString');
var session             = require('express-session');
var userObject          = require('./lib/userObject');
var MongoSessionStore   = require('connect-mongo')(session);
var flash               = require('express-flash');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var sassMiddleware      = require('node-sass-middleware')
var path                = require('path')
var mongoose            = require('mongoose');
const busboyBodyParser  = require('busboy-body-parser');

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');


//READ ENV CONSTANT
require('dotenv').config()


//MONGOOSE
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//APP
var app = express();
var sessionStore = new MongoSessionStore({ mongooseConnection: db });


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, //g*h*m*s*ms
        httpOnly: false,
        secure: false
    },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.COOKIE_SECRET
}));
app.use(flash());

//LOGIN


var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //console.log (profile);
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    let userOb = new userObject (user);
    done(null, userOb);
});

app.use(passport.initialize());
app.use(passport.session());


//CONFIG NUNJUCKS
app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

njk.env.addFilter('date', dateFilter);
njk.env.addFilter('imgx', imgxFilter);
njk.env.addFilter('json_encode', json_encode);
njk.env.addFilter('markdownToHtml', markdownToHtml);
njk.env.addFilter('limitTo', limitTo);
njk.env.addFilter('arrayToString', arrayToString);





//SASS MIDDLEWARE
app.use(sassMiddleware({
    /* Options */
    src: './public',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));

//BODY
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(busboyBodyParser());

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));




//ROUTERS
let admin = require('./routes/admin');

app.use('/admin', admin);

let aziende = require('./routes/aziende');
app.use('/aziende', aziende);

let articoli = require('./routes/articoli');
app.use('/articoli', articoli);

let index = require('./routes/index');
app.use('/', index);

let user = require('./routes/user');
app.use('/user', user);



app.listen(process.env.PORT || 3030, function () {
  console.log('Example app listening on port 3030!')
})