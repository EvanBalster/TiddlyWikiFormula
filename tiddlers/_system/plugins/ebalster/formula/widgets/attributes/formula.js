(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Formulas = require("$:/plugins/ebalster/formula/compile.js");
var Nodes = require("$:/plugins/ebalster/formula/nodes.js");

var FormulaAttribute = function(widget, node) {
	this.widget = widget;
	this.formula = node.formula;
	try {
		this.compiledFormula = Formulas.compileFormula(this.formula);
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
		fixed:      (this.widget.getVariable("formulaFixed")),
		precision:  (this.widget.getVariable("formulaPrecision")),
		dateFormat: (this.widget.getVariable("formulaDateFormat")),
	};
	// Execute the formula.
	try {
		return Formulas.computeFormula(this.compiledFormula, this.widget, this.formatOptions);
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
	