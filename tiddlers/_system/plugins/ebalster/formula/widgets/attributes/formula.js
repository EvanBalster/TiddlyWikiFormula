(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Formulas = require("$:/plugins/ebalster/formula/compile.js");
var Operands = require("$:/plugins/ebalster/formula/operands.js");

var FormulaAttribute = function(widget, node) {
	this.widget = widget;
	this.formula = node.formula;
	try {
		this.compiledFormula = Formulas.compileFormula(this.formula);
	}
	catch (err) {
		this.compiledFormula = new Operands.Opd_Error(err);
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
	return Formulas.computeFormula(this.compiledFormula, this.widget, this.formatOptions);
};

FormulaAttribute.prototype.refresh = function(changedTiddlers) {
	this.value = this.compute();
	return this.value;
};


exports.formula = FormulaAttribute;

})();
	