const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 8008;

var app = express();

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	response.send('Website under maintenance, ABORT!!!');
	// response.render('maintenance.hbs')
	next();
});

app.use((request, response, next) => {
	var time = new Date().toString();
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Your Name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

app.get('/info', (request, response) => {
	response.send('My info page');
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});
