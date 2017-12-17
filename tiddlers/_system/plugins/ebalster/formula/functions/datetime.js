(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Date = Val.V_Date;
var V_Num  = Val.V_Num;


/*!
 * iso-week <https://github.com/jonschlinkert/iso-week>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 * 
 * THIS FUNCTION APPEARS TO BE BUGGY
 */
function isoWeekOfYear(date, firstday=4) {
    date = date instanceof Date ? date : new Date();
    var res = new Date(date.valueOf());
    var day = (date.getDay() + 6) % 7;
    res.setDate(res.getDate() - day + 3);
    var first = new Date(res.getFullYear(), 0, firstday);
    var days = Math.floor((res - first) / 86400000);
    return 1 + Math.ceil(days / 7);
};
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}


// Get the current time
exports.now         = function()     {return new V_Date(new Date(Date.now()));}

// Decompose dates
exports.year        = function(d)    {return new V_Num(d.asDate().getFullYear());}
exports.month       = function(d)    {return new V_Num(d.asDate().getMonth());}
exports.day         = function(d)    {return new V_Num(d.asDate().getDate());}
exports.hour        = function(d)    {return new V_Num(d.asDate().getHours());}
exports.minute      = function(d)    {return new V_Num(d.asDate().getMinutes());}
exports.second      = function(d)    {return new V_Num(d.asDate().getSeconds());}
exports.millisecond = function(d)    {return new V_Num(d.asDate().getMilliseconds());}

// Week functions
exports.weekday     = function(d)    {return new V_Num(d.asDate().getDay()+1);}
exports.weeknum     = function(d)    {return new V_Num(isoWeekOfYear(d.asDate(), 1));}
exports.isoweekday  = function(d)    {return new V_Num((d.asDate().getDay()+6) % 7 + 1);}
exports.isoweeknum  = function(d)    {return new V_Num(isoWeekOfYear(d.asDate()));}


/*
    Date math
*/
function makeTimeDiffFunction(milliseconds) {
    return function(a, b) {return new V_Num((b.asDate().getTime() - a.asDate().getTime()) / milliseconds);}
}
function makeTimeAddFunction(milliseconds) {
    return function(a, b) {return new V_Date(new Date(a.asDate().getTime() + b.asNum() * milliseconds));}
}

exports.days            = makeTimeDiffFunction(86400000);
exports.hours           = makeTimeDiffFunction( 3600000);
exports.minutes         = makeTimeDiffFunction(   60000);
exports.seconds         = makeTimeDiffFunction(    1000);
exports.milliseconds    = makeTimeDiffFunction(       1);

exports.add_days         = makeTimeAddFunction(86400000);
exports.add_hours        = makeTimeAddFunction( 3600000);
exports.add_minutes      = makeTimeAddFunction(   60000);
exports.add_seconds      = makeTimeAddFunction(    1000);
exports.add_milliseconds = makeTimeAddFunction(       1);

/*function datedif_util(a, days) {
    var years = 0, months = 0, reverse = (days < 0);
    var accum = 0, baseYear = a.getFullYear(), baseMonth = a.getMonth();
    if (reverse)
    {
        while (accum > days)
        {

        }
    }
}

exports.datedif = function(a, b, c) {
    a = a.asDate();
    b = b.asDate();
    var days = (b.getTime() - a.getTime()) / 86400000;
    var months = 0, years = 0;
    var years = days / 365;
    switch (c.asString().toUpperCase())
    {
    case "D": return days;
    case "M": return 
    case "Y": return years;
    }
};*/


// Parse TiddlyWiki date
exports.tw_date = function(timestamp) {
    var date = $tw.utils.parseDate(timestamp.asString());
    if (!date) throw "Bad timestamp: \"" + date + "\"";
    return new V_Date(date);
}

// Stringify as TiddlyWiki date
exports.to_tw_date = function(date) {
    return $tw.utils.stringifyDate(date.asDate());
}

// Create ISO date
exports.make_date = function(year, month, day) {
    return new V_Date(new Date(year.asNum(), month.asNum()-1, day.asNum()));
}

// Create ISO time
exports.make_time = function(hour, minute, second) {
    return new V_Date(new Date(0, 0, 0, hour.asNum(), minute.asNum(), second.asNum()));
}

exports.time = exports.make_time;


// Consruct a date from a TiddlyWiki timestamp or a set of parts
exports.date = {
    min_args: 1, max_args: 3,
    select: function(operands) {
        switch (operands.length) {
        case 1: return exports.tw_date;
        case 3: return exports.make_date;
        default: throw "Bad arguments to DATE. Should be (timestamp) or (year, month, day).";
        }
    }
};


})();