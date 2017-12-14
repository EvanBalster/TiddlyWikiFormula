(function(){

"use strict";

var Values    = require("$:/plugins/ebalster/formula/value.js");
var Operands  = require("$:/plugins/ebalster/formula/operands.js");
var Operators = require("$:/plugins/ebalster/formula/operators.js");

var rxDatumIsFormula      = /^\s*\(=.*=\)\s*$/;
var rxDatumIsDecimal      = /^\s*[+-]?((\d+(\.\d*)?)|(\.\d+))\s*$/;
var rxDatumIsTrue         = /^s*TRUE\s*$/i;
var rxDatumIsFalse        = /^s*FALSE\s*$/i;

var rxSkipWhitespace    = /\s*/g;
var rxNotWhitespace     = /[^\s]+/g;
var rxOperandFilter     = /\[([^\[\]]|\[[^\[\]]*\])*\]/g;
var rxOperandTransclusion =     /\{\{[^\{\}]+\}\}/g;
var rxDatumIsTransclusion = /^\s*\{\{[^\{\}]+\}\}\s*$/;
var rxOperandVariable     =     /<<[^<>]+>>/g;
var rxDatumIsVariable     = /^\s*<<[^<>]+>>\s*$/;
var rxIdentifier          = /[_a-zA-Z][_a-zA-Z0-9]*/g;

var rxUnsignedDecimal =      /((\d+(\.\d*)?)|(\.\d+))/g
var rxDecimal         = /[+-]?((\d+(\.\d*)?)|(\.\d+))/g

var rxString          = /("(\\.|[^"\\])*"|'(\\.|[^'\\])*')/g

var formulaFunctions   = null;
var operatorsUnaryPre  = null;
var operatorsUnaryPost = null;
var operatorsBinary    = null;
var operatorsTernary   = null;

function Parser(src)
{
  this.src = src;
  this.pos = 0;
  this.end = src.length;
}
Parser.prototype.getChar = function()
{
  return this.src.charAt(this.pos);
}
Parser.prototype.remaining = function()
{
  return this.src.substring(this.pos, this.end);
}
Parser.prototype.nextToken = function()
{
  rxNotWhitespace.lastIndex = this.pos;
  rxNotWhitespace.test(this.src);
  return this.src.substring(this.pos, rxNotWhitespace.lastIndex);
}
Parser.prototype.match_here = function(regex)
{
  // TODO this is doing much more work than is necessary
  regex.lastIndex = this.pos;
  var result = regex.exec(this.src);
  if (!result || result.index != this.pos || result.index+result[0].length > this.end) return null;
  this.pos = regex.lastIndex;
  return result;
}
Parser.prototype.skipWhitespace = function()
{
  rxSkipWhitespace.lastIndex = this.pos;
  rxSkipWhitespace.test(this.src);
  this.pos = Math.min(rxSkipWhitespace.lastIndex, this.end);
}

var initialize = function() {
  formulaFunctions = {};
  var operators = {}
  $tw.modules.applyMethods("formula-function", formulaFunctions);
  $tw.modules.applyMethods("formula-operator", operators);

  operatorsUnaryPre = {};
  operatorsUnaryPost = {};
  operatorsBinary = {}; //{}; //{plus: {arity: 2, precedence: 10,   operator: "+", function: "add"}};
  operatorsTernary = {};
  for (var opName in operators)
  {
    var op = operators[opName];

    // Bind the associated function.  
    var func = formulaFunctions[op.function];
    if (!func) continue;
    op.func_bind = func;

    // Sort the op by arity and position.
    switch (op.arity)
    {
    case 2:           operatorsBinary  [opName] = op; break;
    case 3:           operatorsTernary [opName] = op; break;
    case 1:
      switch (op.position)
      {
        case "pre":  operatorsUnaryPre [opName] = op; break;
        case "post": operatorsUnaryPost[opName] = op; break;
      }
      break;
    }
  }
}


exports.compileExpression = function(expression) {

  // Create a parser and process the formula as an expression.
  var parser = new Parser(expression);

  var operand = buildExpression(parser);

  return operand;
};

exports.compileDatum = function(datum) {

  // Could be a number?
  if (rxDatumIsDecimal.test(datum)) {
    // Treat as a number constant
    return new Operands.Opd_Number(Number(datum));
  }

  // Could be a formula?
  if (rxDatumIsFormula.test(datum)) {
    // Parse contents as a formula
    var parser = new Parser(datum);
    parser.pos = datum.indexOf("=")+1;
    parser.end = datum.lastIndexOf("=");
    return buildExpression(parser);
  }

  // Could be a transclusion or variable?
  if (rxDatumIsTransclusion.test(datum) ||
      rxDatumIsVariable.test(datum)) {
    // Defer to the operand parser...
    var parser = new Parser(datum);
    return buildOperand(parser);
  }

  // Booleans?
  if (rxDatumIsFalse.test(datum)) return new Operands.Opd_Bool(false);
  if (rxDatumIsTrue .test(datum)) return new Operands.Opd_Bool(true);

  // Otherwise, treat as a string constant
  return new Operands.Opd_Text(datum);
};

exports.compileFormula = function(formulaString)
{
  // Process the formula string into a root operand
  try
  {
    return exports.compileExpression(formulaString);
  }
  catch (err)    {return new Operands.Opd_Text("`FormulaError: " + err + "`");}
}

exports.computeFormula = function(compiledFormula, widget, numberFormat=null, debug=false) {
  
  var value;

  Values.NumberFormatFunc = numberFormat;

  // Compute a value from the root operand of the compiled formula.
  try
  {
    value = compiledFormula.compute(widget, 0);
  }
  catch (err)    {return "`ComputeError: " + String(err) + "\noperand: " + String(compiledFormula) + "`";}

  // Format the root operand as a string.
  try
  {
    if (debug) return value.asString() + "\n - Val:" + String(value) + ", Op:" + compiledFormula.name;
    else       return value.asString();
  }
  catch (err)    {return "`ValueError: " + String(err) + "\nvalue: " + String(value) + "`";}
};

exports.evalFormula = function(formulaString, widget, numberFormat=null, debug=false) {
  
  var compiledFormula;

  // Compile the formula
  try
  {
    var compiledFormula = exports.compileExpression(formulaString);
  }
  catch (err)    {return "`FormulaError: " + String(err) + "`";}

  // Compute the formula
  return exports.computeFormula(compiledFormula, widget, numberFormat, debug);
};



// Compile an operator
function parseOperator(parser, operatorGroup) {

  // Skip more whitespace
  parser.skipWhitespace();

  var result = null;

  // Find the longest operator matching the current text.
  for (var opName in operatorGroup)
  {
    var op = operatorGroup[opName];
    if (parser.src.substr(parser.pos, op.operator.length) == op.operator
      && parser.pos+op.operator.length <= parser.end)
    {
      if (!result || result.operator.length < op.operator.length) result = op;
    }
  }

  if (result) parser.pos += result.operator.length;

  return result;
}

// Parse a formula.
function buildExpression(parser, nested = false) {
  
  // Make sure math functions are initialized
  if (!formulaFunctions) initialize();

  parser.skipWhitespace();

  var operands = [];
  var operators = [];
  var precedences = [];

  while (true)
  {
    var unaries = [];

    // Prefix operators
    while (true)
    {
      var prefix = parseOperator(parser, operatorsUnaryPre);
      if (prefix) unaries.unshift(prefix);
      else break;
    }

    // Grab the operand
    try
    {
      var operand = buildOperand(parser);
    }
    catch (err)
    {
      throw err + (operators.length ?
        " (after " + operators[operators.length-1].operator + ")" :
        " (beginning of expression)");
    }

    // Missing operand is an error
    if (operand === null)
    {
      if (operands.length) throw "missing operand after \"" + operators[operators.length-1].operator + "\"";
      else                 throw "empty expression";
    }

    // Postfix operators
    while (true)
    {
      var postfix = parseOperator(parser, operatorsUnaryPost);
      if (postfix) unaries.push(postfix);
      else break;
    }

    unaries.forEach(function(unary) {
      operand = new Operators.CallOperator(unary.func_bind, [operand]);
    });

    operands.push(operand);

    // Infix operators
    var operator = parseOperator(parser, operatorsBinary);

    // Missing operator ends the expression
    if (operator === null) break;

    // Add the operator and its precedence level.
    operators.push(operator);
    var precedence = operator.precedence;
    if (precedences.indexOf(precedence || 0) == -1) precedences.push(precedence);
  }

  // Sanity check
  if (operands.length != operators.length+1)
    throw "internal error: operator/operand parsing inconsistency";

  // Resolve operators by precedence
  precedences.sort(function(a,b) {return (a>b)?-1:1;});

  for (var j = 0; j < precedences.length; ++j)
  {
    var prec = precedences[j];
    for (var i = 0; i < operators.length; )
    {
      // Process only operators at the current precedence level.
      var op = operators[i];
      if (op.precedence != prec) {++i; continue;}

      // Collapse the previous and next operands with this operator.
      operands[i] = new Operators.CallOperator(op.func_bind, [operands[i], operands[i+1]]);
      operators.splice(i, 1);
      operands.splice(i+1, 1);
    }
  }

  // Sanity check
  if (operators.length != 0 || operands.length != 1)
    throw "internal error: resoving failed; " + operands.length + " operands and " + operators.length + " operators remain";

  // For non-nested expressions, throw if any tokens remain.
  if (!nested)
  {
    parser.skipWhitespace();

    if (parser.pos < parser.end)
    {
      throw "expected operator, got \"" + parser.nextToken() + "\"";
    }
  }

  return operands[0];
};

// Compile a function argument list.  Error if the next 
function buildArguments(parser) {

  // Skip whitespace
  parser.skipWhitespace();

  if (parser.getChar() != "(") throw "Expect '(' after function name";
  ++parser.pos;
  
  var results = [];

  while (true)
  {
    // Compile an expression.
    results.push(buildExpression(parser, true));

    // Skip more whitespace
    parser.skipWhitespace();

    // Expect ) or , after argument.
    var char = parser.getChar();
    ++parser.pos;
    if (char == ")") break;
    if (char != ",") throw "Expect ',' or ')' after function argument";
  }

  return results;
};

// Compile an operand into a function returning the operand value.
function buildOperand(parser) {

  var term;
  
  // Skip whitespace
  parser.skipWhitespace();

  if (parser.pos == parser.end) return null;

  var char = parser.getChar();

  if (char.match(/[0-9\.+=]/i))
  {
    // Number constant
    term = parser.match_here(rxDecimal);
    if (term) return new Operands.Opd_Number(Number(term[0]));
    throw "Invalid number: " + parser.nextToken();
  }
  else if (char.match(/[a-z]/i))
  {
    // Function call
    term = parser.match_here(rxIdentifier);

    if (term)
    {
      term = term[0].toLowerCase();
      var func = formulaFunctions[term];

      if (!func) throw "unknown function: " + term;

      var args = buildArguments(parser);

      if (args.length > func.length) throw "too many arguments for " + term;
      if (args.length < func.length) throw "too few arguments for " + term;

      return new Operators.CallOperator(func, args);
    }
  }
  else switch (char)
  {
  case "(": // Parenthesized expression
    ++parser.pos;
    var parentheses = buildExpression(parser, true);
    parser.skipWhitespace();
    if (parser.getChar() != ")")
    {
      if (parser.pos == parser.end) throw "missing ')' at end of formula";
      else                          throw "expected ')', got \"" + parser.nextToken() + "\"";
    }
    ++parser.pos;
    return parentheses;
    break;

  case "'":
  case "\"": // String constant
    term = parser.match_here(rxString);
    if (term) return new Operands.Opd_Text(term[0].substr(1, term[0].length-2));
    throw "Invalid string: " + parser.nextToken();
    break;

  case "[": // Filter operand
    term = parser.match_here(rxOperandFilter);
    if (term) return new Operands.Opd_Filter(term[0]);
    break;

  case "{": // Transclusion operand
    term = parser.match_here(rxOperandTransclusion);
    if (term) return new Operands.Opd_Transclude(term[0].substring(2, term[0].length-2));
    break;

  case "<": // Variable operand
    term = parser.match_here(rxOperandVariable);
    if (term) return new Operands.Opd_Variable(term[0].substring(2, term[0].length-2));
    break;
  }

  // Otherwise, constant operand
  throw "unrecognized operand: '" + parser.nextToken() + "'";
  //return new Operands.Constant("K: " + expr + " (#"+String(parser.pos)+")");
};

})();
