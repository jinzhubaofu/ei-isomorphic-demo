/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file Detail View
* @author leon <ludafa@outlook.com>
*/

var React = require('react');
var ei = require('ei');

var DetailView = React.createClass({

    render: function() {

        var todo = this.props.todo;
        var id = todo.get('id');

        var time = new Date(parseInt(id, 36));

        return (
            <div className="detail-page">
                <h3>{todo.get('text')}</h3>
                <p>{time.toString()}</p>
                <a href="#" onClick={this.onReturn}>返回全部</a>
            </div>
        );

    },

    onReturn: function (e) {
        if (ei.locator.redirect('/')) {
            e.preventDefault();
        }
    }

});

module.exports = ei.connect(
    DetailView,
    true
);
