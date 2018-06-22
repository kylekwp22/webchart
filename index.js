const express = require('express');
const path = require('path');
const Chart = require('chart.js');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.get('/test', function(req,res){
	res.send(`{
	"plots": [{
			"x": 1,
			"y": 2
		},
		{
			"x": 3,
			"y": 4
		},
		{
			"x": 5,
			"y": 6
		}
	]
}`);
});

app.get('/', function(req,res){
	res.render('index',{});
});



app.listen(3000,function(){
	console.log('server started on port 3000')
});