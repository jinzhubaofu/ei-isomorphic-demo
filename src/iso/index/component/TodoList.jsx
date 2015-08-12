/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file TodoList
* @author leon <ludafa@outlook.com>
*/

var React = require('react');
var PropTypes = React.PropTypes;

var Todo = require('./Todo.jsx');

var TodoList = React.createClass({

    render: function() {

        var list = this.props.list;

        if (!list.size) {
            return null;
        }

        return (
            <div className="todo-list">
                {list.map(function (todo, index) {
                    return (
                        <Todo
                            key={todo.get('id')}
                            todo={todo}
                            onFinish={this.props.finish} />
                    );
                }, this)}
            </div>
        );

    }

});

module.exports = TodoList;
