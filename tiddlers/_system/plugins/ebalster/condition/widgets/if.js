/*\
title: $:/plugins/ebalster/condition/widgets/if.js
type: application/javascript
module-type: widget

If-condition widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var ConditionWidget = require("$:/plugins/ebalster/condition/widgets/condition.js").condition;

var IfWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
IfWidget.prototype = new ConditionWidget();

/*
Compute the internal state of the widget
*/
IfWidget.prototype.execute = function() {
	this.executeIf("$if");
};

exports.if = IfWidget;

})();