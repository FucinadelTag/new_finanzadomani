var express                 = require('express')
var expressNunjucks         = require('express-nunjucks');
var dateFilter              = require('nunjucks-date-filter');
var imgxFilter              = require('./lib/nunjucks/imgx-filter');
var json_encode             = require('./lib/nunjucks/json_encode');
var markdownToHtml          = require('./lib/nunjucks/markdownToHtml');
var limitTo                 = require('./lib/nunjucks/limitTo');
var arrayToString           = require('./lib/nunjucks/arrayToString');
const fdtBusboyBodyParser   = require('./lib/middleware/fdtBusboyBodyParser');
var session                 = require('express-session');
var userObject              = require('./lib/userObject');
var MongoSessionStore       = require('connect-mongo')(session);
var flash                   = require('express-flash');
var cookieParser            = require('cookie-parser');
var bodyParser              = require('body-parser');
var sassMiddleware          = require('node-sass-middleware')
var path                    = require('path')
var mongoose                = require('mongoose');



var passport = require('passport');
var Auth0Strategy = require('passport-auth0');


//READ ENV CONSTANT
require('dotenv').config()


//MONGOOSE
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
mongoose.Promise = require('bluebird');
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//APP
var app = express();

//SASS MIDDLEWARE
app.use(sassMiddleware({
    /* Options */
    src: './public',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));
//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MongoSessionStore({ mongooseConnection: db });


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000, //g*h*m*s*ms
        httpOnly: true,
        secure: false
    },
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
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
    console.log (user);
    done(null, user.id);
});

var FdTUser   = require('./models/User');
passport.deserializeUser(function(userId, done) {

    FdTUser.
        findOne().
        where('auth0Id').equals(userId).
        exec(function (err, userOk) {
            if (err) return console.error(err);
            let userOb = new userObject (userOk);
            done(null, userOb);
        });
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


//BODY
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fdtBusboyBodyParser({ limit: '250mb' }));

var fdtUser  = require('./lib/middleware/fdtUser.js');
app.use(fdtUser.init);


//ROUTERS
let admin = require('./routes/admin');
app.use('/admin', admin);

let api = require('./routes/api');
app.use('/api', api);

let aziende = require('./routes/aziende');
app.use('/aziende', aziende);

let articoli = require('./routes/articoli');
app.use('/articoli', articoli);

let index = require('./routes/index');
app.use('/', index);

let account = require('./routes/account');
app.use('/account', account);




app.listen(process.env.PORT || 3030, function () {
  console.log('Example app listening on port 3030!')
})