(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var Formulas = require("$:/plugins/ebalster/formula/compile.js");
var Operands = require("$:/plugins/ebalster/formula/operands.js");

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
	this.rerender(parent,nextSibling);
};

FormulaWidget.prototype.rerender = function(parent, nextSibling) {

	this.removeChildDomNodes();

	// Parse the value, or, failing this, produce a text node.
	var parser = this.wiki.parseText(
		this.wikifyType, this.currentValue,
		{parseAsInline: this.wikifyMode});
	var parseTreeNodes = (parser ? parser.tree : [{type: "text", text: this.currentValue}]);

	// Construct and render the child widgets.
	this.makeChildWidgets(parseTreeNodes);
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
FormulaWidget.prototype.execute = function() {

	var oldFormula = this.formula;

	// Get parameters from our attributes
	this.formula   = this.getAttribute("formula");
	this.debug     = this.getAttribute("debug");

	this.wikifyType = this.getAttribute("outputType");
	this.wikifyMode = this.getAttribute("outputMode","block");

	this.formatOptions =
	{
		fixed:      (this.getAttribute("toFixed")     || this.getVariable("formulaFixed")),
		precision:  (this.getAttribute("toPrecision") || this.getVariable("formulaPrecision")),
		dateFormat: (this.getAttribute("dateFormat")  || this.getVariable("formulaDateFormat")),
	};

	// Compile the formula, if it has changed, yielding compiledFormula
	if(this.formula !== oldFormula) {
		if (this.formula) {
			try
			{
				this.compiledFormula = Formulas.compileFormula(this.formula);
			}
			catch (err) {this.compiledFormula = new Operands.Opd_Error(err);}
		}
		else {
			this.compiledFormula = null;
		}
	}

	// Compute the formula, yielding currentValue
	if(this.compiledFormula) {
		this.currentValue = Formulas.computeFormula(this.compiledFormula, this, this.formatOptions, Boolean(this.debug));
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
		//   We DON'T call refreshSelf() because it call execute() again
		var nextSibling = this.findNextSiblingDomNode();
		this.rerender(this.parentDomNode,nextSibling);
		return true;
	} else {
		return false;
	}

};

exports.formula = FormulaWidget;

})();
