<!DOCTYPE html>
<html>
<head>
    {% spaceless %}
    <meta charset="UTF-8">
    <title>Todo</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="{{feRoot|escape}}/src/client/index.styl">
    {%block head%}{%endblock%}
    {% endspaceless %}
</head>
<body>

{%spaceless%}
{%block content%}{%endblock%}
{%endspaceless%}
<script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-0-6/esl.js"></script>
{%block commonscript%}
{%spaceless%}
<script>
require.config({
    baseUrl: '{{feRoot|escape}}/src',
    paths: {
        'underscore': '../dep/underscore/underscore',
        'react': '../dep/react/react',
        'es6-promise': '../dep/es6-promise/promise',
        'axios': '../dep/axios/dist/axios.amd',
        'immutable': '../dep/immutable/dist/immutable',
        'ei': '../dep/ei/dist/ei'
    }
});
</script>
{%endspaceless%}
{%endblock%}
{%block script%}{%endblock%}
</body>
</html>
