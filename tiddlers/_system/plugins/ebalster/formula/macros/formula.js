(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
  Information about this macro
*/

exports.name = "formula";
exports.params = [{"name": "formula"}];

/*
Run the macro
*/
exports.run = function(formula) {

  var formulas = require("$:/plugins/ebalster/formula/compile.js");

  return formulas.evalFormula(formula, this);
};

})();
