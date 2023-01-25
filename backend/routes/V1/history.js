var express = require('express');

const {check, validationResult} = require('express-validator');
var global = require('../../variable');
const request = require("request");

var router = express.Router();

router.get('/', [
    check('contact_id').isString()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        var limit = (req.query.limit === undefined) ? '10' : req.query.limit;
        var offset = (req.query.offset === undefined) ? '0' : req.query.offset;

        var options = {
            'method': 'GET',
            'url': global.postgrest + '/contacts_history?contact_old_id=eq.'+req.query.contact_id+'&limit='+limit+'&offset='+offset,
            'headers': {
                'Prefer': 'count=exact'
            }
        };
        request(options, function (error, response) {
            var NOW_options = {
                'method': 'GET',
                'url': global.postgrest + '/contacts?contact_id=eq.'+req.query.contact_id,
                'headers': {
                    'Prefer': 'count=exact'
                }
            };
            request(NOW_options, function (NOW_error, NOW_response) {
                var result={
                    now:JSON.parse(NOW_response.body)[0],
                    history:JSON.parse(response.body),
                    page:response.headers['content-range']
                }
                res.set('content-range', response.headers['content-range']);
                res.status(response.statusCode).send(result);
            });
        });
    }

});

module.exports = router;


