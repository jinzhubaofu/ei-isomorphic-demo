/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file ajax
* @author leon <ludafa@outlook.com>
*/

var express = require('express');

var router = new express.Router();

var resource = require('../common/resource/todo.js');

router.get('/list', function (req, res) {

    console.log('list');


    resource.list().then(function (list) {

        res.status(200).send(list);

    });

});

router.get('/detail', function (req, res) {

    console.log('detail');

    resource.detail(req.query.id).then(function (todo) {
        res.status(200).send(todo);
    })

});

router.post('/add', function (req, res) {

    resource.add(req.body.text).then(function (todo) {
        res.status(200).send(todo);
    });

});

router.post('/remove', function (req, res) {

    resource.remove(req.body.id).then(function () {
        res.status(200).end();
    });

});


module.exports = router;
