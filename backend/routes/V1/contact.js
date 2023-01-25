var express = require('express');
var request = require('request');
const {check, validationResult} = require('express-validator');
var global = require('../../variable');


var router = express.Router();

router.get('/', [
    check('name').isString()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var options = {
            'method': 'GET',
            'url': global.postgrest + '/contacts?order=contact_id.desc',
            'headers': {
                'Prefer': 'count=exact'
            }
        };
        request(options, function (error, response) {
            res.set('content-range', response.headers['content-range']);
            res.status(response.statusCode).send(JSON.parse(response.body));
        });
    } else {

        var contact_email = (req.query.email === undefined) ? 'undefined' : req.query.email;
        var contact_phone = (req.query.phone === undefined) ? 'undefined' : req.query.phone;
        var limit = (req.query.limit === undefined) ? '10' : req.query.limit;
        var offset = (req.query.offset === undefined) ? '0' : req.query.offset;
        var findQuery = '/contacts?or=(contact_phone.like.*' + contact_phone + '*,contact_email.like.*' + contact_email + '*,contact_name.like.*' + req.query.name + '*,contact_middle_name.like.*' + req.query.name + '*,contact_surname.like.*' + req.query.name + '*)'+'&limit='+limit+'&offset='+offset;

        if (req.query.asc) {
            findQuery = findQuery + '&order=' + req.query.asc + '.asc';
        }
        if (req.query.desc) {
            findQuery = findQuery + '&order=' + req.query.desc + '.desc';
        }
        var options = {
            'method': 'GET',
            'url': global.postgrest + findQuery,
            'headers': {
                'Prefer': 'count=exact'
            }
        };
        request(options, function (error, response) {
            res.set('content-range', response.headers['content-range']);
            res.status(response.statusCode).send(JSON.parse(response.body));
        });
    }

});

router.post('/', [
    check('contact_name').exists(),
    check('contact_phone').isMobilePhone(),
    check('contact_surname').exists()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        var options = {
            'method': 'POST',
            'url': global.postgrest + '/contacts',
            'headers': {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            },
            body: JSON.stringify(req.body)
        };
        request(options, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                res.set('content-range', response.headers['content-range']);
                res.status(response.statusCode).send(JSON.parse(response.body));
            }
        });
    }

});

router.patch('/', [
    check('contact_id').exists()
], function (req, res, next) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        var options = {
            'method': 'PATCH',
            'url': global.postgrest + '/contacts?contact_id=eq.' + req.body.contact_id,
            'headers': {
                'Prefer': 'return=representation',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        };
        request(options, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                res.set('content-range', response.headers['content-range']);
                res.status(response.statusCode).send(JSON.parse(response.body));
            }
        });
    }
});

router.delete('/', [
    check('contact_id').exists()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        var options = {
            'method': 'DELETE',
            'url': global.postgrest + '/contacts?contact_id=eq.' + req.body.contact_id,
            'headers': {
                'Prefer': 'return=representation',
                'Content-Type': 'application/json'
            }
        };
        request(options, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                res.set('content-range', response.headers['content-range']);
                res.status(response.statusCode).send(JSON.parse(response.body));
            }
        });
    }
});

module.exports = router;
