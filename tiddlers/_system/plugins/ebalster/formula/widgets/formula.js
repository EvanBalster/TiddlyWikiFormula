(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var Formulas = require("$:/plugins/ebalster/formula/compile.js");

var FormulaWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
FormulaWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
FormulaWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var textNode = this.document.createTextNode(this.currentValue);
	parent.insertBefore(textNode,nextSibling);
	this.domNodes.push(textNode);
};

/*
Compute the internal state of the widget
*/
FormulaWidget.prototype.execute = function() {

	var oldFormula = this.formula;

	// Get parameters from our attributes
	this.formula   = this.getAttribute("formula");
	this.debug     = this.getAttribute("debug");
	var vPrecision = this.getAttribute("toPrecision") || this.getVariable("formulaPrecision");
	var vFixed     = this.getAttribute("toFixed")     || this.getVariable("formulaFixed");

	// Compile the formula, if it has changed, yielding compiledFormula
	if(this.formula !== oldFormula) {
		if (this.formula) {
			this.compiledFormula = Formulas.compileFormula(this.formula);
		}
		else {
			this.compiledFormula = null;
		}
	}

	// Compute the formula, yielding currentValue
	if(this.compiledFormula) {
		var numberFormat = null;
		if      (vFixed    ) numberFormat = function(num) {return num.toFixed    (vFixed);};
		else if (vPrecision) numberFormat = function(num) {return num.toPrecision(vPrecision);};
		this.currentValue = Formulas.computeFormula(this.compiledFormula, this, numberFormat, Boolean(this.debug));
	} else {
		this.currentValue = "`Error: formula not assigned`";
	}
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
FormulaWidget.prototype.refresh = function(changedTiddlers) {
	// Re-execute the filter to get the count
	this.computeAttributes();
	var oldValue = this.currentValue;
	this.execute();
	if(this.currentValue !== oldValue) {
		// Regenerate and rerender the widget and replace the existing DOM node
		this.refreshSelf();
		return true;
	} else {
		return false;
	}

};

exports.formula = FormulaWidget;

})();
