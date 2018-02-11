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

var Coerce = require("$:/plugins/ebalster/formula/coerce.js");


// A Context has all the information necessary for computations.
exports.Context = function(widget, formats, locals, depth, maxDepth) {
	this.widget = widget;
	this.formats = formats || {};
	this.locals = locals || {};
	this.depth = depth || 1;
	this.maxDepth = maxDepth || 256;
	if (this.maxDepth < this.depth) throw "Formula recursion exceeds limit of " + this.maxDepth + ".  Infinite regress?";
};
exports.Context.prototype.sub          = function()        {return new exports.Context(this.widget,this.formats,null,this.depth+1,this.maxDepth);};
exports.Context.prototype.let          = function(locals)  {return new exports.Context(this.widget,this.formats,locals,this.depth,this.maxDepth);};
exports.Context.prototype.wiki         = function()        {return this.widget.wiki;};
exports.Context.prototype.wikiVariable = function(name)    {return this.widget.getVariable(name);};


exports.Node = function() {
};
exports.Node.prototype.is_constant = false;
exports.Node.prototype.name = "unknown-operand";
exports.Node.prototype.toString = function()    {return "[Node " + this.name + "]";};

// Compute the Node's value.
exports.Node.prototype.compute = function(ctx) {return undefined;};

// Compute a specific type of value, with coercion if necessary.
exports.Node.prototype.computeNum   = function(ctx) {return Coerce.ToNum  (this.compute(ctx), ctx);};
exports.Node.prototype.computeText  = function(ctx) {return Coerce.ToText (this.compute(ctx), ctx);};
exports.Node.prototype.computeBool  = function(ctx) {return Coerce.ToBool (this.compute(ctx), ctx);};
exports.Node.prototype.computeDate  = function(ctx) {return Coerce.ToDate (this.compute(ctx), ctx);};
exports.Node.prototype.computeArray = function(ctx) {return Coerce.ToArray(this.compute(ctx), ctx);};
exports.Node.prototype.computeFunc  = function(ctx) {return Coerce.ToFunc (this.compute(ctx), ctx);};


// An operand that just throws an error.
exports.ThrowError = function(exception) {
	this.exception = exception;
};
exports.ThrowError.prototype = new exports.Node();
exports.ThrowError.prototype.name = "error";
exports.ThrowError.prototype.compute = function(ctx)
{
	// Throw up
	throw this.exception;
};

// Scoped variable node.
exports.ScopeVar = function(name) {
	this.name = name;
};
exports.ScopeVar.prototype = new exports.Node();
//exports.ScopeVar.prototype.name = "scope-var";
exports.ScopeVar.prototype.compute = function(ctx) {return ctx.locals[this.name];};

// Scoped variable assignment node.
exports.LetVars = function(assigns, expr) {
	this.assigns = assigns;
	this.expr = expr;
};
exports.LetVars.prototype = new exports.Node();
exports.LetVars.prototype.name = "let";
exports.LetVars.prototype.compute = function(ctx) {
	// Each let-expression can access the ones before it.
	var locals = Object.assign({}, ctx.locals);
	ctx = ctx.let(locals);
	for (var id in this.assigns) {
		try {
			locals[id] = this.assigns[id].compute(ctx);
		}
		catch (err) {
			throw "computing LET '" + id + "': " + err;
		}
	}
	return this.expr.compute(ctx);
};

// Call a function by reference.
exports.CallFunc = function CallFunc(func, args) {
	this.func = func;
	this.args = args;
};
exports.CallFunc.prototype = new exports.Node();
exports.CallFunc.prototype.name = "function-builtin";
exports.CallFunc.prototype.compute = (function(ctx) {
	// Check the function parameters.
	var func = this.func.computeFunc(ctx);
	if (this.args.length < func.min_args) throw "Too few parameters for function";
	if (this.args.length > func.max_args) throw "Too many parameters for function";
	// Compute arguments.
	var vals = [];
	for (var i = 0; i < this.args.length; ++i) vals.push(this.args[i].compute(ctx));
	// Call the function!
	return func.apply(ctx, vals);
});

// JavaScript function call with possible coercion.
exports.CallJS = function CallJS(func, args) {
	this.func = func;
	this.args = args;
	this.coerce = Coerce.GetCoerceFuncs(func, args);
	this.n_coerce = Math.min(this.args.length, this.coerce.length);
};
exports.CallJS.prototype = new exports.Node();
exports.CallJS.prototype.name = "function-builtin";
exports.CallJS.prototype.compute = function(ctx) {
	var vals = [];
	var i = 0;
	for (; i < this.n_coerce; ++i) vals.push(this.coerce[i](this.args[i].compute(ctx), ctx));
	for (; i < this.args.length; ++i) vals.push(this.args[i].compute(ctx));
	return this.func.apply(ctx, vals);
};

// Call a function by reference.
exports.ArrayDef = function ArrayDef(elems) {
	this.elems = elems;
};
exports.ArrayDef.prototype = new exports.Node();
exports.ArrayDef.prototype.name = "function-builtin";
exports.ArrayDef.prototype.compute = (function(ctx) {
	// Compute elements.
	var elems = [];
	for (var i = 0; i < this.elems.length; ++i) elems.push(this.elems[i].compute(ctx));
	return elems;
});


// Function declaration operand.
exports.Function = function(func, captures) {
	this.func = func;
	this.captures = captures;
};
exports.Function.prototype = new exports.Node();
exports.Function.prototype.name = "function";
exports.Function.prototype.is_constant = true;
exports.Function.prototype.compute = function(ctx) {
	this.func.captured = {};
	if (this.captures) {
		for (var name in this.captures) {
			this.func.captured[name] = ctx.locals[name];
		}
	}
	return this.func;
};

// String constant operand.
exports.Text = function(value) {this.value = value;};
exports.Text.prototype = new exports.Node();
exports.Text.prototype.name = "string";
exports.Text.prototype.is_constant = true;
exports.Text.prototype.compute = function(ctx) {return this.value;};

// Date constant operand.
exports.Date = function(value) {this.value = value;};
exports.Date.prototype = new exports.Node();
exports.Date.prototype.name = "date";
exports.Date.prototype.is_constant = true;
exports.Date.prototype.compute = function(ctx) {return this.value;};

// Boolean constant operand.
exports.Bool = function(value) {this.value = value;};
exports.Bool.prototype = new exports.Node();
exports.Bool.prototype.name = "boolean";
exports.Bool.prototype.is_constant = true;
exports.Bool.prototype.compute = function(ctx) {return this.value;};

// Number constant operand.
exports.Number = function(value) {this.value = value;};
exports.Number.prototype = new exports.Node();
exports.Number.prototype.name = "number";
exports.Number.prototype.is_constant = true;
exports.Number.prototype.compute = function(ctx) {return this.value;};

// Regex constant operand.
exports.Regex = function(value) {this.value = value;};
exports.Regex.prototype = new exports.Node();
exports.Regex.prototype.name = "regex";
exports.Regex.prototype.is_constant = true;
exports.Regex.prototype.compute = function(ctx) {return this.value;};


var Compile = require("$:/plugins/ebalster/formula/compile.js");


// "Automatic" operand; a compiled string value
exports.Datum = function(origin) {
	this.origin = origin;
	this.text = null;
	this.op = null;
};
exports.Datum.prototype = new exports.Node();
exports.Datum.prototype.name = "automatic";

exports.Datum.prototype.compute = function(ctx) {

	var newText = this.origin.computeText(ctx);

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

	return this.op.compute(ctx.sub());
};


// Transcluded text operand.
exports.TranscludeText = function(title) {
	this.title = title;
};
exports.TranscludeText.prototype = new exports.Node();
exports.TranscludeText.prototype.name = "transclude";

exports.TranscludeText.prototype.compute = function(ctx) {
	return ctx.wiki().getTiddlerText(this.title.computeText(ctx),"");
};

// Transcluded field operand.
exports.TranscludeField = function(title, field) {
	this.title = title;
	this.field = field;
};
exports.TranscludeField.prototype = new exports.Node();
exports.TranscludeField.prototype.name = "transclude-field";

exports.TranscludeField.prototype.compute = function(ctx) {
	var tiddler = ctx.wiki().getTiddler(this.title.computeText(ctx)),
		field = this.field.computeText(ctx);
	return (tiddler && $tw.utils.hop(tiddler.fields,field)) ? tiddler.getFieldString(field) : "";
};

// Transcluded index operand.
exports.TranscludeIndex = function(title, index) {
	this.title = title;
	this.index = index;
};
exports.TranscludeIndex.prototype = new exports.Node();
exports.TranscludeIndex.prototype.name = "transclude-index";

exports.TranscludeIndex.prototype.compute = function(ctx) {
	return ctx.wiki().extractTiddlerDataItem(
		this.title.computeText(ctx),
		this.index.computeText(ctx),"");
};


// Variable operand.
exports.Variable = function(variable) {
	this.variable = variable;
};
exports.Variable.prototype = new exports.Node();
exports.Variable.prototype.name = "variable";

exports.Variable.prototype.compute = function(ctx) {
	return ctx.wikiVariable(this.variable.computeText(ctx)) || "";
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

exports.Filter.prototype.compute = function(ctx) {
	// Apply the filter and compile each result
	var i, expr, elem, exprs = ctx.wiki().filterTiddlers(this.filter, ctx.widget);

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
		else elem.val = elem.op.compute(ctx.sub());
	}

	// Return value computes an array of datum values.
	var results = [];
	for (i = 0; i < exprs.length; ++i) {
		expr = exprs[i];
		results.push(this.elements[expr].val);
	}
	return results;
};

})();
