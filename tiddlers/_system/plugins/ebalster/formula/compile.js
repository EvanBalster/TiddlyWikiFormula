(function(){

"use strict";

var Values    = require("$:/plugins/ebalster/formula/value.js");
var Operands  = require("$:/plugins/ebalster/formula/operands.js");
var Operators = require("$:/plugins/ebalster/formula/operators.js");

var rxDatumIsFormula      = /^\s*\(=.*=\)\s*$/;
var rxDatumIsTrue         = /^s*TRUE\s*$/i;
var rxDatumIsFalse        = /^s*FALSE\s*$/i;

var rxSkipWhitespace    = /\s*/g;
var rxNotWhitespace     = /[^\s]+/g;
var rxOperandFilter     = /\[([^\[\]]|\[[^\[\]]*\])*\]/g;
var rxOperandTransclusion =     /\{\{[^\{\}]+\}\}/g;
var rxDatumIsTransclusion = /^\s*\{\{[^\{\}]+\}\}\s*$/;
var rxOperandVariable     =     /<<[^<>]+>>/g;
var rxDatumIsVariable     = /^\s*<<[^<>]+>>\s*$/;
var rxCellName            = /[a-zA-Z]{1,2}[0-9]+/g;
var rxIdentifier          = /[_a-zA-Z][_a-zA-Z0-9]*/g;

var rxUnsignedDecimal =          /((\d+(\.\d*)?)|(\.\d+))/g;
var rxDecimal         =     /[+-]?((\d+(\.\d*)?)|(\.\d+))/g;
var rxDatumIsDecimal  = /^\s*[+-]?((\d+(\.\d*)?)|(\.\d+))\s*$/;

var rxDate            =     /\d{2,4}-\d{2}-\d{2}(\s*\d{1,2}:\d{2}(:\d{2}(.\d+)?)?)?/g;
var rxDatumIsDate     = /^\s*\d{2,4}-\d{2}-\d{2}(\s*\d{1,2}:\d{2}(:\d{2}(.\d{3})?)?)?\s*$/;
var rxDateFragment    = /\d+/g;

var rxString          = /("(\\.|[^"\\])*"|'(\\.|[^'\\])*')/g;
var rxEscapeSequence  = /\\([a-tv-z0"'\\]|u[a-fA-F0-9]{0,4}|$)/g;

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
};
Parser.prototype.remaining = function()
{
  return this.src.substring(this.pos, this.end);
};
Parser.prototype.nextToken = function()
{
  rxNotWhitespace.lastIndex = this.pos;
  rxNotWhitespace.test(this.src);
  return this.src.substring(this.pos, rxNotWhitespace.lastIndex);
};
Parser.prototype.match_here = function(regex)
{
  // TODO this is doing much more work than is necessary
  regex.lastIndex = this.pos;
  var result = regex.exec(this.src);
  if (!result || result.index != this.pos || result.index+result[0].length > this.end) return null;
  this.pos = regex.lastIndex;
  return result;
};
Parser.prototype.skipWhitespace = function()
{
  rxSkipWhitespace.lastIndex = this.pos;
  rxSkipWhitespace.test(this.src);
  this.pos = Math.min(rxSkipWhitespace.lastIndex, this.end);
};

var initialize = function() {
  formulaFunctions = {};
  var operators = {};
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
};


exports.compileExpression = function(expression) {

  // Create a parser and process the formula as an expression.
  var parser = new Parser(expression);

  var operand = buildExpression(parser);

  return operand;
};

exports.compileDatum = function(datum) {
  
  var parser;

  // Short-hand formula
  if (datum.charAt(0) == "=") {
  	parser = new Parser(datum);
    parser.pos = 1;
    return buildExpression(parser);
  }

  // Could be a number?
  if (rxDatumIsDecimal.test(datum)) {
    // Treat as a number constant
    return new Operands.Opd_Number(Number(datum));
  }

  // Could be a formula?
  if (rxDatumIsFormula.test(datum)) {
    // Parse contents as a formula
    parser = new Parser(datum);
    parser.pos = datum.indexOf("=")+1;
    parser.end = datum.lastIndexOf("=");
    return buildExpression(parser);
  }

  // Could be a transclusion or variable?
  if (rxDatumIsTransclusion.test(datum) ||
      rxDatumIsVariable.test(datum)) {
    // Defer to the operand parser...
    parser = new Parser(datum);
    return buildOperand(parser);
  }

  // Booleans?
  if (rxDatumIsFalse.test(datum)) return new Operands.Opd_Bool(false);
  if (rxDatumIsTrue .test(datum)) return new Operands.Opd_Bool(true);

  // Date?
  if (rxDatumIsDate.test(datum))
  {
    rxDateFragment.lastIndex = 0;
    var parts = [];
    while (true)
    {
      var res = rxDateFragment.exec(datum);
      if (!res) break;
      parts.push(parseInt(res[0]));
    }
    if (parts.length)
    {
      return new Operands.Opd_Date(new Date(
        parts[0], (parts[1] || 1)-1, parts[2] || 1,
        parts[3] || 0, parts[4] || 0, parts[5] || 0, parts[6] || 0));
    }
  }

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
};

var numberFormatFixed     = function(vFixed)     {return function(num) {return num.toFixed    (vFixed);};};
var numberFormatPrecision = function(vPrecision) {return function(num) {return num.toPrecision(vPrecision);};};
var numberFormatSelect    = function(settings)
{
  if (!isNaN(settings.fixed))     return numberFormatFixed    (settings.fixed);
  if (!isNaN(settings.precision)) return numberFormatPrecision(settings.precision);
  return String;
};

exports.computeFormula = function(compiledFormula, widget, formatOptions, debug) {
  
  var value;
  
  formatOptions = formatOptions || {};

  Values.NumberFormatFunc = numberFormatSelect(formatOptions);
  Values.DateFormat = formatOptions.dateFormat || "0hh:0mm, DDth MMM YYYY";

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

exports.evalFormula = function(formulaString, widget, formatOptions, debug) {
  
  var compiledFormula;

  // Compile the formula
  try
  {
    compiledFormula = exports.compileExpression(formulaString);
  }
  catch (err)    {return "`FormulaError: " + String(err) + "`";}

  // Compute the formula
  return exports.computeFormula(compiledFormula, widget, formatOptions, debug);
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
function buildExpression(parser, nested) {
  
  // Make sure math functions are initialized
  if (!formulaFunctions) initialize();

  parser.skipWhitespace();

  var operands = [];
  var operators = [];
  var precedences = [];
  var operand = null;
  
  var applyUnary = function(unary) {
    operand = new Operators.CallOperator(unary.func_bind, [operand]);
  };

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
    operand = buildOperand(parser);

    // Missing operand is an error
    if (operand === null)
    {
      var token = parser.nextToken();
      if (token && token[0] != ")" && token[0] != ",")
        throw "invalid operand\"" + token + "\"";
      else if (operators.length)
        throw "missing operand after \"" + operators[operators.length-1].operator + "\"";
      else throw "empty expression";
    }

    // Postfix operators
    while (true)
    {
      var postfix = parseOperator(parser, operatorsUnaryPost);
      if (postfix) unaries.push(postfix);
      else break;
    }

    unaries.forEach(applyUnary);

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
  if (operators.length !== 0 || operands.length != 1)
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
}

// Compile a function argument list.  Error if the next 
function buildArguments(parser) {

  // Skip whitespace
  parser.skipWhitespace();

  // Argument list present?
  if (parser.getChar() != "(") return null;
  ++parser.pos;

  // Zero arguments?
  parser.skipWhitespace();
  if (parser.getChar() == ")") {++parser.pos; return [];}
  
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
}

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
    // Cell name?
    term = parser.match_here(rxCellName);
    if (term) return new Operands.Opd_Transclude("##" + term[0]);

    // Function call?
    term = parser.match_here(rxIdentifier);

    if (term)
    {
      var func = formulaFunctions[term[0].toLowerCase()];

      if (!func) throw "unknown function: " + term[0];

      var args = buildArguments(parser);

      // Omitting arguments is only OK for constant functions
      if (args === null)
      {
        if (!func.isConstant) throw "Expected '(' after " + term[0];
        args = [];
      }

      if (func instanceof Function) {
        // Check parameter count
        if (args.length > func.length && !func.variadic)
          throw "too many arguments for " + term[0] + " (requires " + func.length + ")";
        if (args.length < func.length)
          throw "too few arguments for " + term[0] + (func.variadic?" (min ":" (requires ") + func.length + ")";
      }
      else if (func.select || func.construct) {
        // Check argument range
        if (func.max_args && args.length > func.max_args)
          throw "too many arguments for " + term[0] + " (max " + func.max_args + ")";
        if (func.min_args && args.length < func.min_args)
          throw "too few arguments for " + term[0] + " (min " + func.min_args + ")";
        
        // If a construct function is present, use it to generate an operand.
        if (func.construct) return func.construct(args);

        // If a select function is present, prepare to bind it with a CallOperator.
        func = func.select(args);
      }
      else {
        throw "Function " + term[0] + " seems to be unusable.";
      }

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

  case "'":
  case "\"": // String constant
    term = parser.match_here(rxString);
    if (!term) throw "Invalid string: " + parser.nextToken();
    term = term[0].substr(1, term[0].length-2);
    term = term.replace(rxEscapeSequence, function(esc) {
      switch (esc.charAt(1)) {
        case '"': return '"';
        case '\'': return '\'';
        case '\\': return '\\';
        case 'n': return '\n';
        case 'r': return '\r';
        case 'b': return '\b';
        case 'f': return '\f';
        case 't': return '\t';
        case 'v': return '\v';
        case '0': return '\0';
        case 'u':
          if (esc.length < 6) throw "Invalid escape sequence: " + esc;
          return String.fromCharCode(parseInt(esc.substr(2), 16));
        default: throw "Invalid escape sequence: " + esc;
      }
    });
    return new Operands.Opd_Text(term);

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

  // Didn't recognize the operand
  return null;
}

})();
