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

var ElifWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ElifWidget.prototype = new ConditionWidget();

/*
Compute the internal state of the widget
*/
ElifWidget.prototype.execute = function() {
	this.executeElse("$else-if");
	if (this.isOpen) this.executeIf("$if");
};

exports["else-if"] = ElifWidget;

})();