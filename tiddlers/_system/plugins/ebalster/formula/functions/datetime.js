(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Val = require("$:/plugins/ebalster/formula/value.js");

var V_Date = Val.V_Date;
var V_Num  = Val.V_Num;


/*!
 * isoWeekNum from pikaday <https://github.com/actano/Pikaday>
 */
function isoWeekOfYear(date, dayInFirstWeek = 4) {
    date = date instanceof Date ? date : new Date();
    date.setHours(0, 0, 0, 0);
    var yearDay        = date.getDate()
      , weekDay        = date.getDay()
      , dayShift       = dayInFirstWeek - 1 // counting starts at 0
      , daysPerWeek    = 7
      , prevWeekDay    = function(day) { return (day + daysPerWeek - 1) % daysPerWeek; }
    ;
    date.setDate(yearDay + dayShift - prevWeekDay(weekDay));
    var jan4th      = new Date(date.getFullYear(), 0, dayInFirstWeek)
      , msPerDay    = 24 * 60 * 60 * 1000
      , daysBetween = (date.getTime() - jan4th.getTime()) / msPerDay
      , weekNum     = 1 + Math.round((daysBetween - dayShift + prevWeekDay(jan4th.getDay())) / daysPerWeek)
    ;
    return weekNum;
};
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, monthIndex) {
    switch (monthIndex) {
    case  0: case  2: case  4: case  6: case  7: case  9: case 11:return 31;
    case  3: case  5: case  8: case 10: return 30;
    case  1: return (isLeapYear(year) ? 29 : 28);
    default: throw "daysInMonth: invalid monthIndex: " + monthIndex;
    }
}

// Utility: Add some months or years to a date
function dateAddMonths(date, monthDiff, yearDiff = 0) {
    var newMonth = date.getMonth() + Math.round(monthDiff);
    var newYear = date.getFullYear() + Math.round(yearDiff);

    var yearShift = ((newMonth < 0) ? -Math.floor(-(newMonth-11)/12) : Math.floor(newMonth/12));
    newYear  += yearShift;
    newMonth -= 12*yearShift;

    return new Date(newYear, newMonth,
        Math.min(date.getDate(), daysInMonth(newYear, newMonth)),
        date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

// Utility: Get date difference in whole years and months
function dateDelta(date1, date2) {
    if (date2.getTime() < date1.getTime())
    {
        var d = dateDelta(date2, date1);
        return {years: -d.years, months: -d.months};
    }
    var dMonths = 12*(date2.getYear()-date1.getYear()) + (date2.getMonth()-date1.getMonth());
    if (date2.getDate() < date1.getDate()) dMonths -= 1;
    var dYears = Math.floor(dMonths/12);
    //dMonths -= dYears*12;
    /*var dDays = (new Date(
        date1.getFullYear()+dYears, date1.getMonth()+dMonths, date2.getDate(),
        date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds()
        ).getTime() - date1.getTime()) / 86400000;*/
    return {years: dYears, months: dMonths};
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

exports.years  = function(a, b) {return new V_Num(dateDelta(a.asDate(), b.asDate()).years);};
exports.months = function(a, b) {return new V_Num(dateDelta(a.asDate(), b.asDate()).months);};
exports.days            = makeTimeDiffFunction(86400000);
exports.hours           = makeTimeDiffFunction( 3600000);
exports.minutes         = makeTimeDiffFunction(   60000);
exports.seconds         = makeTimeDiffFunction(    1000);
exports.milliseconds    = makeTimeDiffFunction(       1);

exports.add_years  = function(a, b) {return new V_Date(dateAddMonths(a.asDate(), 0, b.asNum()));};
exports.add_months = function(a, b) {return new V_Date(dateAddMonths(a.asDate(), b.asNum()));};
exports.add_days         = makeTimeAddFunction(86400000);
exports.add_hours        = makeTimeAddFunction( 3600000);
exports.add_minutes      = makeTimeAddFunction(   60000);
exports.add_seconds      = makeTimeAddFunction(    1000);
exports.add_milliseconds = makeTimeAddFunction(       1);

/*exports.datedif = function(a, b, c) {
    a = a.asDate();
    b = b.asDate();
    switch (c.asString().toUpperCase())
    {
    case "D": return new V_Num((b.getTime() - a.getTime()) / 86400000);
    case "M": {var d=dateDelta(a, b); return d.months+12*d.years;}
    case "Y": return dateDelta(a, b).years;
    case "YM": return dateDelta(a, b).months;
    case "MD": return dateDelta(a, b).days;
    }
};*/


// Parse TiddlyWiki date
exports.tw_date = function(timestamp) {
    var date = $tw.utils.parseDate(timestamp.asString());
    if (!date) throw "Bad timestamp: \"" + date + "\"";
    return new V_Date(date);
}

function to_date(a) {
    if (a instanceof V_Date) return a;
    return exports.tw_date(a);
}

// Stringify as TiddlyWiki date
exports.to_tw_date = function(date) {
    return new V_String($tw.utils.stringifyDate(date.asDate()));
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
        case 1: return exports.to_date;
        case 3: return exports.make_date;
        default: throw "Bad arguments to DATE. Should be (timestamp) or (year, month, day).";
        }
    }
};


})();