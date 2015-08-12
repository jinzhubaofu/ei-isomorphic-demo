/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file
* @author leon <ludafa@outlook.com>
*/

var fs = require('fs');
var transform = require('react-tools').transform;
var swig = require('swig');

require.extensions['.jsx'] = function (module, filename) {
    var source = fs.readFileSync(filename, 'utf8');
    var code = transform(source);
    module._compile(code);
};

var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app
    .engine('swig', swig.renderFile)
    .set('view engine', 'swig')
    .set('views', __dirname)
    .set('view cache', false)
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(require('./router/index.js'))
    .use(require('./router/ajax.js'))
    .listen(8188, function () {
        console.log('http://localhost:8188');
    });

var ei = require('ei');

ei.events.on('*', function () {
    console.log(this.getCurrentEvent());
});

ei.resource.register('todo', require('./common/resource/todo.js'));
