var http = require('http');
var url = require('url');
var request = require('request');
var parseJson = require('parse-json');
var configs = require('./settings.json');

http.createServer(function (req, thisServerResponse) {
  thisServerResponse.writeHead(200, {'Content-Type': 'text/html'});
  
  var image_tags = "Tags";

  var credentials = {
  	'apiKey': configs.apiKey,

  	/* Ideally you should use apiKey. 
  	For testing purposes, however you can use your creds as follows also
	*//*

  	'username': configs.username,
  	'hash': configs.hash,
  	'password': configs.password,
  	*/
  };
  
  request.post({
  	url:'https://api.textlocal.in/get_messages/?', 
  	form: Object.assign({'inbox_id': configs.inbox_id}, credentials)
  }, function(err,httpResponse,body){
	var msgs = parseJson(body).messages;
	var lastMsg = msgs[msgs.length-1];
	var lastMsgTxt = lastMsg.message;
	var actualMsgTxt = lastMsgTxt.replace(configs.textlocal_tag+" ","");
	var image_url = actualMsgTxt.replace("Recognise=","");
	var sender = lastMsg.number;

	console.log(image_url);
	request.post({url:'https://developer.blippar.com/portal/vs-api/website-trial/', form: 
	  {'upload_type': 'async','paste_image_url': image_url}
	}, function(err,httpResponse,body)	{
	  var tags = parseJson(body).tags;
	  image_tags = tags;
	  var stringTags = '"'+tags.join('", "')+'"';

	  request.post({
	  	url: 'https://api.textlocal.in/send/?', 
	  	form: Object.assign({'numbers': sender, 'message' : stringTags, 'test': true}, credentials)
	  }, function(err,httpResponse,body){
	  	thisServerResponse.end(stringTags);
	  });	  
	});
  });
  
}).listen(8080);
