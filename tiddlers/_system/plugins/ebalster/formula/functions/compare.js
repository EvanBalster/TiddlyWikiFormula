(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


// Equality
exports.eq  = function(a, b)    {return a == b;};
exports.ne  = function(a, b)    {return a != b;};

// Inequality
exports.gt  = function(a, b)    {return a >  b;};
exports.gte = function(a, b)    {return a >= b;};
exports.lt  = function(a, b)    {return a <  b;};
exports.lte = function(a, b)    {return a <= b;};


// Aliases
exports.equal            = exports.eq;
exports.not_equal        = exports.ne;
exports.greater          = exports.gt;
exports.greater_or_equal = exports.gte;
exports.less             = exports.lt;
exports.less_or_equal    = exports.lte;


})();