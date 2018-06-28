var express =require('express');
var users = require('./routes/user');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');

var app = express();
var connection =mysql.createConnection({
					host 	 : 'localhost',
					user 	 : 'root',
					password : '123456',
					database : 'samp',
					port	 : '3306'
					});

connection.connect();

global.db = connection;

app.set('port',process.env.PORT || 8000);
app.set('views',path.join(__dirname,"/views"));
app.set('view engine','ejs');

app.use(session({
	secret : "It's a Secret!",
	resave : false,
	saveUninitialized : true,
	cookie : {maxAge : 24*60*60*1000}
	}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/home',users.home);
app.get('/login',users.login);
app.post('/login',users.login);
app.get('/signup',users.signup);
app.post('/signup',users.signup);
app.get('/dashboard',users.dashboard);
app.get('/logout',users.logout);

app.listen(8000);
