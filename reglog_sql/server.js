const sql = require('mssql');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');



var config = {
    user: 'sa',
    password: 'jathin@123',
    server: 'localhost', 
    database: 'calender' 
};
// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'nodelogin'
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(req, res) 
{
    console.log("Auth in process")
    sql.connect(config, function (err) 
    {
    if (err) console.log(err);
    // query to the database and get the records

    const username = req.body.username;
    const password = req.body.password;
    var request = new sql.Request();
	if (username && password) {
        request.query('SELECT * FROM accounts WHERE username = ? AND password = ? ', [username, password], function(error, results, fields)
         {
            console.log(results);
            console.log(results.length)
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
            }		
            //res.send(results);	
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
            
  });
})

app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

const server = app.listen(5000, function () {
    console.log('Server is running..');
});