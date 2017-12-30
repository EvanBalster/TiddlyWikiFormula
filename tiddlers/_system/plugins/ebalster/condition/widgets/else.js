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

var ElseWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ElseWidget.prototype = new ConditionWidget();

/*
Compute the internal state of the widget
*/
ElseWidget.prototype.execute = function() {
	// Execute as an else condition.
	this.executeElse("$else");
};

exports.else = ElseWidget;

})();