(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");
var Ops = require("$:/plugins/ebalster/formula/operands.js");


// Concatenate
exports.cat = function(a, b)    {return new Val.Value_String(a.asString() + b.asString());};


// Aliases
exports.concatenate = exports.cat;


})();