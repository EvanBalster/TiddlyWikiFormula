(function(){

"use strict";

var Nodes    = require("$:/plugins/ebalster/formula/nodes.js");
var Compiler = require("$:/plugins/ebalster/formula/compile.js");
var Coerce   = require("$:/plugins/ebalster/formula/coerce.js");

var Numeral  = require("$:/plugins/ebalster/formula/lib/numeral.js");

// TiddlyWiki array format
function arrayFormatTW(arr,ctx) {
	var result = "";
	for (var i = 0; i < arr.length; ++i) {
		var part = Coerce.ToText(arr[i],ctx);
		if (i && part.length) result += " ";
		if (part.indexOf(/\s/g) >= 0) result += "[[" + part + "]]";
		else result += part;
	}
	return result;
}

// Number format functions...

// SANE number formatting: if we find five consecutive 9s or 0s after the decimal point, round them off.
function NumberStringSane(n) {
	var s = String(n);
	var parse = /^(0\.0*[1-9]\d*?|\d*\.\d*?)(0{5}\d*|9{5}\d*)(|e[+-]\d*)$/.exec(s);
	if (!parse) return s;
	var kept = parse[1], exp = parse[3];
	var end = kept.slice(-1);
	if (parse[2][0] === '0') return ((end === '.') ? kept.substr(0,kept.length-1) : kept) + exp;
	if (end === '.') return (Number(kept.substr(0,kept.length-1))+1) + exp;
	return kept.substr(0,kept.length-1) + (Number(end)+1) + exp;
}
var numeralFormat      = function(fmt)      {return function(num) {return Numeral(num).format(fmt);};};
var numeralFormatPrec  = function(fmt,digs) {return function(num) {return Numeral(num.toPrecision(digs)).format(fmt);};};
var numberFormatFixed  = function(prec)     {return function(num) {return num.toFixed    (prec);};};
var numberFormatPrec   = function(digs)     {return function(num) {return num.toPrecision(digs);};};
var numberFormatSelect = function(settings)
{
	if (settings.precision == "true" || settings.precision > 100) return String;
	if (typeof settings.numberFormat == "string") {
		// Use numeral
		return isNaN(settings.precision) ?
			numeralFormat    (settings.numberFormat) :
			numeralFormatPrec(settings.numberFormat, settings.precision);
	}
	if (!isNaN(settings.fixed))     return numberFormatFixed(settings.fixed);
	if (!isNaN(settings.precision)) return numberFormatPrec (settings.precision);
	return NumberStringSane;
	// return String;
};

exports.computeFormula = function(compiledFormula, widget, formatOptions, debug) {
	
	var value, context;
	
	formatOptions = formatOptions || {};

	var dateFormat = formatOptions.dateFormat || "0hh:0mm, DDth MMM YYYY";

	// Specify format.  These are all required!
	var formats = {
		number: numberFormatSelect(formatOptions),
		date:   function(date) {return $tw.utils.formatDateString(date, dateFormat);},
		array:  arrayFormatTW,
	};

	context = new Nodes.Context(widget, formats);

	// Compute a value from the root node of the compiled formula.
	try {
		value = compiledFormula.computeText(context);
	}
	catch (err) {
		throw "ComputeError: " + String(err) + (err.fileName || "") + (err.lineNumber || "")
			+ (debug ? "\nNodes: " + JSON.stringify(compiledFormula) : "");
	}

	// Format the root node as a string.
	if (debug) return value + "\n - Val:" + String(value) + ", Op:" + compiledFormula.name;
	else       return value;
};

exports.evalFormula = function(formulaString, widget, formatOptions, debug) {
	
	var compiledFormula;

	// Compile the formula
	try {
		compiledFormula = Compiler.compileExpression(formulaString);
	}
	catch (err) {
		throw "CompileError: " + String(err);
	}

	// Compute the formula
	return exports.computeFormula(compiledFormula, widget, formatOptions, debug);
};

})();
