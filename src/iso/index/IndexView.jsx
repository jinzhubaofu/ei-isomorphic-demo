/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file index view
* @author leon <ludafa@outlook.com>
*/

var React = require('react');
var ei = require('ei');

var TodoForm = require('./component/TodoForm.jsx');
var TodoList = require('./component/TodoList.jsx');

var IndexView = React.createClass({

    render: function() {
        return (
            <section className="index-page">
                <TodoForm
                    onChange={this.props.setNewTodoText}
                    onSubmit={this.props.add}
                    text={this.props.form.get('text')} />
                <TodoList list={this.props.list} finish={this.props.finish} />
            </section>
        );
    }

});

module.exports = ei.connect(
    IndexView,
    true,
    {
        add: function (text) {

            return function (dispatch, getState) {

                dispatch({
                    type: 'TODO_ADD_START'
                });

                ei
                    .resource
                    .get('todo')
                    .add(text)
                    .then(function (todo) {

                        dispatch({
                            type: 'TODO_ADD_SUCCEED',
                            todo: todo
                        });

                    }, function (error) {

                        dispatch({
                            type: 'TODO_ADD_FAILED',
                            error: error
                        });

                    });

            };

        },

        setNewTodoText: function (text) {
            return {
                type: 'TODO_SET_NEW_TODO_TEXT',
                text: text
            };
        },

        finish: function (id) {

            return function (dispatch) {

                dispatch({
                    type: 'TODO_ADD_START'
                });

                ei
                    .resource
                    .get('todo')
                    .remove(id)
                    .then(function () {

                        dispatch({
                            type: 'TODO_REMOVE_SUCCEED',
                            id: id
                        });

                    }, function (error) {

                        dispatch({
                            type: 'TODO_REMOVE_FAILED',
                            error: error
                        });

                    });

            };

        }
    }
);
