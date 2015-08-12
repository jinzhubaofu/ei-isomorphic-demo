/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file index page
* @author leon <ludafa@outlook.com>
*/

var ei = require('ei');
var Immutable = require('immutable');
var u = require('underscore');

var IndexPage = ei.Page.extend({

    view: require('./IndexView.jsx'),

    getInitialState: function (req) {
        return ei
            .resource
            .get('todo')
            .list()
            .then(function (all) {
                return {
                    list: all
                };
            });
    },

    reducer: {

        form: function (state, action) {

            switch (action.type) {

                case 'init':
                    return Immutable.fromJS({});

                case 'TODO_SET_NEW_TODO_TEXT':
                    return state.set('text', action.text);

                case 'TODO_ADD_SUCCEED':
                    return state.set('text', '');

                default:
                    return state;
            }
        },

        list: function (list, action) {

            switch (action.type) {

                case 'init':
                    return Immutable.fromJS(action.data.list || []);

                case 'TODO_ADD_SUCCEED':
                    return list.push(Immutable.fromJS(action.todo));

                case 'TODO_REMOVE_SUCCEED':
                    return list.filter(function (todo) {
                        return todo.get('id') !== action.id;
                    });

                default:
                    return list;

            }

        }

    }

});

module.exports = IndexPage;
