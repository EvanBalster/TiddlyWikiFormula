/*\
title: $:/plugins/ebalster/formula/nodes.js
type: application/javascript
module-type: macro

Library defining computation "nodes" used to build compiled formulas.
Operands represent some value within the formula: an expression, datum, operator, constant or query...
Operands may be constant, allowing the formula compiler to optimize them away.

\*/
(function(){

"use strict";

var Values   = require("$:/plugins/ebalster/formula/value.js");

exports.Node = function() {
};
exports.Node.prototype.is_constant = false;
exports.Node.prototype.name = "unknown-operand";
exports.Node.prototype.toString = function()    {return "[Node " + this.name + "]";};

// Node::compute -- produce
exports.Node.prototype.compute = (function(widget, recur) {return new Values.V_Undefined();});


// An operand that just throws an error.
exports.ThrowError = function(exception) {
	this.exception = exception;
};
exports.ThrowError.prototype = new exports.Node();
exports.ThrowError.prototype.name = "error";
exports.ThrowError.prototype.compute = function(widget, recur)
{
	// Throw up
	throw this.exception;
};


// JavaScript function call operator.
exports.CallBuiltin = function CallBuiltin(func, args) {
  this.func = func;
  this.args = args;
};
exports.CallBuiltin.prototype = new exports.Node();
exports.CallBuiltin.prototype.name = "function-call";
exports.CallBuiltin.prototype.compute = (function(widget, recur) {
  var vals = [];
  this.args.forEach(function(arg) {vals.push(arg.compute(widget, recur));});
  return this.func.apply(null, vals);
});


// String constant operand.
exports.Text = function(value) {
	this.value = value;
};
exports.Text.prototype = new exports.Node();
exports.Text.prototype.name = "string";
exports.Text.prototype.is_constant = true;

exports.Text.prototype.compute = function(widget, recur)
{
	// Returns a string value
	return new Values.V_Text(this.value);
};


// Date constant operand.
exports.Date = function(value) {
	this.value = value;
};
exports.Date.prototype = new exports.Node();
exports.Date.prototype.name = "date";
exports.Date.prototype.is_constant = true;

exports.Date.prototype.compute = function(widget, recur)
{
	// Returns a string value
	return new Values.V_Date(this.value);
};


// Boolean constant operand.
exports.Bool = function(value) {
	this.value = value;
};
exports.Bool.prototype = new exports.Node();
exports.Bool.prototype.name = "boolean";
exports.Bool.prototype.is_constant = true;

exports.Bool.prototype.compute = function(widget, recur)
{
	// Returns a number value
	return new Values.V_Bool(this.value);
};


// Number constant operand.
exports.Number = function(value) {
	this.value = value;
};
exports.Number.prototype = new exports.Node();
exports.Number.prototype.name = "number";
exports.Number.prototype.is_constant = true;

exports.Number.prototype.compute = function(widget, recur)
{
	// Returns a number value
	return new Values.V_Num(this.value);
};


var Compile = require("$:/plugins/ebalster/formula/compile.js");


// "Automatic" operand; a compiled string value
exports.Datum = function(origin) {
	this.origin = origin;
	this.text = null;
	this.op = null;
};
exports.Datum.prototype = new exports.Node();
exports.Datum.prototype.name = "automatic";

exports.Datum.prototype.compute = function(widget, recur) {

	var newText = this.origin.compute(widget, recur).asString();

	if (newText != this.text)
	{
		this.text = newText;
		try {
			this.op = Compile.compileDatum(newText);
		}
		catch (err) {
			// Save the error
			this.op = new exports.ThrowError(
				err + "\n  source: \"" + this.datum + "\"\n  from " + origin.name);
		}
	}

	return this.op.compute(widget, recur+1);
};


// Transcluded text operand.
exports.TranscludeText = function(title) {
	this.title = title;
};
exports.TranscludeText.prototype = new exports.Node();
exports.TranscludeText.prototype.name = "transclude";

exports.TranscludeText.prototype.compute = function(widget, recur) {
	return new Values.V_Text(widget.wiki.getTiddlerText(this.title.compute(widget,recur).asString(),""));
};

// Transcluded field operand.
exports.TranscludeField = function(title, field) {
	this.title = title;
	this.field = field;
};
exports.TranscludeField.prototype = new exports.Node();
exports.TranscludeField.prototype.name = "transclude-field";

exports.TranscludeField.prototype.compute = function(widget, recur) {
	var tiddler = widget.wiki.getTiddler(this.title.compute(widget,recur).asString()),
		field = this.field.compute(widget,recur).asString();
	return new Values.V_Text(
		(tiddler && $tw.utils.hop(tiddler.fields,field)) ? tiddler.getFieldString(field) : "");
};

// Transcluded index operand.
exports.TranscludeIndex = function(title, index) {
	this.title = title;
	this.index = index;
};
exports.TranscludeIndex.prototype = new exports.Node();
exports.TranscludeIndex.prototype.name = "transclude-index";

exports.TranscludeIndex.prototype.compute = function(widget, recur) {
	return new Values.V_Text(widget.wiki.extractTiddlerDataItem(
		this.title.compute(widget,recur).asString(),
		this.index.compute(widget,recur).asString()),"");
};


// Variable operand.
exports.Variable = function(variable) {
	this.variable = variable;
};
exports.Variable.prototype = new exports.Node();
exports.Variable.prototype.name = "variable";

exports.Variable.prototype.compute = function(widget, recur) {
	return new Values.V_Text(
		widget.getVariable(this.variable.compute(widget,recur).asString()) || "");
};


// Filter operand, with some lazy-compile optimizations.
exports.Filter = function(filter) {
	this.filter = filter;
	this.elements = {}; // Each has count, op, value
	//this.array = [];
	this.compileError = null;
};
exports.Filter.prototype = new exports.Node();
exports.Filter.prototype.name = "filter";

exports.Filter.prototype.compute = function(widget, recur) {
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
			this.elements[expr] = new exports.ThrowError(
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
