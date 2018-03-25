var https = require('https');
var request = require('request');
var parseJson = require('parse-json');
var FormData = require('form-data');
var fs = require('fs');
var configs = require('./settings.json');

var headers = {
    'cache-control': 'no-cache',
    'content-type': 'application/json'
};

var getAccessTokenOptions = {
    url: 'https://bauth.blippar.com/token',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: configs.blipparVsClientId,
        client_secret: configs.blipparVsClientSecret
    })
};

function imageLookup(access_token, image_binary, CB)  {
    var imageForm = new FormData();    
    imageForm.append('input_image', image_binary);

    var request = https.request({
        method: 'post',
        host: 'bapi.blippar.com',
        path: '/v1/imageLookup',
        headers: Object.assign({
                'Authorization': 'Bearer '+access_token,
            },
            headers,
            imageForm.getHeaders()
        )
    });

    imageForm.pipe(request);

    var data = '';

    request.on('response', function(res) {
        res.on('data', function (chunk) {
            data+=chunk.toString();        
        });
        res.on('end', function () {
            var identifications = parseJson(data);
            var tags = [];
            for (let i=0; i<identifications.length; i++)    {
                tags.push(identifications[i].DisplayName);
            }
            CB(tags);            
        });
    });
}

function downloadImage(access_token, image_url, CB)    {
    function downloadImageCB(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile('image_file', body, (err)=>{
                imageLookup(access_token, body, CB);
            })
        }
    }

    request({
        url: image_url,
        encoding: null
    }, downloadImageCB);
}

function getTags(image_url, CB) {
    request(getAccessTokenOptions, function(error, response, body)    {
        var access_token = parseJson(body).access_token;    
        downloadImage(access_token, image_url, CB);
    });
}

module.exports = {
    getTags: getTags
};
