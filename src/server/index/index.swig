{%extends '../common/tpl/base.swig'%}

{%block head%}
{%endblock%}

{%block content%}
<div id="app">
{{content|raw}}
</div>
{%endblock%}

{%block script%}
<script>

var pack = {{pack|json|raw}};

require(['client/index', 'immutable', 'underscore'], function (index, Immutable, u) {
    index.bootstrap(u.mapObject(pack, function (value) {
        return Immutable.fromJS(value);
    }));
    window.pack = null;
});

</script>

{%endblock%}
