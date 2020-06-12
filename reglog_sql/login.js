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

app.post('/register', function(req, res) 
{
    console.log("Registration in process in process")
    sql.connect(config, function (err) 
    {
    if (err) console.log(err);

    const Name = req.body.Name;
    const Password = req.body.Password;
    const Company = req.body.Company;
    const Email = req.body.Email;

    var request = new sql.Request();
    if (Name && Password && Company && Email) 
    {
        console.log(Name)
        request.input('Name', Name);
        request.input('Company', Company);
        request.input('Email', Email);
        request.input('Password', Password);
        request.execute("dbo.register").then(function(results, error)
        {
            console.log(results)
            console.log(error)
            console.log(results.returnValue)
			if (results.returnValue == 1) {
				res.redirect('/');
			} else {
				res.send('Email already exists');
            }		
            res.send(results);	
			res.end();
        }).catch(function(err)
        {
            console.log(err);
        });
	} else {
		res.send('Please fill all details');
		res.end();
	}
            
  });
})

app.post('/auth', function(req, res) 
{
    console.log("Auth in process")
    sql.connect(config, function (err) 
    {
    if (err) console.log(err);
    const username = req.body.username;
    const password = req.body.password;
    var request = new sql.Request();
    if (username && password) 
    {
        console.log(username)
        request.input('username', username);
        request.input('password', password);
        request.execute("dbo.login_pro").then(function(results, error)
        {
            console.log(results)
            console.log(error)
            console.log(results.returnValue)
			if (results.returnValue == 1) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
            }		
            res.send(results);	
			res.end();
        }).catch(function(err)
        {
            console.log(err);
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