(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var Formulas = require("$:/plugins/ebalster/formula/compile.js");
var Operands = require("$:/plugins/ebalster/formula/operands.js");

var FormulaVarsWidget = function(parseTreeNode,options) {
	// Call the constructor
	Widget.call(this);
	// Initialise	
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
FormulaVarsWidget.prototype = Object.create(Widget.prototype);

/*
Render this widget into the DOM
*/
FormulaVarsWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Recompute formulas
*/
FormulaVarsWidget.prototype.formula_recompute = function() {
	// Parse variables
	var self = this;

	var vPrecision = this.getAttribute("$toPrecision") || this.parentWidget.getVariable("formulaPrecision");
	var vFixed     = this.getAttribute("$toFixed")     || this.parentWidget.getVariable("formulaFixed");

	this.format =
	{
		fixed:     (this.getAttribute("$toFixed")     || this.parentWidget.getVariable("formulaFixed")),
		precision: (this.getAttribute("$toPrecision") || this.parentWidget.getVariable("formulaPrecision")),
	};
	var numberFormat = Formulas.numberFormatSelect(this.format);

	if (!this.currentValues)
	{
		// Initial values
		this.currentValues = {};
		this.formulaSrc = {}
		this.formulaComp = {};
	}

	$tw.utils.each(this.attributes,function(val,key) {
		if(key.charAt(0) !== "$") {
			// Recompile if necessary
			if (self.formulaSrc[key] != val) {
				self.formulaSrc[key] = val;
				try {
					self.formulaComp[key] = Formulas.compileFormula(self.formulaSrc[key]);
				}
				catch (err) {
					self.formulaComp[key] = new Operands.Opd_Error(err);
				}
			}
			// Recompute the formula
			if (self.formulaComp[key]) {
				self.currentValues[key] = Formulas.computeFormula(
					self.formulaComp[key], self, numberFormat);
			}
			else {
				self.currentValues[key] = "Error: formula not assigned";
			}
		}
	});
}

/*
Compute the internal state of the widget
*/
FormulaVarsWidget.prototype.execute = function() {
	// Recompute formulas
	this.formula_recompute();

	for (var key in this.currentValues) {
		this.setVariable(key, this.currentValues[key]);
	}

	// Construct the child widgets
	this.makeChildWidgets();
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
FormulaVarsWidget.prototype.refresh = function formulaVarsRefresh(changedTiddlers) {
	this.computeAttributes();
	var oldValues = Object.assign({}, this.currentValues || {});
	this.formula_recompute();

	// Did any computed values change?
	var changedValues = false;
	for (var key in this.currentValues) {
		if (this.currentValues[key] !== oldValues[key]) {
			this.setVariable(key, this.currentValues[key]);
			changedValues = true;
		}
	}

	if(changedValues) {
		// Regenerate and rerender the widget and replace the existing DOM node
		this.refreshSelf();
		return true;
	} else {
		return this.refreshChildren(changedTiddlers);
	}
};

exports["formula-vars"] = FormulaVarsWidget;

})();
