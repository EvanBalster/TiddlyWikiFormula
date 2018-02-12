(function(){

"use strict";

var Nodes  = require("$:/plugins/ebalster/formula/nodes.js");

var rxDatumIsFormula      = /^\s*\(=.*=\)\s*$/;
var rxDatumIsTrue         = /^s*TRUE\s*$/i;
var rxDatumIsFalse        = /^s*FALSE\s*$/i;

var rxLet               = /let/gi;

var rxSkipInert         = /(\s*|\/\/.*?([\r\n]|$)|\/\*[\s\S]*?\*\/)*/g;
var rxNotWhitespace     = /[^\s]+/g;
var rxOperandFilter     = /\[(([^\[\]]|\[[^\[\]]*\])+(\](\s*[+-])?\s*\[)?)+\]/g;
var rxOperandTransclusion =     /\{\{([^\{\}]+)\}\}/g;
var rxDatumIsTransclusion = /^\s*\{\{([^\{\}]+)\}\}\s*$/;
var rxOperandVariable     =     /<<([^<>]+)>>/g;
var rxDatumIsVariable     = /^\s*<<[^<>]+>>\s*$/;
var rxCellName            = /\$?([A-Z]{1,2})\$?([0-9]+)/g;
var rxCellRange           = /\$?([A-Z]{1,2})\$?([0-9]+):\$?([A-Z]{1,2})\$?([0-9]+)/g;
var rxIdentifier          = /[_a-zA-Z][_a-zA-Z0-9]*/g;
var rxKeyword             = /(function|let|for|foreach|if|then|else|while|do|this|self|currentTiddler)/gi;

var rxUnsignedDecimal =          /((\d+(\.\d*)?)|(\.\d+))/g;
var rxDecimal         =     /[+-]?((\d+(\.\d*)?)|(\.\d+))/g;
var rxDatumIsDecimal  = /^\s*[+-]?((\d+(\.\d*)?)|(\.\d+))\s*$/;

var rxDate            =     /\d{2,4}-\d{2}-\d{2}(\s*\d{1,2}:\d{2}(:\d{2}(.\d+)?)?)?/g;
var rxDatumIsDate     = /^\s*\d{2,4}-\d{2}-\d{2}(\s*\d{1,2}:\d{2}(:\d{2}(.\d{3})?)?)?\s*$/;
var rxRegex           =     /\/((?:[^\\\/\[]|\[(?:[^\]]|\\\])*\]|\\.)+)\/([a-z]*)/g;
var rxDatumIsRegex    = /^\s*\/((?:[^\\\/\[]|\[(?:[^\]]|\\\])*\]|\\.)+)\/([a-z]*)\s*$/;
var rxDatumIsTwDate   = /^([0-9]{4})(1[0-2]|0[1-9])(3[01]|[12][0-9]|0[1-9])(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9])([0-9]{3})?$/;
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
	this.locals = {};
	this.localStack = [];
	this.assignStack = [];
}
Parser.prototype.getChar = function()
{
	return this.src.charAt(this.pos);
};
Parser.prototype.nextGlyph = function()
{
	this.skipInert();
	if (this.pos >= this.end) return '';
	++this.pos;
	return this.src.charAt(this.pos-1);
};
Parser.prototype.remaining = function()
{
	return this.src.substring(this.pos, this.end);
};
Parser.prototype.nextToken = function()
{
	this.skipInert();
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
Parser.prototype.skipInert = function()
{
	rxSkipInert.lastIndex = this.pos;
	rxSkipInert.test(this.src);
	this.pos = Math.min(rxSkipInert.lastIndex, this.end);
};

// Push a new set of local variables onto the parser's stack.
Parser.prototype.pushLocals = function(assigns) {
	var id;
	var newLocals = {};
	this.localStack.push(this.locals); for (id in this.locals) newLocals[id] = 0;
	this.assignStack.push(assigns);    for (id in assigns)     newLocals[id] = 0;
	this.locals = newLocals;
};

// Pop the last set of local variables off the parser's stack and return usage-counts.
Parser.prototype.popLocals = function() {
	var id, count, usage = {captures: {}, assigns: {}},
		assigns = this.assignStack.pop(),
		oldLocals = this.localStack.pop();
	for (id in this.locals) {
		count = this.locals[id];
		if (count > 0) {
			if (assigns[id]) {
				usage.assigns[id] = count;
			}
			else {
				usage.captures[id] = count;
				oldLocals[id] += count;
			}
		}
	}
	this.locals = oldLocals;
	return usage;
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
	
	var parser, term;

	// Short-hand formula
	if (datum.charAt(0) == "=") {
		parser = new Parser(datum);
		parser.pos = 1;
		return buildExpression(parser);
	}

	// Could be a TiddlyWiki date?
	if (rxDatumIsTwDate.test(datum)) {
		return new Nodes.Date($tw.utils.parseDate(datum));
	}

	// Could be a number?
	if (rxDatumIsDecimal.test(datum)) {
		// Treat as a number constant
		return new Nodes.Number(Number(datum));
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
	if (rxDatumIsFalse.test(datum)) return new Nodes.Bool(false);
	if (rxDatumIsTrue .test(datum)) return new Nodes.Bool(true);

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
			return new Nodes.Date(new Date(
				parts[0], (parts[1] || 1)-1, parts[2] || 1,
				parts[3] || 0, parts[4] || 0, parts[5] || 0, parts[6] || 0));
		}
	}

	// Regex?
	if ((term = rxDatumIsRegex.exec(datum))) {
		return new Nodes.Regex(new RegExp(term[1].replace("\\/", "/"), term[2]));
	}

	// Otherwise, treat as a string constant
	return new Nodes.Text(datum);
};

exports.compileFormula = function(formulaString)
{
	// Process the formula string into a root operand
	try {
		return exports.compileExpression(formulaString);
	}
	catch (err) {
		throw "CompileError: " + err;
	}
};


// Compile an operator
function parseOperator(parser, operatorGroup) {

	// Skip more whitespace
	parser.skipInert();

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

// Parse a text reference.  This function is pased on $tw.utils.getTextReference.
function buildTextReference(textReference) {
	var tr = $tw.utils.parseTextReference(textReference);
	var title;
	if (tr.title) title = new Nodes.Text(tr.title);
	else          title = new Nodes.Variable(new Nodes.Text("currentTiddler"));
	if (tr.field) {
		if (tr.field == "title") {
			return title;
		}
		else {
			return new Nodes.TranscludeField(title, new Nodes.Text(tr.field));
		}
	}
	else if (tr.index) {
		return new Nodes.TranscludeIndex(title, new Nodes.Text(tr.index));
	}
	else {
		return new Nodes.TranscludeText(title);
	}
}

// Parse a formula.
function buildExpression(parser, nested) {
	
	// Make sure math functions are initialized
	if (!formulaFunctions) initialize();

	parser.skipInert();

	// Expression compiler state
	var operands = [];
	var operators = [];
	var precedences = [];
	var operand = null, callArgs;
	
	// Unary stacking function
	var applyUnary = function(unary) {
		operand = new Nodes.CallJS(unary.func_bind, [operand]);
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
				throw "invalid operand \"" + token + "\"";
			else if (operators.length)
				throw "missing operand after \"" + operators[operators.length-1].operator + "\"";
			else throw "empty expression";
		}

		// Check for a function call (precedes all operators).
		callArgs = buildArguments(parser);
		if (callArgs) operand = new Nodes.CallFunc(operand, callArgs);

		// Postfix operators
		while (true)
		{
			var postfix = parseOperator(parser, operatorsUnaryPost);
			if (postfix) unaries.push(postfix);
			else break;
		}

		unaries.forEach(applyUnary);

		// Operand is complete.
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
			operands[i] = new Nodes.CallJS(op.func_bind, [operands[i], operands[i+1]]);
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
		parser.skipInert();

		if (parser.pos < parser.end)
		{
			throw "expected operator, got \"" + parser.nextToken() + "\"";
		}
	}
	
	// Otherwise return the operand directly
	return operands[0];
}

// Compile a list expression, which could be function arguments or an array...
function buildCommaList(parser, braces, afterHint) {

	// Is an open-brace present?
	parser.skipInert();
	if (parser.getChar() !== braces[0]) return null;
	++parser.pos;

	// Zero arguments?
	parser.skipInert();
	if (parser.getChar() === braces[1]) {++parser.pos; return [];}
	
	var nodeList = [];

	while (true)
	{
		// Compile an expression.
		nodeList.push(buildExpression(parser, true));

		// Expect close-brace or , after argument.
		var char = parser.nextGlyph();
		if (char === braces[1]) break;
		if (char !== ",") throw "Expect ',' or '" + braces[1] + "' after " + afterHint;
	}

	return nodeList;
}

// Build an argument list.
function buildArguments(parser) {
	return buildCommaList(parser, "()", "function argument.");
}

// Build an array literal.
function buildArrayLiteral(parser) {
	var array = buildCommaList(parser, "{}", "array element (use {{double braces}} for transclusions).");
	if (!array) throw "Expect '{' to begin array literal.";
	return array;
}

// Build a let or foreach expression (parser starts after the keyword)
function buildLetExpression(parser) {

	if (parser.nextGlyph() !== "(") throw "Expect '(' after LET.";

	// Gradually push locals.
	var assigns = {}, id, c;
	parser.pushLocals(assigns);
	while (true) {
		// Look for a name (identifier)
		parser.skipInert();
		id = parser.match_here(rxIdentifier);
		if (!id) throw "Expected name in LET assignment, got '" + parser.nextToken() + "'.";
		id = id[0];
		if (rxKeyword.test(id)) throw "Illegal name for LET: " + id;
		
		// Look for an equals, then an expression.
		if (parser.nextGlyph() !== '=') throw "Expect '=' after LET value.";

		// Build the expression...  Each let can use the ones before it.
		try {
			assigns[id] = buildExpression(parser, true);
		}
		catch (err) {
			throw "compiling LET '" + id + "': " + err;
		}
		parser.locals[id] = 0;

		// Expect ) or , after argument.
		var char = parser.nextGlyph();
		if (char == ")") break;
		if (char != ",") throw "Expect ',' or ')' after LET assignment.";
	}

	if (parser.nextGlyph() !== ":") throw "Expect ':' after LET assignment list.";
	if (parser.nextGlyph() !== "(") throw "Expect LET expression in parentheses after ':'.";

	// Compile the body expression, with additional locals.
	var body = buildExpression(parser, true);
	var usage = parser.popLocals();

	// TODO could examine usage.assigns and letLocals to see if any values were unused.

	if (parser.nextGlyph() !== ")") throw "Expect ')' after LET expression.";

	return new Nodes.LetVars(assigns,body);
}

// Build a function (parser starts after the keyword "function")
function buildFunction(parser) {
	
	var srcBegin = parser.pos;

	if (parser.nextGlyph() !== "(") throw "Expect '(' after 'function'.";

	parser.skipInert();

	// Build the parameter list, if any.
	var params = [], assigns = {};
	if (parser.getChar() === ")") {++parser.pos;}
	else while (true)
	{
		// Get a parameter name (identifier).
		var param = parser.match_here(rxIdentifier);
		if (!param) throw "Expect list of parameter names after 'function'.";
		param = param[0];
		if (rxKeyword.test(param)) throw "Illegal parameter name: " + param;
		params.push(param);
		if (assigns[param]) throw "Parameter name used twice: " + param;
		assigns[param] = true;

		// Expect ) or , after argument.
		var char = parser.nextGlyph();
		if (char == ")") break;
		if (char != ",") throw "Expect ',' or ')' after function parameter name.";

		// Skip inert stuff
		parser.skipInert();
	}

	if (parser.nextGlyph() !== ":") throw "Expect ':' after function parameter list.";
	if (parser.nextGlyph() !== "(") throw "Expect function body beginning with '(' after ':'.";

	// Compile the body expression, with parameters as locals.  Closures are NOT currently supported.
	parser.pushLocals(assigns);
	var body = buildExpression(parser, true);
	var usage = parser.popLocals();
	var captures = usage.captures;

	if (parser.nextGlyph() !== ")") throw "Expect ')' after function body.";

	// Create the function object (must be called with this = context)
	var func = function() {
		var locals = Object.assign({}, func.captured || {});
		for (var i = 0; i < arguments.length; ++i) locals[params[i]] = arguments[i];
		return body.compute(this.let(locals));
	};
	//func.params = params;
	func.min_args = params.length;
	func.max_args = params.length;
	func.formulaSrc = parser.src.substring(srcBegin, parser.pos);
	return new Nodes.Function(func, captures);
}

// Compile an operand into a function returning the operand value.
function buildOperand(parser) {

	var term;
	
	// Skip whitespace & comments
	parser.skipInert();

	if (parser.pos == parser.end) return null;

	var char = parser.getChar();

	if (char.match(/[0-9\.+]/i))
	{
		// Number constant
		term = parser.match_here(rxDecimal);
		if (term) return new Nodes.Number(Number(term[0]));
		throw "Invalid number: " + parser.nextToken();
	}
	else if (char.match(/[$a-z_]/i))
	{
		// Cell range?
		term = parser.match_here(rxCellRange);
		if (term) throw "Cell ranges are currently unsupported!";

		// Cell name?
		term = parser.match_here(rxCellName);
		if (term) return new Nodes.Datum(
			new Nodes.TranscludeIndex(
				new Nodes.Variable(new Nodes.Text("currentTiddler")),
				new Nodes.Text(term[1]+term[2])));

		// Identifier?
		term = parser.match_here(rxIdentifier);
		if (!term) return null;

		if (parser.locals[term] != undefined)
		{
			// Scoped variable.  We count up references to each.
			++parser.locals[term];
			return new Nodes.ScopeVar(term[0]);
		}

		var termLower = term[0].toLowerCase();
		switch (termLower)
		{
		case "let":
			// LET expression.
			return buildLetExpression(parser);

		case "function":
			// Function declaration.
			return buildFunction(parser);

		default:
			// Function call.
			var func = formulaFunctions[termLower];

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

				// If a select function is present, prepare to bind it with a CallJS.
				func = func.select(args);
			}
			else {
				throw "Function " + term[0] + " seems to be unusable.";
			}

			return new Nodes.CallJS(func, args);
		}
	}
	else switch (char)
	{
	case "(": // Parenthesized expression
		++parser.pos;
		var parentheses = buildExpression(parser, true);
		parser.skipInert();
		if (parser.getChar() !== ")")
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
		return new Nodes.Text(term);

	case "[": // Filter operand
		term = parser.match_here(rxOperandFilter);
		if (term) return new Nodes.Filter(term[0]);
		break;

	case "{": // Transclusion or array
		++parser.pos;
		char = parser.getChar();
		--parser.pos;
		if (char == '{') {
			// Possible transclusion operand
			term = parser.match_here(rxOperandTransclusion);
			if (term) return new Nodes.Datum(buildTextReference(term[1]));
		}
		// Array operand
		return new Nodes.ArrayDef(buildArrayLiteral(parser));

	case "<": // Variable operand
		term = parser.match_here(rxOperandVariable);
		if (term) return new Nodes.Datum(
			new Nodes.Variable(new Nodes.Text(term[1])));
		break;

	case "/": // Regular expression?
		term = parser.match_here(rxRegex);
		if (term) return new Nodes.Regex(new RegExp(term[1].replace("\\/", "/"), term[2]));
			break;
	}

	// Didn't recognize the operand
	return null;
}

})();
