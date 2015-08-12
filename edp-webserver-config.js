/**
 * @file 测试web服务器
 * @author Leon(leon@outlook.com)
 */

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var transform = require('react-tools').transform;
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var nib = require('nib');

function amdify(context) {
    context.content =  ''
        + 'define(function (require, exports, module) {\n'
        +     context.content
        + '\n});';
}

exports.getLocations = function () {
    return [
        {
            location: /\.jsx\.js($|\?)/,
            handler: [
                function (context) {
                    var docRoot  = context.conf.documentRoot;
                    var pathname = context.request.pathname.replace(/\.js$/, '');
                    var file = path.join(docRoot, pathname);
                    if (fs.existsSync(file)) {
                        context.header['content-type'] = mime.lookup('js');
                        context.content = fs.readFileSync(file, 'utf8');
                    }
                },
                amdify,
                function (context) {
                    context.content = transform(context.content);
                }
            ]
        },
        {
            location: function (req) {
                var pathname = req.pathname;
                return pathname.indexOf('/src') === 0
                    ? /\.js($|\?)/.test(req.pathname)
                    : false;
            },
            handler: [
                file(),
                amdify
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    'use': nib(),
                    'resolve url': true
                })
            ]
        },
        {
            location: /\.(ttf|woff|eot|svg)($|\?)/,
            handler: [
                header({
                    'Access-Control-Allow-Origin': '*'
                }),
                file()
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
