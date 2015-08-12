/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file server todo resource
* @author leon <ludafa@outlook.com>
*/

var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;

var db = path.join(__dirname, './db.json');

exports.list = function () {

    return new Promise(function (resolve, reject) {

        fs.readFile(db, 'utf8', function (err, data) {

            if (err) {
                reject(err);
                return;
            }

            try {
                data = JSON.parse(data);
                resolve(data);
            }
            catch (err) {
                reject(err);
            }

        });

    });

};

exports.detail = function (id) {

    return exports.list().then(function (all) {

        for (var i = 0, len = all.length; i < len; ++i) {
            if (all[i].id === id) {
                return all[i];
            }
        }

        return null;

    });

};

function save(data) {

    return new Promise(function (resolve, reject) {

        fs.writeFile(db, JSON.stringify(data), 'utf8', function (error) {

            if (error) {
                reject(error);
                return;
            }

            resolve();

        });

    });
}

exports.add = function (text) {

    return exports
        .list()
        .then(function (list) {

            var todo = {
                text: text,
                id: new Date().getTime().toString(36)
            };

            list = list.concat(todo);

            return save(list)
                .then(function () {
                    return todo;
                });

        });

};

exports.remove = function (id) {

    return exports.list().then(function (list) {

        list = list.filter(function (todo) {
            return todo.id !== id;
        });

        return save(list);

    });

};
