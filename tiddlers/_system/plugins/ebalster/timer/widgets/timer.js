/*\
title: $:/plugins/ebalster/timer/widgets/timer.js
type: application/javascript
module-type: widget

Widget for triggering ActionWidgets on a timed interval

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var TimerWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
TimerWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
TimerWidget.prototype.render = function(parent,nextSibling) {
	var self = this;
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
	// The timer callback...
	var timerWidgetFunction = function timerWidgetFunction() {
		// Only perform actions if the TimerWidget is still in the widget tree.
		if (self.stillInWidgetTree()) {
			var event = new CustomEvent("TimerWidget");
			self.invokeActions(self,event);
			if(self.message) self.dispatchMessage(event);
			//if(self.set)     self.setTiddler();
			if(self.actions) self.invokeActionString(self.actions,self,event);
		}
	};
	// How long should we wait?
	if (window) {
		// Unregister the old timer event
		if (this.timeoutID)  window.clearTimeout (this.timeoutID);
		if (this.intervalID) window.clearInterval(this.intervalID);
		this.timeoutID = this.intervalID = null;
		if (this.time && this.time.length) {
			var currentTime = Date.now(), targetTime = null;
			if (this.time.length >= 14) {
				//TiddlyWiki date in native format
				targetTime = $tw.utils.parseDate(this.time);
				if (targetTime) targetTime = targetTime.getTime();
			}
			else {
				//Unix epoch time in milliseconds
				targetTime = parseFloat(this.time);
			}
			if (targetTime && targetTime > currentTime) {
				// Register a timeout event
				this.timeoutID = window.setTimeout(timerWidgetFunction, targetTime-currentTime);
			}
		}
		else if (this.interval && this.interval.length) {
			var interval = parseFloat(this.interval);
			if (interval && interval > 0) {
				// Register an interval event
				this.intervalID = window.setInterval(timerWidgetFunction, interval*1000);
			}
		}
		
	}
};

/*
Detect if the timer widget is still in the tree, by crawling up to the RootWidget.
*/
TimerWidget.prototype.stillInWidgetTree = function() {
	var widget = this;
	while (widget) {
		var parent = widget.parentWidget;
		if (parent) {
			// Return false if some ancestor has disowned us.
			if (!parent.children || parent.children.indexOf(widget) < 0) return false;
		}
		else {
			// Return true if we get to the root widget.
			return widget === $tw.rootWidget;
		}
		widget = parent;
	}
};

/*
We don't allow actions to propagate because we trigger actions ourselves
*/
TimerWidget.prototype.allowActionPropagation = function() {
	return false;
};

TimerWidget.prototype.dispatchMessage = function(event) {
	this.dispatchEvent({type: this.message, param: this.param, tiddlerTitle: this.getVariable("currentTiddler"), event: event});
};

/*TimerWidget.prototype.setTiddler = function() {
	this.wiki.setTextReference(this.set,this.setTo,this.getVariable("currentTiddler"));
};*/

/*
Compute the internal state of the widget
*/
TimerWidget.prototype.execute = function() {
	// Get attributes
	this.actions = this.getAttribute("actions");
	this.message = this.getAttribute("message");
	this.param = this.getAttribute("param");
	this.interval = this.getAttribute("interval");
	this.time = this.getAttribute("time");
	//this.set = this.getAttribute("set");
	//this.setTo = this.getAttribute("setTo");
	// Make child widgets
	this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
TimerWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.time || changedAttributes.interval || changedAttributes.message || changedAttributes.param || changedAttributes.actions) {
		// || changedAttributes.set || changedAttributes.setTo || (this.set && changedTiddlers[this.set])
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports.timer = TimerWidget;

})();
