(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");


// Concatenate
exports.cat = function(a, b)    {return new Val.V_Text(a.asString() + b.asString());};


// Aliases
exports.concatenate = exports.cat;


})();