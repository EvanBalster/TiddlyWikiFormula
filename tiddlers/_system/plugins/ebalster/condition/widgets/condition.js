/*\
title: $:/plugins/ebalster/condition/widgets/condition.js
type: application/javascript
module-type: widget

Base class for condition widgets.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ConditionWidget = function(parseTreeNode,options) {
	if(arguments.length > 0) {
		this.initialise(parseTreeNode,options);
	}
};

/*
Inherit from the base widget class
*/
ConditionWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ConditionWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    this.rerender(parent,nextSibling);
};

ConditionWidget.prototype.rerender = function(parent,nextSibling) {
	this.removeChildDomNodes();
	if (this.conditionError) {
		// Show an error.
		var parseTreeNodes = [{type: "element", tag: "span", attributes: {
			"class": {type: "string", value: "tc-error"}
		}, children: [
			{type: "text", text: this.conditionError}
		]}];
		this.makeChildWidgets(parseTreeNodes);
	}
	else if (this.isOpen) {
		// Construct and render the child widgets.
		this.makeChildWidgets(this.parseTreeNode.children);
	}
	else {
		// Destroy the child widgets.
		this.children = [];
	}
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget (default behavior)
*/
ConditionWidget.prototype.execute = function() {
	this.executeIf("$condition");
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ConditionWidget.prototype.refresh = function(changedTiddlers) {
	var currentlyOpen = this.isOpen;
	var changedAttributes = this.computeAttributes();
	this.execute();
	if(this.isOpen !== currentlyOpen) {
		var nextSibling = this.findNextSiblingDomNode();
		this.rerender(this.parentDomNode,nextSibling);
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Utility: Is a value "truthy"?
*/
ConditionWidget.prototype.valueIsTruthy = function(value) {
	// It's truthy if it's not falsy, ie, undefined, false, blank or zero.
	return !(/^\s*(undefined|false|null|0+|0*\.0+|0+\.0*|)\s*$/i.test(value));
};

/*
Utility: Find a preceding non-text widget for an "else" widget.
*/
ConditionWidget.prototype.findPrecedingConditionWidget = function() {
	var siblings = (this.parentWidget ? this.parentWidget.children : null);
	var sibling;
	if (siblings) {
		for (var i = siblings.indexOf(this)-1; i >= 0; --i) {
			sibling = siblings[i];
			if (sibling.parseTreeNode.type == "text") continue;
			if (sibling.isOpen != null || sibling.list != null) return sibling;
			return null;
		}
	}
	return null;
};

/*
Utility: Test if another widget triggers an "else"; ie, false conditions, closed reveals, empty lists.
*/
ConditionWidget.prototype.widgetTriggersElse = function(widget) {
	// Condition widgets
	if (widget.triggerElse != null) return widget.triggerElse;
	// Reveal widget
	if (widget.isOpen != null) return !widget.isOpen;
	// List widget
	if (widget.list != null) return (widget.list instanceof Array) && widget.list.length == 0;
};

/*
Utility: Execute as an "else" condition, computing isOpen and conditionError accordingly.
*/
ConditionWidget.prototype.executeElse = function(widgetName) {
	this.isOpen = false;
	this.conditionError = null;
	this.triggerElse = false;
	var predicate = this.findPrecedingConditionWidget();
	if (!predicate) {
		this.conditionError = (widgetName||"$else") + " widget must follow $if, $else-if, $reveal or $list.";
		return;
	}
	this.isOpen = this.widgetTriggersElse(predicate);
};

/*
Utility: Execute as an "if" condition, computing isOpen and conditionError accordingly.
*/
ConditionWidget.prototype.executeIf = function(widgetName) {
	this.isOpen = false;
	this.conditionError = null;
	this.triggerElse = false;
    // Re-check our "if" condition.
	var value = this.getAttribute("value");
	var match = this.getAttribute("match");
	if (value == null) {
		this.conditionError = (widgetName||"$condition") + " widget requires a 'value' attribute.";
		return;
	}
	else if (match == null) {
		// Open if the value is truthy.
		this.isOpen = this.valueIsTruthy(value);
	}
	else {
		this.isOpen = (value == match);
	}
	if (this.getAttribute("not")) {
		this.isOpen = !this.isOpen;
	}
	this.triggerElse = !this.isOpen;
};

exports.condition = ConditionWidget;

})();