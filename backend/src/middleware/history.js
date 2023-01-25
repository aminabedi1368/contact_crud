var express = require('express');
const global = require("../../variable");
const request = require("request");
var router = express.Router();

router.patch('*', function (req, res, next) {
	var options = {
		'method': 'GET',
		'url': global.postgrest + '/contacts?contact_id=eq.'+req.body.contact_id,
		'headers': {
			'Prefer': 'count=exact'
		}
	};
	request(options, function (error, response) {
		var history = JSON.parse(JSON.stringify(req.body));
		history.contact_action='UPDATE';
		history.contact_old_id=req.body.contact_id;
		delete history.contact_id;
		var options = {
			'method': 'POST',
			'url': global.postgrest + '/contacts_history',
			'headers': {
				'Prefer': 'return=representation',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(history)
		};
		request(options, function (error, response) {
			next();
		});
	});
});
router.delete('*', function (req, res, next) {

	var options = {
		'method': 'GET',
		'url': global.postgrest + '/contacts?contact_id=eq.'+req.body.contact_id,
		'headers': {
			'Prefer': 'count=exact'
		}
	};
	request(options, function (error, response) {
		var history = JSON.parse(JSON.stringify(req.body));
		history.contact_action='DELETE';
		history.contact_old_id=req.body.contact_id;
		delete history.contact_id;
		var options = {
			'method': 'POST',
			'url': global.postgrest + '/contacts_history',
			'headers': {
				'Prefer': 'return=representation',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(history)
		};
		request(options, function (error, response) {
			next();
		});
	});


});
module.exports = router;
