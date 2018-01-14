(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Compile = require("$:/plugins/ebalster/formula/compile.js");
var Compute = require("$:/plugins/ebalster/formula/compute.js");
var Nodes   = require("$:/plugins/ebalster/formula/nodes.js");

var FormulaAttribute = function(widget, node) {
	this.widget = widget;
	this.formula = node.formula;
	try {
		this.compiledFormula = Compile.compileFormula(this.formula);
	}
	catch (err) {
		this.compiledFormula = new Nodes.ThrowError(err);
	}
	this.value = this.compute();
};

/*
Inherit from the base ??? class
*/
//FormulaAttribute.prototype = new Attribute();

FormulaAttribute.prototype.compute = function() {
	// Compute options
	this.formatOptions =
	{
		fixed:        (this.widget.getVariable("formulaFixed")),
		precision:    (this.widget.getVariable("formulaPrecision")),
		numberFormat: (this.widget.getVariable("formulaNumberFormat")),
		dateFormat:   (this.widget.getVariable("formulaDateFormat")),
	};
	// Execute the formula.
	try {
		return Compute.computeFormula(this.compiledFormula, this.widget, this.formatOptions);
	}
	catch (err) {
		return "";
	}
};

FormulaAttribute.prototype.refresh = function(changedTiddlers) {
	this.value = this.compute();
	return this.value;
};


exports.formula = FormulaAttribute;

})();
	