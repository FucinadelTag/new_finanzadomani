var express             = require('express')
var expressNunjucks     = require('express-nunjucks');
var dateFilter          = require('nunjucks-date-filter');
var imgxFilter          = require('./lib/nunjucks/imgx-filter');
var json_encode         = require('./lib/nunjucks/json_encode');
var markdownToHtml      = require('./lib/nunjucks/markdownToHtml');
var session             = require('express-session');
var flash               = require('express-flash');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var sassMiddleware      = require('node-sass-middleware')
var path                = require('path')
var mongoose            = require('mongoose');
const busboyBodyParser  = require('busboy-body-parser');

const fdtAdminMenu      = require('./lib/middleware/fdtAdminSetMenu.js');
const uploadImageS3     = require('./lib/middleware/uploadImageS3.js');



//APP
var app = express();
var sessionStore = new session.MemoryStore;


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

//READ ENV CONSTANT
require('dotenv').config()


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

//MONGOOSE
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//SASS MIDDLEWARE
app.use(sassMiddleware({
    /* Options */
    src: './public/styles',
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

//FdTMiddelware
app.use(fdtAdminMenu.manageActiveMenu);
app.use(uploadImageS3.uploadImageS3);


//ROUTERS
let admin = require('./routes/admin');
app.use('/admin', admin);

let index = require('./routes/index');
app.use('/', index);




app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})