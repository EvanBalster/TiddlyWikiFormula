@@ -79,33 +79,35 @@
 dule-type: utils
-%0A
+%0D%0A%0D
 %0AUtility functio
@@ -141,33 +141,35 @@
 ext into tokens.
-%0A
+%0D%0A%0D
 %0AMost functions 
@@ -187,33 +187,35 @@
 llowing pattern:
-%0A
+%0D%0A%0D
 %0A* The parameter
@@ -771,33 +771,35 @@
 scribe the token
-%0A
+%0D%0A%0D
 %0AThe exception i
@@ -863,33 +863,35 @@
  the whitespace.
-%0A
+%0D%0A%0D
 %0A%5C*/%0A(function()
@@ -883,33 +883,35 @@
 %5C*/%0A(function()%7B
-%0A
+%0D%0A%0D
 %0A/*jslint node: 
@@ -961,33 +961,35 @@
 */%0A%22use strict%22;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a w
@@ -1490,33 +1490,35 @@
 end: p%0A%09%09%7D%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0AConvenience 
@@ -1884,33 +1884,35 @@
 n pos;%0A%09%09%7D%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a g
@@ -2238,33 +2238,35 @@
 %09return null;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a t
@@ -2669,33 +2669,35 @@
 turn null;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a s
@@ -3246,33 +3246,35 @@
 turn null;%0A%09%7D%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a m
@@ -4346,33 +4346,35 @@
 %09return node;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for a m
@@ -5536,33 +5536,35 @@
 %09return node;%0A%7D;
-%0A
+%0D%0A%0D
 %0A/*%0ALook for an 
@@ -5716,32 +5716,62 @@
 art:, end:,%7D%0A*/%0A
+var AttributeRules = null;%0D%0A%0D%0A
 exports.parseAtt
@@ -6630,40 +6630,20 @@
 l) %7B%0A%09%09%09
-pos = stringLiteral.end;
+%09%09%09%09
 %0A%09%09%09node
@@ -6699,533 +6699,481 @@
 alue;%0A%09%09
-%7D else %7B%0A%09%09%09// Look for a filtered value%0A%09%09%09var filteredValue = $tw.utils.parseTokenRegExp(source,pos,reFilteredValue);%0A%09%09%09if(filteredValue) %7B%0A%09%09%09%09pos = filteredValue.end;%0A%09%09%09%09node.type = %22filtered%22;%0A%09%09%09%09node.filter = filteredValue.match%5B1%5D;%0A%09%09%09%7D else %7B%0A%09%09%09%09// Look for an indirect value%0A%09%09%09%09var indirectValue = $tw.utils.parseTokenRegExp(source,pos,reIndirectValue);%0A%09%09%09%09if(indirectValue) %7B%0A%09%09%09%09%09pos = indirectValue.end;%0A%09%09%09%09%09node.type = %22indirect%22;%0A%09%09%09%09%09node.textReference = indirectValue.
+%09node.end = stringLiteral.end;%0A%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%0A%09%09%09return node;%0A%09%09%7D%0A%09%09// Load attribute rules if needed%0A%09%09if (!AttributeRules) %7B%0A%09%09%09AttributeRules = %7B%7D;%0A%09%09%09$tw.modules.applyMethods(%22attributerule%22,AttributeRules);%0A%09%09%7D%0A%09%09// Look for an attribute rule%0A%09%09var match = null;%0A%09%09$tw.utils.each(AttributeRules,function(rule) %7B%0A%09%09%09match = rule(source,pos,node);%0A%09%09%09return !match;%0A%09%09%7D);%0A%09%09if (match) return 
 match
-%5B1%5D
 ;%0A%09%09%09%09
-%7D else %7B
+%09%09%09%09%09%09%09%09%09
 %0A%09%09%09
+%0A
 %09%09// Loo
@@ -7187,35 +7187,32 @@
  unquoted value%0A
-%09%09%09
 %09%09var unquotedVa
@@ -7269,35 +7269,32 @@
 otedAttribute);%0A
-%09%09%09
 %09%09if(unquotedVal
@@ -7304,45 +7304,20 @@
  %7B%0A%09%09%09%09%09
-%09pos = unquotedValue.end;%0A
 %09%09%09
+%0A
 %09%09%09node.
@@ -7325,35 +7325,32 @@
 ype = %22string%22;%0A
-%09%09%09
 %09%09%09node.value = 
@@ -7376,288 +7376,156 @@
 %5B1%5D;%0A%09%09%09
-%09%09%7D else %7B%0A%09%09%09%09%09%09// Look for a macro invocation value%0A%09%09%09%09%09%09var macroInvocation = $tw.utils.parseMacroInvocation(source,pos);%0A%09%09%09%09%09%09if(macroInvocation) %7B%0A%09%09%09%09%09%09%09pos = macroInvocation.end;%0A%09%09%09%09%09%09%09node.type = %22macro%22;%0A%09%09%09%09%09%09%09node.value = macroInvocation;%0A
+node.end = unquotedValue.end;%0A%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%0A%09%09%09return node;%0A%09%09
 %09%09%09%09
+%09%09%09%0A
 %09%09%7D else %7B%0A
-%09%09%09%09
 %09%09%09node.
@@ -7533,36 +7533,32 @@
 ype = %22string%22;%0A
-%09%09%09%09
 %09%09%09node.value = 
@@ -7567,43 +7567,27 @@
 rue%22;%0A%09%09
-%09%09%09%09%7D%0A%09%09%09%09%09%7D%0A%09%09%09%09%7D%0A%09%09%09%7D%0A%09%09%7D
+%7D%0A%09%09%0A%09%09%0A%09%0A%09
 %0A%09%7D else
@@ -7700,16 +7700,19 @@
 node;%0A%7D;
-%0A
+%0D%0A%0D
 %0A%7D)();%0A
+%09
