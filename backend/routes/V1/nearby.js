var express = require('express');

const {check, validationResult} = require('express-validator');
const pool = require('../../src/config/postgres-config');

var router = express.Router();

router.post('/', [
    check('location').exists().isObject(),
    check('distance').exists()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        var queryDistance="SELECT * FROM contacts WHERE ST_DWithin(geometry(contact_location), ST_MakePoint("+req.body.location.lat+","+ req.body.location.lng+")::geography, "+req.body.distance+")";
        // console.log(queryDistance);
        pool.query(queryDistance, (error, results) => {
            if (error) {
                res.send(error);
            }
            res.send(results.rows);
        })
    }

});

module.exports = router;
