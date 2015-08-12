/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file client todo resource
* @author leon <ludafa@outlook.com>
*/

var axios = require('axios');

exports.list = function () {
    return axios
        .get('/list')
        .then(function (response) {
            return response.data;
        });
};

exports.detail = function (id) {
    return axios
        .get('/detail', {
            params: {
                id: id
            }
        })
        .then(function (response) {
            return response.data;
        });
};

exports.add = function (text) {
    return axios
        .post('/add', {text: text})
        .then(function (response) {
            return response.data;
        });
};

exports.remove = function (id) {
    return axios
        .post('/remove', {id: id})
        .then(function (response) {
            return response.data;
        });
};
