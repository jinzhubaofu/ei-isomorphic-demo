/**
* Copyright 2014 Baidu Inc. All rights reserved.
*
* @file TodoForm
* @author leon <ludafa@outlook.com>
*/

var React = require('react');
var PropTypes = React.PropTypes;

var TodoForm = React.createClass({

    render: function() {

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    onChange={this.onChange}
                    value={this.props.text}
                    placeholder="添加一个任务..." />
            </form>
        );
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.props.onSubmit(this.props.text);
    },

    onChange: function (e) {
        this.props.onChange(e.target.value);
    }


});

module.exports = TodoForm;
