(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


var FilteredAttribute = function(widget, node) {
	this.widget = widget;
	this.filter = node.filter;
	this.compiledFilter = this.widget.wiki.compileFilter(this.filter);
	this.value = this.compute();
};

/*
Inherit from the base ??? class
*/
//FormulaAttribute.prototype = new Attribute();

FilteredAttribute.prototype.compute = function() {
	this.results = this.compiledFilter.call(this.widget.wiki, undefined, this.widget);

	// TODO why only one result?  Can we return a list??
	return this.results[0] || "";
	//return $tw.wiki.filterTiddlers(this.filter,this.widget)[0] || "";
};

FilteredAttribute.prototype.refresh = function(changedTiddlers) {
	// TODO can filters be selectively refreshed in the future?
	this.value = this.compute();
	return this.value;
};


exports.filtered = FilteredAttribute;

})();
	