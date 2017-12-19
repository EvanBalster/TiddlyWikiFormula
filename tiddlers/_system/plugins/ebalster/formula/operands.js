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


// Opd_Transcluded operand.
exports.Opd_Transclude = function(textReference) {
  this.textReference = textReference;
  this.datum = null;
  this.op = null;
};
exports.Opd_Transclude.prototype = new exports.Operand();
exports.Opd_Transclude.prototype.name = "transclude";

exports.Opd_Transclude.prototype.compute = function(widget, recur) {

  var newDatum = widget.wiki.getTextReference(this.textReference, "", widget.getVariable("currentTiddler"));

  if (newDatum != this.datum)
  {
    this.datum = newDatum;
    try
    {
      this.op = Compile.compileDatum(newDatum);
    }
    catch (err)
    {
      // Save the error
      this.op = new exports.Opd_Error(
        err + "\n  source: \"" + this.datum + "\"\n  from {{" + this.textReference + "}}");
    }
  }

  return this.op.compute(widget, recur+1);
};


// Opd_Variable operand.
exports.Opd_Variable = function(variable) {
  this.variable = variable;
  this.datum = null;
  this.op = null;
  this.compileError = null;
};
exports.Opd_Variable.prototype = new exports.Operand();
exports.Opd_Variable.prototype.name = "variable";

exports.Opd_Variable.prototype.compute = function(widget, recur) {

  var newDatum = widget.getVariable(this.variable) || "";

  if (newDatum != this.datum)
  {
    this.datum = newDatum;
    try
    {
      this.op = Compile.compileDatum(newDatum);
    }
    catch (err)
    {
      // Save the error
      this.op = new exports.Opd_Error(
        err + "\n  source: \"" + this.datum + "\"\n  from <<" + this.variable + ">>");
    }
  }

  return this.op.compute(widget, recur+1);
};


// Opd_Filter operand.
exports.Opd_Filter = function(filter) {
  this.filter = filter;
  this.elements = {};
  this.compileError = null;
};
exports.Opd_Filter.prototype = new exports.Operand();
exports.Opd_Filter.prototype.name = "filter";

exports.Opd_Filter.prototype.compute = function(widget, recur) {
  // Apply the filter and compile each result
  var expr, exprs = widget.wiki.filterTiddlers(this.filter, widget);

  // Mark all existing elements for removal
  for (expr in this.elements) this.elements[expr].count = 0;

  // Selectively re-compile any filter results that have changed
  for (var i = 0; i < exprs.length; ++i)
  {
    expr = exprs[i];
    var found = this.elements[expr];
    if (found) ++found.count;
    else try
    {
      this.elements[expr] = {count: 1, op: Compile.compileDatum(expr)};
    }
    catch (err)
    {
      // Save the error
      this.elements[expr] = new exports.Opd_Error(
        err + "\n  source: \"" + expr + "\"\n  from \"" + this.filter + "\"");
    }
  }
  

  // Delete any elements with no copies left
  for (expr in this.elements) if (this.elements[expr].count === 0) delete this.elements[expr];

  // Return value computes an array of datum values.
  var results = [];
  for (expr in this.elements) {
    var elem = this.elements[expr];
    results.push(elem.op.compute(widget, recur+1));
  }
  return new Values.V_Array(results);
};

})();
