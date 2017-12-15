(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Num = Val.V_Num;


// Constants
exports.pi    = function()    {return new V_Num(Math.PI);}
exports.euler = function()    {return new V_Num(Math.E);}


// Random
exports.rand        = function()        {return new V_Num(Math.random());}
exports.randbetween = function(a, b)    {a=a.asNum(); b=b.asNum(); return new V_Num(a+(b-a)*Math.random());}
exports.random = exports.rand;


// Sign and absolute value
exports.abs  = function(a)    {return new V_Num(Math.abs(a.asNum()));}
exports.sign = function(a)    {var x = a.asNum(); return new V_Num(((x > 0) - (x < 0)) || +x);}

// Min/max
exports.min = function(a)
{
    var min = a.asNum();
    for (var i = 1; i < arguments.length; ++i) min = Math.min(min, arguments[i].asNum());
    return new V_Num(min);
}
exports.min.variadic = true;

exports.max = function(a)
{
    var max = a.asNum();
    for (var i = 1; i < arguments.length; ++i) max = Math.max(max, arguments[i].asNum());
    return new V_Num(max);
}
exports.max.variadic = true;


/*
    Series arithmetic
*/
exports.sum =
{
    min_args : 1,
    select : function(operands)
    {
        switch (operands)
        {
        case 1: return function(a) {return new Val.V_Num(a.asSum());};
        default: return function()
            {
                var sum = 0;
                for (var i = 0; i < arguments.length; ++i) sum += arguments[i].asSum();
                return new V_Num(sum);
            }
        }
    }
};
exports.product = function()
{
    var product = 1;
    for (var i = 0; i < arguments.length; ++i) product *= arguments[i].asNum();
    return new V_Num(product);
};
exports.product.variadic = true;


/*
    Exponential
*/

// Exponentiation and logarithm
exports.pow   = function(a, b)    {return new V_Num(Math.pow(a.asNum(), b.asNum()));};
exports.exp   = function(a)       {return new V_Num(Math.exp(a.asNum()));}
exports.log   = function(a, b)    {return new V_Num(Math.log(a.asNum()) / Math.log(b.asNum()));}
exports.ln    = function(a)       {return new V_Num(Math.log(a.asNum()));}
exports.log2  = function(a)       {return new V_Num(Math.log2(a.asNum()));}
exports.log10 = function(a)       {return new V_Num(Math.log10(a.asNum()));}

exports.power = exports.pow;

// Precise exponentiation and logarithm
exports.expm1 = function(a)       {return new V_Num(Math.expm1(a.asNum()));}
exports.log1p = function(a)       {return new V_Num(Math.log1p(a.asNum()));}

// Roots
exports.sqrt = function(a)    {return new V_Num(Math.sqrt(a.asNum()));}
exports.cbrt = function(a)    {return new V_Num(Math.cbrt(a.asNum()));}


/*
    Trigonometry
*/

// Conversion
exports.radians = function(a)    {return new V_Num(Math.PI*a.asNum()/180);}
exports.degrees = function(a)    {return new V_Num(180*a.asNum()/Math.PI);}

// Trigonometry
exports.sin = function(a)    {return new V_Num(  Math.sin(a.asNum()));}
exports.cos = function(a)    {return new V_Num(  Math.cos(a.asNum()));}
exports.tan = function(a)    {return new V_Num(  Math.tan(a.asNum()));}
exports.csc = function(a)    {return new V_Num(1/Math.sin(a.asNum()));}
exports.sec = function(a)    {return new V_Num(1/Math.cos(a.asNum()));}
exports.cot = function(a)    {return new V_Num(1/Math.tan(a.asNum()));}

// Inverse Trigonometry
exports.asin = function(a)    {return new V_Num(Math.asin(  a.asNum()));}
exports.acos = function(a)    {return new V_Num(Math.acos(  a.asNum()));}
exports.atan = function(a)    {return new V_Num(Math.atan(  a.asNum()));}
exports.acsc = function(a)    {return new V_Num(Math.asin(1/a.asNum()));}
exports.asec = function(a)    {return new V_Num(Math.acos(1/a.asNum()));}
exports.acot = function(a)    {return new V_Num(Math.atan(1/a.asNum()));}

// Hyperbolic Trigonometry
exports.sinh = function(a)    {return new V_Num(  Math.sinh(a.asNum()));}
exports.cosh = function(a)    {return new V_Num(  Math.cosh(a.asNum()));}
exports.tanh = function(a)    {return new V_Num(  Math.tanh(a.asNum()));}
exports.csch = function(a)    {return new V_Num(1/Math.sinh(a.asNum()));}
exports.sech = function(a)    {return new V_Num(1/Math.cosh(a.asNum()));}
exports.coth = function(a)    {return new V_Num(1/Math.tanh(a.asNum()));}

// Inverse Hyperbolic Trigonometry
exports.asinh = function(a)    {return new V_Num(Math.asinh(  a.asNum()));}
exports.acosh = function(a)    {return new V_Num(Math.acosh(  a.asNum()));}
exports.atanh = function(a)    {return new V_Num(Math.atanh(  a.asNum()));}
exports.acsch = function(a)    {return new V_Num(Math.asinh(1/a.asNum()));}
exports.asech = function(a)    {return new V_Num(Math.acosh(1/a.asNum()));}
exports.acoth = function(a)    {return new V_Num(Math.atanh(1/a.asNum()));}

/*
    Rounding, ceiling and floor functions.
        Special measures were taken to reproduce the conventions.
*/

var signedFloor = Math.trunc || function(n) {return (n<0) ? Math.ceil (n) : Math.floor(n);}
var signedCeil  =               function(n) {return (n<0) ? Math.floor(n) : Math.ceil (n);}

function genCeilFloor(operands, func)
{
    switch (operands.length)
    {
    case 1: return function(a)    {return new V_Num(func(a.asNum()));};
    case 2: return function(a, b) {var prec = b.asNum(); return func(a.asNum()/prec) * prec;};
    }
}

function genRound(operands, func)
{
    switch (operands.length)
    {
    case 1: return function(a)    {return new V_Num(func(a.asNum()));};
    case 2: return function(a, b) {var prec = Math.pow(10, b.asNum()); return func(a.asNum()/prec) * prec;};
    }
}


exports.floor =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genCeilFloor(operands, signedFloor);}
};
exports.ceil =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genCeilFloor(operands, signedCeil);}
};
exports.floor_precise =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genCeilFloor(operands, Math.floor);}
};
exports.ceil_precise =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genCeilFloor(operands, Math.ceil);}
};
exports.round =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genRound(operands, Math.round);}
};
exports.roundup =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genRound(operands, signedCeil);}
};
exports.rounddown =
{
    min_args : 1, max_args : 2,
    select : function(operands) {return genRound(operands, signedFloor);}
};

exports.trunc = exports.rounddown;

})();