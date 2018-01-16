(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var Compile = require("$:/plugins/ebalster/formula/compile.js");
var Compute = require("$:/plugins/ebalster/formula/compute.js");

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

	if (this.formulaError) {
		// Show an error.
		var parseTreeNodes = [{type: "element", tag: "span", attributes: {
			"class": {type: "string", value: "tc-error"}
		}, children: [
			{type: "text", text: this.formulaError}
		]}];
		this.makeChildWidgets(parseTreeNodes);
	}
	else {
		// Construct and render the child widgets.
		this.makeChildWidgets();
	}

	this.renderChildren(parent,nextSibling);
};

/*
Recompute formulas
*/
FormulaVarsWidget.prototype.formula_recompute = function() {
	// Parse variables
	var self = this;

	this.formatOptions =
	{
		fixed:        (this.getAttribute("$fixed")        || this.parentWidget.getVariable("formulaFixed")),
		precision:    (this.getAttribute("$precision")    || this.parentWidget.getVariable("formulaPrecision")),
		numberFormat: (this.getAttribute("$numberFormat") || this.parentWidget.getVariable("formulaNumberFormat")),
		dateFormat:   (this.getAttribute("$dateFormat")   || this.parentWidget.getVariable("formulaDateFormat")),
	};

	// Deprecation
	if (this.getAttribute("$toFixed")) {this.formulaError = "Change '$toFixed' to '$fixed'."; return;}
	if (this.getAttribute("$toPrecision")) {this.formulaError = "Change '$toPrecision' to '$precision'."; return;}

	if (!this.currentValues)
	{
		// Initial values
		this.currentValues = {};
		this.formulaSrc = {};
		this.formulaComp = {};
	}

	this.formulaError = null;

	try {
		if (this.getAttribute("$noRefresh")) throw "Illegal $noRefresh attribute; use $noRebuild instead.";

		$tw.utils.each(this.attributes,function(val,key) {
			if(key.charAt(0) !== "$") {
				// Recompile if necessary
				if (self.formulaSrc[key] != val) {
					self.formulaSrc[key] = val;
					try {
						self.formulaComp[key] = Compile.compileFormula(self.formulaSrc[key]);
					}
					catch (err) {
						self.formulaSrc[key] = null;
						throw "Variable " + key + ": " + String(err);
					}
				}
				// Recompute the formula
				if (self.formulaComp[key]) {
					try {
						self.currentValues[key] = Compute.computeFormula(
							self.formulaComp[key], self, self.formatOptions);
					}
					catch (err) {
						throw "Variable " + key + ": " + String(err);
					}
				}
				else {
					throw "Variable " + key + ": Formula not assigned";
				}
			}
		});
	}
	catch (err) {
		this.formulaError = String(err);
	}
};

/*
Compute the internal state of the widget
*/
FormulaVarsWidget.prototype.execute = function() {
	// Recompute formulas
	this.formula_recompute();

	if (!this.formulaError) {
		for (var key in this.currentValues) {
			this.setVariable(key, this.currentValues[key]);
		}
	}
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
FormulaVarsWidget.prototype.refresh = function formulaVarsRefresh(changedTiddlers) {
	this.computeAttributes();
	var oldValues = Object.assign({}, this.currentValues || {}), oldError = this.formulaError;
	this.formula_recompute();

	// Did any computed values change?
	var changedValues = false;
	for (var key in this.currentValues) {
		if (this.currentValues[key] !== oldValues[key]) {
			this.setVariable(key, this.currentValues[key]);
			changedValues = true;
		}
	}

	// Option to suppress full refreshing
	if (this.getAttribute("$noRebuild") === "true") changedValues = false;
	if (this.formulaError !== oldError) changedValues = true;

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
