(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['subDisplay'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article id='"
    + alias4(((helper = (helper = helpers.zipCode || (depth0 != null ? depth0.zipCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zipCode","hash":{},"data":data}) : helper)))
    + "' class=\"sub-display\" onmouseover='"
    + alias4(((helper = (helper = helpers.disappear || (depth0 != null ? depth0.disappear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"disappear","hash":{},"data":data}) : helper)))
    + "' onmouseout='"
    + alias4(((helper = (helper = helpers.appear || (depth0 != null ? depth0.appear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"appear","hash":{},"data":data}) : helper)))
    + "'>\n  <div id='back' class='hidden'>\n  <button class=\"sub-delete\" onclick=\""
    + alias4(((helper = (helper = helpers.remove || (depth0 != null ? depth0.remove : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"remove","hash":{},"data":data}) : helper)))
    + "\">Delete</button>\n  </div>\n\n  <div id='front'>\n  <h1>"
    + alias4(((helper = (helper = helpers.temperature || (depth0 != null ? depth0.temperature : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temperature","hash":{},"data":data}) : helper)))
    + "<span>&#8457;</span></h1>\n  <h2>"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</h2>\n</div>\n</article>\n";
},"useData":true});
})();