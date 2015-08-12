/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file client index.js
* @author leon <ludafa@outlook.com>
*/

var ei = require('ei');

var app = new ei.App({

    routes: require('../iso/routes'),

    main: 'app'

});

ei.resource.register('todo', require('./common/resource/todo'));

ei.events.on('*', function () {
    console.log(this.getCurrentEvent(), arguments);
});

var axios = require('axios');

axios.interceptors.request.use(function (config) {

    var headers = config.headers;

    if (!headers) {
        headers = config.headers = {};
    }

    headers['X-Requested-With'] = 'XMLHttpRequest';

    return config;

});

module.exports = app;
