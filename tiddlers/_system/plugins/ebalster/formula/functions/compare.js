(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");


// Equality
exports.eq  = function(a, b)    {return new Val.V_Bool(a.get() == b.get());};
exports.ne  = function(a, b)    {return new Val.V_Bool(a.get() != b.get());};

// Inequality
exports.gt  = function(a, b)    {return new Val.V_Bool(a.get() >  b.get());};
exports.gte = function(a, b)    {return new Val.V_Bool(a.get() >= b.get());};
exports.lt  = function(a, b)    {return new Val.V_Bool(a.get() <  b.get());};
exports.lte = function(a, b)    {return new Val.V_Bool(a.get() <= b.get());};


// Aliases
exports.equal            = exports.eq;
exports.not_equal        = exports.ne;
exports.greater          = exports.gt;
exports.greater_or_equal = exports.gte;
exports.less             = exports.lt;
exports.less_or_equal    = exports.lte;


})();