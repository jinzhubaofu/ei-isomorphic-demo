/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file index page
* @author leon <ludafa@outlook.com>
*/

var ei = require('ei');
var Immutable = require('immutable');
var u = require('underscore');

var DetailPage = ei.Page.extend({

    view: require('./DetailView.jsx'),

    getInitialState: function (req) {
        return ei.resource.get('todo').detail(req.query.id);
    },

    reducer: function (state, action) {

        switch (action.type) {
            case 'init':
                return {
                    todo: Immutable.fromJS(action.data)
                };
            default:
                return state;
        }
    }

});

module.exports = DetailPage;
