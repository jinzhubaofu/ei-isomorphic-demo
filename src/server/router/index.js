/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file router / index
* @author leon <ludafa@outlook.com>
*/

var express = require('express');

var router = new express.Router();

var ei = require('ei');

var app = new ei.App({
    basePath: require('path').join(__dirname, '../../'),
    routes: require('../../iso/routes.js')
});

router.use(function (req, res, next) {

    if (req.xhr) {
        console.log('ajax passed');
        next();
        return;
    }

    app
        .execute(req)
        .then(function (result) {
            var page = result.page;
            res
                .status(200)
                .render(
                    result.route.template,
                    {
                        feRoot: 'http://localhost:8848',
                        content: page.renderToString(),
                        pack: page.getState() || {}
                    }
                );
        }).catch(function (error) {

            if (error.status === 404) {
                next();
                return;
            }

            console.error(error.stack);

        });

});

module.exports = router;
