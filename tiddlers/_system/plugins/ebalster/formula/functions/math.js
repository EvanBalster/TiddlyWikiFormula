(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Coerce = require("$:/plugins/ebalster/formula/coerce.js");


// Constants
exports.pi = function()    {return (Math.PI);};
exports._e = function()    {return (Math.E);};

exports.pi.isConstant = true;
exports._e.isConstant = true;


// Random
exports.rand        = function()        {return Math.random();};
exports.randbetween = function(a, b)    {return (a+(b-a)*Math.random());};
exports.randbetween.inCast = 'NN';
exports.random = exports.rand;


// Sign and absolute value
exports.abs  = function(a)    {return Math.abs(a);};
exports.abs.inCast = 'N';
exports.sign = function(x)    {return (((x > 0) - (x < 0)) || +x);};
exports.sign.inCast = 'N';

// Min/max
exports.min = function(a)
{
	var min = a;
	for (var i = 1; i < arguments.length; ++i) min = Math.min(min, arguments[i]);
	return min;
};
exports.min.variadic = true;
exports.min.inCast = '+N';

exports.max = function(a)
{
	var max = a;
	for (var i = 1; i < arguments.length; ++i) max = Math.max(max, arguments[i]);
	return max;
};
exports.max.variadic = true;
exports.max.inCast = '+N';

exports.clamp = function(a, min, max) {
	return (Math.min(Math.max(a, min), max));
};
exports.clamp.inCast = 'NNN';


/*
	Series arithmetic
*/
function Count(a) {
	if (a instanceof Array) {
		var n = 0;
		for (var i = 0; i < a.length; ++i) n += Count(a[i]);
		return n;
	}
	return 1;
}
function Sum(a) {
	if (a instanceof Array) {
		var n = 0;
		for (var i = 0; i < a.length; ++i) n += Sum(a[i]);
		return n;
	}
	return Coerce.ToNum(a,this);
}
function Product(a) {
	if (a instanceof Array) {
		var n = 1;
		for (var i = 0; i < a.length; ++i) n *= Product(a[i]);
		return n;
	}
	return Coerce.ToNum(a,this);
}
function Average(a) {
	return Sum(a) / Count(a);
}

function GenSeriesFunc(func) {
	return {
		min_args : 1,
		select : function(operands) {
			switch (operands.length) {
			case 1: return func;
			default: return function() {return func(Array.prototype.slice.call(arguments));};
			}
		}
	};
}

exports.sum     = GenSeriesFunc(Sum);
exports.average = GenSeriesFunc(Average);
exports.product = GenSeriesFunc(Product);


/*
	Exponential
*/

// Exponentiation and logarithm
exports.pow   = function(a, b)    {return (Math.pow(a, b));};
exports.pow.inCast = 'NN';
exports.log   = function(a, b)    {return (Math.log(a) / Math.log(b));};
exports.log.inCast = 'NN';
exports.exp   = function(a)       {return (Math.exp(a));};
exports.exp.inCast = 'N';
exports.ln    = function(a)       {return (Math.log(a));};
exports.ln.inCast = 'N';
exports.log2  = function(a)       {return (Math.log2(a));};
exports.log2.inCast = 'N';
exports.log10 = function(a)       {return (Math.log10(a));};
exports.log10.inCast = 'N';

exports.power = exports.pow;

// Precise exponentiation and logarithm
exports.expm1 = function(a)       {return (Math.expm1(a));};
exports.expm1.inCast = 'N';
exports.log1p = function(a)       {return (Math.log1p(a));};
exports.log1p.inCast = 'N';

// Roots
exports.sqrt = function(a)    {return (Math.sqrt(a));};
exports.sqrt.inCast = 'N';
exports.cbrt = function(a)    {return (Math.cbrt(a));};
exports.cbrt.inCast = 'N';


/*
	Trigonometry
*/

// Conversion
exports.radians = function(a)    {return (Math.PI*a/180);};
exports.radians.inCast = 'N';
exports.degrees = function(a)    {return (180*a/Math.PI);};
exports.degrees.inCast = 'N';

// Trigonometry
exports.sin = function(a)    {return (  Math.sin(a));};
exports.sin.inCast = 'N';
exports.cos = function(a)    {return (  Math.cos(a));};
exports.cos.inCast = 'N';
exports.tan = function(a)    {return (  Math.tan(a));};
exports.tan.inCast = 'N';
exports.csc = function(a)    {return (1/Math.sin(a));};
exports.csc.inCast = 'N';
exports.sec = function(a)    {return (1/Math.cos(a));};
exports.sec.inCast = 'N';
exports.cot = function(a)    {return (1/Math.tan(a));};
exports.cot.inCast = 'N';

// Inverse Trigonometry
exports.asin = function(a)    {return (Math.asin(  a));};
exports.asin.inCast = 'N';
exports.acos = function(a)    {return (Math.acos(  a));};
exports.acos.inCast = 'N';
exports.atan = function(a)    {return (Math.atan(  a));};
exports.atan.inCast = 'N';
exports.acsc = function(a)    {return (Math.asin(1/a));};
exports.acsc.inCast = 'N';
exports.asec = function(a)    {return (Math.acos(1/a));};
exports.asec.inCast = 'N';
exports.acot = function(a)    {return (Math.atan(1/a));};
exports.acot.inCast = 'N';
exports.atan2 = function(y,x)    {return (Math.atan2(y, x));};
exports.atan2.inCast = 'NN';

// Hyperbolic Trigonometry
exports.sinh = function(a)    {return (  Math.sinh(a));};
exports.sinh.inCast = 'N';
exports.cosh = function(a)    {return (  Math.cosh(a));};
exports.cosh.inCast = 'N';
exports.tanh = function(a)    {return (  Math.tanh(a));};
exports.tanh.inCast = 'N';
exports.csch = function(a)    {return (1/Math.sinh(a));};
exports.csch.inCast = 'N';
exports.sech = function(a)    {return (1/Math.cosh(a));};
exports.sech.inCast = 'N';
exports.coth = function(a)    {return (1/Math.tanh(a));};
exports.coth.inCast = 'N';

// Inverse Hyperbolic Trigonometry
exports.asinh = function(a)    {return (Math.asinh(  a));};
exports.asinh.inCast = 'N';
exports.acosh = function(a)    {return (Math.acosh(  a));};
exports.acosh.inCast = 'N';
exports.atanh = function(a)    {return (Math.atanh(  a));};
exports.atanh.inCast = 'N';
exports.acsch = function(a)    {return (Math.asinh(1/a));};
exports.acsch.inCast = 'N';
exports.asech = function(a)    {return (Math.acosh(1/a));};
exports.asech.inCast = 'N';
exports.acoth = function(a)    {return (Math.atanh(1/a));};
exports.acoth.inCast = 'N';

/*
	Rounding, ceiling and floor functions.
		Special measures were taken to reproduce the conventions.
*/

var signedFloor = Math.trunc || function(n) {return (n<0) ? Math.ceil (n) : Math.floor(n);};
var signedCeil  =               function(n) {return (n<0) ? Math.floor(n) : Math.ceil (n);};

function genCeilFloor(func) {
	var by1 = function(a) {return func(a);},
		byN = function(a, b) {var prec = b; return (func(a/prec) * prec);};
	by1.inCast = 'NN';
	byN.inCast = 'NN';
	return {
		min_args : 1, max_args : 2,
		input: 'NN',
		select: function(operands) {
			switch (operands.length)
			{
			case 1: return by1;
			case 2: return byN;
			}
		}
	};
}

function genRound(func) {
	var lndigit = Math.log(0.1);
	var by1 = function(a)    {return func(a);},
		byN = function(a, b) {var prec = Math.exp(lndigit*b); return (func(a/prec) * prec);};
	by1.inCast = 'NN';
	byN.inCast = 'NN';
	return {
		min_args : 1, max_args : 2,
		input: 'NN',
		select: function(operands) {
			switch (operands.length)
			{
			case 1: return by1;
			case 2: return byN;
			}
		}
	};
}

exports.floor     = genCeilFloor(Math.floor);
exports.ceil      = genCeilFloor(Math.ceil);
//exports.floor_precise  = genCeilFloor(Math.floor);
//exports.ceil_precise  = genCeilFloor(Math.ceil);
exports.round     = genRound(Math.round);
exports.roundup   = genRound(signedCeil);
exports.rounddown = genRound(signedFloor);
exports.trunc     = exports.rounddown;

// Related functions
exports.fract  = function(a)      {return (a-signedFloor(a));};
exports.fract.inCast = 'NN';
exports.modulo = function(a,b)    {return (a-b*Math.floor(a/b));};
exports.modulo.inCast = 'NN';

exports.mod = exports.modulo;


/*
	Interpolation
*/
exports.mix = function(a,b,m) {return (a + (b-a) * m);};
exports.mix.inCast = 'NNN';

exports.step = function(e,x)    {return ((x<e) ? 0.0 : 1.0);};
exports.step.inCast = 'NN';

exports.smoothstep = function(e0,e1,x) {
	if (x < e0) return (0.0);
	if (x > e1) return (1.0);
	x = (x-e0) / (e1-e0);
	return (3*x*x - 2*x*x*x);
};
exports.smoothstep.inCast = 'NNN';


/*
	Algorithms
*/
exports.gcd = function(a,b) {
	a = Math.abs(Math.round(a));
	b = Math.abs(Math.round(b));
	if (b > a) {var temp = a; a = b; b = temp;}
	var limit = 1000;
	while (true) {
		if (b == 0) return a;
		a %= b;
		if (a == 0) return b;
		b %= a;
		if (--limit < 0) throw "GCD function is nonterminal!";
	}
};
exports.gcd.inCast = 'NN';

exports.lcm = function(a,b) {
	a = Math.abs(Math.round(a));
	b = Math.abs(Math.round(b));
	return (!a || !b) ? 0 : Math.abs((a * b) / exports.gcd(a, b));
};
exports.lcm.inCast = 'NN';


})();