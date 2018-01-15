(function(){

"use strict";


exports.NumberFormatFunc = null;

exports.DateFormat = "0hh:0mm, DDth MMM YYYY";


// Base type for formula values
exports.Value = function() {
  this.name = "unknown-value";
};

// Get the value payload
exports.Value.prototype.get = function()    {return undefined;};

// Describe the value
exports.Value.prototype.describe = function()    {return this.name + " (" + String(this.get()) + ")";};

exports.Value.prototype.toString = function()    {return "[Value " + this.describe() + "]";};

// Get the value as a number (generic implementation)
exports.Value.prototype.asNum = function() {
  var v = this.get();
  var n = Number(v);
  if (isNaN(n)) throw "Cannot convert " + this.describe() + " to a number!";
  return n;
};

// Get the value as a number, summing arrays (generic implementation)
exports.Value.prototype.asSum = function() {
  var v = this.get();
  var n;
  if (Array.isArray(v)) {n = 0; for (var i = 0; i < v.length; ++i) n += Number(v[i]);}
  else                  n = Number(v);
  if (isNaN(n)) throw "Cannot sum " + this.describe() + " to a number!";
  return n;
};

// More convertsions
exports.Value.prototype.asString = function() {
  return String(this.get());
};
exports.Value.prototype.asArray = function() {
  var v = this.get();
  if (Array.isArray(v)) return v;
  else return [v];
};
exports.Value.prototype.asDate = function() {
  throw "Cannot convert " + this.describe() + " to a date!";
};


// Undefined value.
exports.V_Undefined = function() {
  this.name = "undefined";
};
exports.V_Undefined.prototype = new exports.Value();
exports.V_Undefined.prototype.get = function()    {return undefined;};


// Array value.
exports.V_Array = function(value) {
  this.name = "array";

  this.value = value;
};
exports.V_Array.prototype = new exports.Value();
exports.V_Array.prototype.get   = function() {return this.value;};
exports.V_Array.prototype.asNum = function() {throw "Cannot convert " + this.describe() + " to number!";};
exports.V_Array.prototype.asSum = function() {
  var n = 0;
  for (var i = 0; i < this.value.length; ++i) n += this.value[i].asNum();
  if (isNaN(n)) throw "Cannot sum " + this.describe() + " to a number!";
  return n;
};
exports.V_Array.prototype.asString     = function() {
  var result = "";
  for (var i = 0; i < this.value.length; ++i) {
    var part = this.value[i].asString();
    if (i && part.length) result += " ";
    if (part.indexOf(/\s/g) >= 0) result += "[[" + part + "]]";
    else result += part;
  }
  return result;
};


// String value.
exports.V_Text = function(value) {
  this.name = "string";

  this.value = value;
};
exports.V_Text.prototype = new exports.Value();
exports.V_Text.prototype.get    = function()    {return this.value;};
//exports.V_Text.prototype.asDate = function() {return $tw.utils.parseDate();}


// Date value.
exports.V_Date = function(value) {
  this.name = "date";

  this.value = value;
};
exports.V_Date.prototype = new exports.Value();
exports.V_Date.prototype.get      = function()    {return this.value;};
exports.V_Date.prototype.asString = function()    {return $tw.utils.formatDateString(this.value, exports.DateFormat);};
exports.V_Date.prototype.asNum    = function()    {throw "Date-to-Number conversion usupported";};
exports.V_Date.prototype.asSum    = function()    {throw "Date-to-Number conversion usupported";};
exports.V_Date.prototype.asDate   = function()    {return this.value;};


// Boolean value.
exports.V_Bool = function(value) {
  this.name = "boolean";

  this.value = value;
};
exports.V_Bool.prototype = new exports.Value();
exports.V_Bool.prototype.get      = function()    {return this.value;};
exports.V_Bool.prototype.asString = function()    {return this.value ? "TRUE" : "FALSE";};
exports.V_Bool.prototype.asNum    = function()    {return this.value ? 1 : 0;};
exports.V_Bool.prototype.asSum    = function()    {return this.value ? 1 : 0;};


// Number value.
exports.V_Num = function(value) {
  this.name = "number";

  this.value = value;
};
exports.V_Num.prototype = new exports.Value();
exports.V_Num.prototype.get      = function()    {return this.value;};
exports.V_Num.prototype.asString = function()    {return (exports.NumberFormatFunc || String)(this.value);};
exports.V_Num.prototype.asNum    = function()    {return this.value;};
exports.V_Num.prototype.asSum    = function()    {return this.value;};


// Percentage value.
exports.V_Percent = function(value) {
  this.name = "percentage";

  this.value = value;
};
exports.V_Percent.prototype = new exports.V_Num();
exports.V_Percent.prototype.asString = function()
{
  return (exports.NumberFormatFunc || String)(100*this.value) + "%";
};

})();
