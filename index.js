const express = require('express');
const path = require('path');
const Chart = require('chart.js');
const exec = require('child_process').exec;
const fs = require('fs');
const app = express();

var content;
var json_data={"plots":[]};
// First I want to read the file
function parse_content(content){
	var array = content.toString().split('\n');
	var temp;
	json_data={"plots":[]};
	for(var i in array){
		temp = array[i].toString().split(' ');
		if(temp[0]!='' && temp[1]!=''){
				var obj = {
				"x" : parseInt(temp[0]),
				"y" : parseInt(temp[1])

			}
			json_data.plots.push(obj);
		}
		
	}
	console.log(JSON.stringify(json_data));
	console.log(json_data);
}

var fun =function(){
   console.log("fun() start");
   exec('start /D C:\\Users\\Kwangil\\Desktop\\TNE\\webchart\\bin C:\\Users\\Kwangil\\Desktop\\TNE\\webchart\\bin\\dataSetGen.exe', function(err, data) {  
	    if(err){
	       console.error(err);
	       return;
	    }
	    fs.readFile('./bin/data.dat', "utf8", function read(err, data) {
		    if (err) {
		        throw err;
		    }
		    content = data;

		    // Invoke the next step here however you like
		    //console.log(content);   // Put all of the code here (not the best solution)
		    parse_content(content);          // Or put the next step in a function and invoke it
		});
 

    });  

}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.get('/test', function(req,res){
	res.send(JSON.stringify(json_data));
});

app.post("/", function(req, res){
	fun();
	//console.log(json_data);
	res.send(json_data);
	
	
});

app.get('/', function(req,res){

	res.render('index',{mydata: json_data });
});



app.listen(3000,function(){
	console.log('server started on port 3000')
});