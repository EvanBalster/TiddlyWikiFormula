/*\
title: $:/core/modules/macros/csvtiddlers.js
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
}
exports.Operand.prototype.is_constant = false;
exports.Operand.prototype.name = "unknown-operand";

// Operand::compute -- produce
exports.Operand.prototype.compute = (function(widget, recur) {return new Values.Value_Undefined();});


// String constant operand.
exports.String_Constant = function(value) {
  this.value = value;
}
exports.String_Constant.prototype = new exports.Operand();
exports.String_Constant.prototype.name = "string";
exports.String_Constant.prototype.is_constant = true;

exports.String_Constant.prototype.compute = function(widget, recur)
{
  // Returns a string value
  return new Values.Value_String(this.value);
}


// Number constant operand.
exports.Number_Constant = function(value) {
  this.value = value;
}
exports.Number_Constant.prototype = new exports.Operand();
exports.Number_Constant.prototype.name = "number";
exports.Number_Constant.prototype.is_constant = true;

exports.Number_Constant.prototype.compute = function(widget, recur)
{
  // Returns a number value
  return new Values.Value_Number(this.value);
}


var Compile = require("$:/plugins/ebalster/formula/compile.js");


// Transcluded operand.
exports.Transclude = function(textReference) {
  this.textReference = textReference;
  this.datum = null;
  this.op = null;
}
exports.Transclude.prototype = new exports.Operand();
exports.Transclude.prototype.name = "transclude";

exports.Transclude.prototype.compute = function(widget, recur) {

  var newDatum = widget.wiki.getTextReference(this.textReference, "", widget.getVariable("currentTiddler"));

  if (newDatum != this.datum)
  {
    this.datum = newDatum;
    this.op = Compile.compileDatum(newDatum);
  }

  return this.op.compute(widget, recur+1);
}


// Variable operand.
exports.Variable = function(variable) {
  this.variable = variable;
  this.datum = null;
  this.op = null;
}
exports.Variable.prototype = new exports.Operand();
exports.Variable.prototype.name = "variable";

exports.Variable.prototype.compute = function(widget, recur) {

  var newDatum = widget.getVariable(this.variable) || "";

  if (newDatum != this.datum)
  {
    this.datum = newDatum;
    this.op = Compile.compileDatum(newDatum);
  }

  return this.op.compute(widget, recur+1);
}


// Filter operand.
exports.Filter = function(filter) {
  this.filter = filter;
  this.elements = {};
}
exports.Filter.prototype = new exports.Operand();
exports.Filter.prototype.name = "filter";

exports.Filter.prototype.compute = function(widget, recur) {
  // Apply the filter and compile each result
  var exprs = widget.wiki.filterTiddlers(this.filter, widget);

  // Mark all existing elements for removal
  for (var expr in this.elements) this.elements[expr].count = 0;

  // Selectively re-compile any filter results that have changed
  for (var i = 0; i < exprs.length; ++i)
  {
    var expr = exprs[i];
    var found = this.elements[expr];
    if (found) ++found.count;
    else this.elements[expr] = {count: 1, op: Compile.compileDatum(expr)};
  }

  // Delete any elements with no copies left
  for (var expr in this.elements) if (this.elements[expr].count == 0) delete this.elements[expr];

  // Return value computes an array of datum values.
  var results = [];
  for (var expr in this.elements) {
    var elem = this.elements[expr];
    results.push(elem.op.compute(widget, recur+1));
  }
  return new Values.Value_Array(results);
};

})();
