var express = require('express');
var request = require('request');
var global = require('../../variable');

var router = express.Router();

router.get('/', function (req, res, next) {
    const fs = require('fs');
    var request = require('request');
    
    let rawdata = fs.readFileSync('./MOCK_DATA.json');
    let MOCK_DATA = JSON.parse(rawdata);
    
    let locations = fs.readFileSync('./codersTool.json');
    let locaios_latlng = JSON.parse(locations);
    
    let contacts = MOCK_DATA.map((item, i) => Object.assign({}, item, locaios_latlng[i]));
    
    contacts.forEach(element => {
        var options = {
            'method': 'POST',
            'url': global.postgrest + '/contacts',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
    
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    });
    
    res.send("start");


});


module.exports = router;
