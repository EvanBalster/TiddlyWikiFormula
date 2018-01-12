/*\
title: $:/plugins/ebalster/formula/operands.js
type: application/javascript
module-type: macro

Library defining formula operands.
Operands represent some value within the formula: an expression, datum, operator, constant or query...
Operands may be constant, allowing the formula compiler to optimize them away.

\*/
(function(){

"use strict";

var Values   = require("$:/plugins/ebalster/formula/value.js");

exports.Operand = function() {
};
exports.Operand.prototype.is_constant = false;
exports.Operand.prototype.name = "unknown-operand";
exports.Operand.prototype.toString = function()    {return "[Operand " + this.name + "]";};

// Operand::compute -- produce
exports.Operand.prototype.compute = (function(widget, recur) {return new Values.V_Undefined();});


// An operand that just throws an error.
exports.Opd_Error = function(exception) {
	this.exception = exception;
};
exports.Opd_Error.prototype = new exports.Operand();
exports.Opd_Error.prototype.name = "error";
exports.Opd_Error.prototype.compute = function(widget, recur)
{
	// Throw up
	throw this.exception;
};


// String constant operand.
exports.Opd_Text = function(value) {
	this.value = value;
};
exports.Opd_Text.prototype = new exports.Operand();
exports.Opd_Text.prototype.name = "string";
exports.Opd_Text.prototype.is_constant = true;

exports.Opd_Text.prototype.compute = function(widget, recur)
{
	// Returns a string value
	return new Values.V_Text(this.value);
};


// Date constant operand.
exports.Opd_Date = function(value) {
	this.value = value;
};
exports.Opd_Date.prototype = new exports.Operand();
exports.Opd_Date.prototype.name = "date";
exports.Opd_Date.prototype.is_constant = true;

exports.Opd_Date.prototype.compute = function(widget, recur)
{
	// Returns a string value
	return new Values.V_Date(this.value);
};


// Boolean constant operand.
exports.Opd_Bool = function(value) {
	this.value = value;
};
exports.Opd_Bool.prototype = new exports.Operand();
exports.Opd_Bool.prototype.name = "boolean";
exports.Opd_Bool.prototype.is_constant = true;

exports.Opd_Bool.prototype.compute = function(widget, recur)
{
	// Returns a number value
	return new Values.V_Bool(this.value);
};


// Number constant operand.
exports.Opd_Number = function(value) {
	this.value = value;
};
exports.Opd_Number.prototype = new exports.Operand();
exports.Opd_Number.prototype.name = "number";
exports.Opd_Number.prototype.is_constant = true;

exports.Opd_Number.prototype.compute = function(widget, recur)
{
	// Returns a number value
	return new Values.V_Num(this.value);
};


var Compile = require("$:/plugins/ebalster/formula/compile.js");


// "Automatic" operand; a compiled string value
exports.Opd_Datum = function(origin) {
	this.origin = origin;
	this.text = null;
	this.op = null;
};
exports.Opd_Datum.prototype = new exports.Operand();
exports.Opd_Datum.prototype.name = "automatic";

exports.Opd_Datum.prototype.compute = function(widget, recur) {

	var newText = this.origin.compute(widget, recur).asString();

	if (newText != this.text)
	{
		this.text = newText;
		try {
			this.op = Compile.compileDatum(newText);
		}
		catch (err) {
			// Save the error
			this.op = new exports.Opd_Error(
				err + "\n  source: \"" + this.datum + "\"\n  from " + origin.name);
		}
	}

	return this.op.compute(widget, recur+1);
};


// Transcluded text operand.
exports.Opd_TranscludeText = function(title) {
	this.title = title;
};
exports.Opd_TranscludeText.prototype = new exports.Operand();
exports.Opd_TranscludeText.prototype.name = "transclude";

exports.Opd_TranscludeText.prototype.compute = function(widget, recur) {
	return new Values.V_Text(widget.wiki.getTiddlerText(this.title.compute(widget,recur).asString(),""));
};

// Transcluded field operand.
exports.Opd_TranscludeField = function(title, field) {
	this.title = title;
	this.field = field;
};
exports.Opd_TranscludeField.prototype = new exports.Operand();
exports.Opd_TranscludeField.prototype.name = "transclude-field";

exports.Opd_TranscludeField.prototype.compute = function(widget, recur) {
	var tiddler = widget.wiki.getTiddler(this.title.compute(widget,recur).asString()),
		field = this.field.compute(widget,recur).asString();
	return new Values.V_Text(
		(tiddler && $tw.utils.hop(tiddler.fields,field)) ? tiddler.getFieldString(field) : "");
};

// Transcluded index operand.
exports.Opd_TranscludeIndex = function(title, index) {
	this.title = title;
	this.index = index;
};
exports.Opd_TranscludeIndex.prototype = new exports.Operand();
exports.Opd_TranscludeIndex.prototype.name = "transclude-index";

exports.Opd_TranscludeIndex.prototype.compute = function(widget, recur) {
	return new Values.V_Text(widget.wiki.extractTiddlerDataItem(
		this.title.compute(widget,recur).asString(),
		this.index.compute(widget,recur).asString()),"");
};


// Opd_Variable operand.
exports.Opd_Variable = function(variable) {
	this.variable = variable;
};
exports.Opd_Variable.prototype = new exports.Operand();
exports.Opd_Variable.prototype.name = "variable";

exports.Opd_Variable.prototype.compute = function(widget, recur) {
	return new Values.V_Text(
		widget.getVariable(this.variable.compute(widget,recur).asString()) || "");
};


// Opd_Filter operand, with some lazy-compile optimizations.
exports.Opd_Filter = function(filter) {
	this.filter = filter;
	this.elements = {}; // Each has count, op, value
	//this.array = [];
	this.compileError = null;
};
exports.Opd_Filter.prototype = new exports.Operand();
exports.Opd_Filter.prototype.name = "filter";

exports.Opd_Filter.prototype.compute = function(widget, recur) {
	// Apply the filter and compile each result
	var i, expr, elem, exprs = widget.wiki.filterTiddlers(this.filter, widget);

	// Clear the array and mark all existing elements for removal
	for (expr in this.elements) this.elements[expr].count = 0;
	//this.array = [];

	// Selectively re-compile any filter results that have changed
	for (i = 0; i < exprs.length; ++i)
	{
		expr = exprs[i];
		elem = this.elements[expr];
		//this.array.push(expr);
		
		if (elem) ++elem.count;
		else try {
			this.elements[expr] = {count: 1, op: Compile.compileDatum(expr), value: null};
		}
		catch (err) {
			// Save the error
			this.elements[expr] = new exports.Opd_Error(
				err + "\n  source: \"" + expr + "\"\n  from \"" + this.filter + "\"");
		}
	}

	// Compute (unique) values.  Delete any elements with no copies left.
	for (expr in this.elements) {
		elem = this.elements[expr];
		if (elem.count === 0) delete this.elements[expr];
		else elem.val = elem.op.compute(widget, recur+1);
	}

	// Return value computes an array of datum values.
	var results = [];
	for (i = 0; i < exprs.length; ++i) {
		expr = exprs[i];
		results.push(this.elements[expr].val);
	}
	return new Values.V_Array(results);
};

})();
