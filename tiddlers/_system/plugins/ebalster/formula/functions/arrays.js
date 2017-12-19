(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Array = Val.V_Array;


exports.nth = function(a, i) {
    if (! (a instanceof V_Array)) throw "NTH(a,i) function requires a is array!";
    a = a.get();
    i = Math.floor(i.asNum());
    if (i < a.length) return a[i];
    return new Val.V_Undefined();
}

exports.first = function(a) {
    if (! (a instanceof V_Array)) throw "FIRST(a) function requires a is array!";
    a = a.get();
    if (a.length) return a[0];
    return new Val.V_Undefined();
}

exports.last = function(a) {
    if (! (a instanceof V_Array)) throw "LAST(a) function requires a is array!";
    a = a.get();
    if (a.length) return a[a.length-1];
    return new Val.V_Undefined();
}

// COUNT function, currently counts everything
exports.count =
{
    min_args : 1,
    select : function(operands)
    {
        switch (operands)
        {
        case 1: return function(a) {
                if (a instanceof V_Array) return new V_Num(a.get().length);
                return 1;
            };
        default: return function() {
                var count = 0;
                for (var i = 0; i < arguments.length; ++i)
                {
                    var a = arguments[i];
                    count += ((a instanceof V_Array) ? a.get().length : 1);
                }
                return new V_Num(count);
            }
        }
    }
};

// COUNTA function, currently counts everything
exports.counta = exports.count;


})();