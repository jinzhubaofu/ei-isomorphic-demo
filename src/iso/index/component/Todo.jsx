/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file todo
* @author leon <ludafa@outlook.com>
*/

var React = require('react');
var ei = require('ei');

var Todo = React.createClass({

    render: function() {

        var todo = this.props.todo;

        return (
            <div className="todo">
                <input type="checkbox" onChange={this.onCheckBoxChange} />
                <a href="#" onClick={this.onDetail}>{todo.get('text')}</a>
            </div>
        );

    },

    onDetail: function (e) {

        var query = {id: this.props.todo.get('id')};

        if (ei.locator.redirect('/detail', query)) {
            e.preventDefault();
        }

    },

    onCheckBoxChange: function () {
        this.props.onFinish(this.props.todo.get('id'));
    }

});

module.exports = Todo;
