@@ -1,20 +1,19 @@
 /*%5C
-%0D
 %0Atitle: $:/core/
@@ -31,33 +31,32 @@
 ls/parseutils.js
-%0D
 %0Atype: applicati
@@ -60,33 +60,32 @@
 ation/javascript
-%0D
 %0Amodule-type: ut
@@ -212,33 +212,32 @@
  parameters are:
-%0D
 %0A** %60source%60: th
@@ -256,33 +256,32 @@
 ing being parsed
-%0D
 %0A** %60pos%60: the c
@@ -311,33 +311,32 @@
 ithin the string
-%0D
 %0A** Any further 
@@ -389,33 +389,32 @@
  is being parsed
-%0D
 %0A* The return va
@@ -412,33 +412,32 @@
 return value is:
-%0D
 %0A** null if the 
@@ -473,33 +473,32 @@
 ecified position
-%0D
 %0A** an object re
@@ -545,33 +545,32 @@
 standard fields:
-%0D
 %0A*** %60type%60: str
@@ -597,33 +597,32 @@
 ype of the token
-%0D
 %0A*** %60start%60: st
@@ -659,33 +659,32 @@
 he source string
-%0D
 %0A*** %60end%60: end 
@@ -717,33 +717,32 @@
 he source string
-%0D
 %0A*** Any further
@@ -870,33 +870,32 @@
 itespace.%0D%0A%0D%0A%5C*/
-%0D
 %0A(function()%7B%0D%0A%0D
@@ -924,33 +924,32 @@
 browser: true */
-%0D
 %0A/*global $tw: f
@@ -947,33 +947,32 @@
 al $tw: false */
-%0D
 %0A%22use strict%22;%0D%0A
@@ -967,33 +967,32 @@
 e strict%22;%0D%0A%0D%0A/*
-%0D
 %0ALook for a whit
@@ -1077,37 +1077,35 @@
 , start:, end:,%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseWh
@@ -1137,50 +1137,47 @@
 e,pos) %7B
-%0D
 %0A%09var p = pos,c;
-%0D
 %0A%09while(true) %7B
-%0D
 %0A%09%09c = s
@@ -1184,33 +1184,32 @@
 ource.charAt(p);
-%0D
 %0A%09%09if((c === %22 %22
@@ -1351,58 +1351,52 @@
 e spaces
-%0D
 %0A%09%09%09p++;
-%0D
 %0A%09%09%7D else %7B
-%0D
 %0A%09%09%09break;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%09if(p =
@@ -1404,56 +1404,52 @@
 = pos) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09return %7B
-%0D
 %0A%09%09%09type
@@ -1463,63 +1463,57 @@
 espace%22,
-%0D
 %0A%09%09%09start: pos,
-%0D
 %0A%09%09%09end: p
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0AConveni
@@ -1579,37 +1579,35 @@
 r the whitespace
-%0D
 %0A*/
-%0D
 %0Aexports.skipWhi
@@ -1638,42 +1638,39 @@
 e,pos) %7B
-%0D
 %0A%09var c;
-%0D
 %0A%09while(true) %7B
-%0D
 %0A%09%09c = s
@@ -1679,33 +1679,32 @@
 rce.charAt(pos);
-%0D
 %0A%09%09if((c === %22 %22
@@ -1846,75 +1846,68 @@
 e spaces
-%0D
 %0A%09%09%09pos++;
-%0D
 %0A%09%09%7D else %7B
-%0D
 %0A%09%09%09return pos;
-%0D
 %0A%09%09%7D
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -2005,37 +2005,35 @@
 , start:, end:,%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseTo
@@ -2064,33 +2064,32 @@
 rce,pos,token) %7B
-%0D
 %0A%09var match = so
@@ -2120,43 +2120,40 @@
 === pos;
-%0D
 %0A%09if(match) %7B
-%0D
 %0A%09%09return %7B
-%0D
 %0A%09%09%09type
@@ -2154,33 +2154,32 @@
 %09%09type: %22token%22,
-%0D
 %0A%09%09%09value: token
@@ -2179,33 +2179,31 @@
 : token,
-%0D
 %0A%09%09%09start: pos,
-%0D
 %0A%09%09%09end:
@@ -2221,52 +2221,47 @@
 n.length
-%0D
 %0A%09%09%7D;
-%0D
 %0A%09%7D
-%0D
 %0A%09return null;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -2364,37 +2364,35 @@
 , start:, end:,%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseTo
@@ -2433,32 +2433,30 @@
 Token) %7B
-%0D
 %0A%09var node = %7B
-%0D
 %0A%09%09type:
@@ -2465,36 +2465,33 @@
 regexp%22,
-%0D
 %0A%09%09start: pos
-%0D
 %0A%09%7D;
-%0D
 %0A%09reToke
@@ -2500,33 +2500,32 @@
 lastIndex = pos;
-%0D
 %0A%09node.match = r
@@ -2536,33 +2536,32 @@
 en.exec(source);
-%0D
 %0A%09if(node.match 
@@ -2582,33 +2582,32 @@
 index === pos) %7B
-%0D
 %0A%09%09node.end = po
@@ -2631,74 +2631,68 @@
 .length;
-%0D
 %0A%09%09return node;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -2787,37 +2787,35 @@
 , start:, end:,%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseSt
@@ -2850,32 +2850,30 @@
 e,pos) %7B
-%0D
 %0A%09var node = %7B
-%0D
 %0A%09%09type:
@@ -2882,36 +2882,33 @@
 string%22,
-%0D
 %0A%09%09start: pos
-%0D
 %0A%09%7D;
-%0D
 %0A%09var re
@@ -2956,33 +2956,32 @@
 (?:'(%5B%5E'%5D*)')/g;
-%0D
 %0A%09reString.lastI
@@ -2983,33 +2983,32 @@
 lastIndex = pos;
-%0D
 %0A%09var match = re
@@ -3019,33 +3019,32 @@
 ng.exec(source);
-%0D
 %0A%09if(match && ma
@@ -3055,33 +3055,32 @@
 index === pos) %7B
-%0D
 %0A%09%09node.value = 
@@ -3107,33 +3107,32 @@
 ed ? match%5B1%5D :(
-%0D
 %0A%09%09%09match%5B2%5D !==
@@ -3164,26 +3164,24 @@
 atch%5B3%5D 
-%0D
 %0A%09%09%09%09%09);
-%0D
 %0A%09%09node.
@@ -3208,74 +3208,68 @@
 .length;
-%0D
 %0A%09%09return node;
-%0D
 %0A%09%7D else %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -3376,37 +3376,35 @@
 :, start:, end:%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseMa
@@ -3440,32 +3440,30 @@
 e,pos) %7B
-%0D
 %0A%09var node = %7B
-%0D
 %0A%09%09type:
@@ -3481,36 +3481,33 @@
 ameter%22,
-%0D
 %0A%09%09start: pos
-%0D
 %0A%09%7D;
-%0D
 %0A%09// Def
@@ -3512,33 +3512,32 @@
 efine our regexp
-%0D
 %0A%09var reMacroPar
@@ -3644,33 +3644,32 @@
 %5B%5E%5Cs%3E%22'=%5D+)))/g;
-%0D
 %0A%09// Skip whites
@@ -3664,33 +3664,32 @@
  Skip whitespace
-%0D
 %0A%09pos = $tw.util
@@ -3709,33 +3709,32 @@
 ace(source,pos);
-%0D
 %0A%09// Look for th
@@ -3736,33 +3736,32 @@
 or the parameter
-%0D
 %0A%09var token = $t
@@ -3814,52 +3814,48 @@
 ameter);
-%0D
 %0A%09if(!token) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%09pos = 
@@ -3856,33 +3856,32 @@
 pos = token.end;
-%0D
 %0A%09// Get the par
@@ -3886,33 +3886,32 @@
 arameter details
-%0D
 %0A%09node.value = t
@@ -3950,33 +3950,32 @@
 ken.match%5B2%5D : (
-%0D
 %0A%09%09%09%09%09token.matc
@@ -4005,33 +4005,32 @@
 ken.match%5B3%5D : (
-%0D
 %0A%09%09%09%09%09%09token.mat
@@ -4061,33 +4061,32 @@
 ken.match%5B4%5D : (
-%0D
 %0A%09%09%09%09%09%09%09token.ma
@@ -4118,33 +4118,32 @@
 ken.match%5B5%5D : (
-%0D
 %0A%09%09%09%09%09%09%09%09token.m
@@ -4184,76 +4184,69 @@
 h%5B6%5D : (
-%0D
 %0A%09%09%09%09%09%09%09%09%09%22%22
-%0D
 %0A%09%09%09%09%09%09%09%09)
-%0D
 %0A%09%09%09%09%09%09%09)
-%0D
 %0A%09%09%09%09%09%09)
-%0D
 %0A%09%09%09%09%09)
-%0D
 %0A%09%09%09%09);
-%0D
 %0A%09if(tok
@@ -4251,33 +4251,32 @@
 oken.match%5B1%5D) %7B
-%0D
 %0A%09%09node.name = t
@@ -4281,37 +4281,35 @@
  token.match%5B1%5D;
-%0D
 %0A%09%7D
-%0D
 %0A%09// Update the 
@@ -4312,33 +4312,32 @@
 the end position
-%0D
 %0A%09node.end = pos
@@ -4337,42 +4337,39 @@
 d = pos;
-%0D
 %0A%09return node;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -4465,37 +4465,35 @@
 :, start:, end:%7D
-%0D
 %0A*/
-%0D
 %0Aexports.parseMa
@@ -4530,32 +4530,30 @@
 e,pos) %7B
-%0D
 %0A%09var node = %7B
-%0D
 %0A%09%09type:
@@ -4565,51 +4565,47 @@
 rocall%22,
-%0D
 %0A%09%09start: pos,
-%0D
 %0A%09%09params: %5B%5D
-%0D
 %0A%09%7D;
-%0D
 %0A%09// Def
@@ -4611,33 +4611,32 @@
 fine our regexps
-%0D
 %0A%09var reMacroNam
@@ -4647,33 +4647,32 @@
 /(%5B%5E%5Cs%3E%22'=%5D+)/g;
-%0D
 %0A%09// Skip whites
@@ -4667,33 +4667,32 @@
  Skip whitespace
-%0D
 %0A%09pos = $tw.util
@@ -4712,33 +4712,32 @@
 ace(source,pos);
-%0D
 %0A%09// Look for a 
@@ -4749,33 +4749,32 @@
 e less than sign
-%0D
 %0A%09var token = $t
@@ -4815,52 +4815,48 @@
 s,%22%3C%3C%22);
-%0D
 %0A%09if(!token) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%09pos = 
@@ -4857,33 +4857,32 @@
 pos = token.end;
-%0D
 %0A%09// Get the mac
@@ -4880,33 +4880,32 @@
 t the macro name
-%0D
 %0A%09var name = $tw
@@ -4952,51 +4952,47 @@
 roName);
-%0D
 %0A%09if(!name) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%09node.n
@@ -5003,33 +5003,32 @@
 = name.match%5B1%5D;
-%0D
 %0A%09pos = name.end
@@ -5020,33 +5020,32 @@
 %09pos = name.end;
-%0D
 %0A%09// Process par
@@ -5043,33 +5043,32 @@
 ocess parameters
-%0D
 %0A%09var parameter 
@@ -5103,33 +5103,32 @@
 ter(source,pos);
-%0D
 %0A%09while(paramete
@@ -5123,33 +5123,32 @@
 ile(parameter) %7B
-%0D
 %0A%09%09node.params.p
@@ -5154,33 +5154,32 @@
 push(parameter);
-%0D
 %0A%09%09pos = paramet
@@ -5177,33 +5177,32 @@
 = parameter.end;
-%0D
 %0A%09%09// Get the ne
@@ -5205,33 +5205,32 @@
 e next parameter
-%0D
 %0A%09%09parameter = $
@@ -5262,37 +5262,35 @@
 ter(source,pos);
-%0D
 %0A%09%7D
-%0D
 %0A%09// Skip whites
@@ -5285,33 +5285,32 @@
  Skip whitespace
-%0D
 %0A%09pos = $tw.util
@@ -5330,33 +5330,32 @@
 ace(source,pos);
-%0D
 %0A%09// Look for a 
@@ -5370,33 +5370,32 @@
 reater than sign
-%0D
 %0A%09token = $tw.ut
@@ -5432,52 +5432,48 @@
 s,%22%3E%3E%22);
-%0D
 %0A%09if(!token) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%09pos = 
@@ -5474,33 +5474,32 @@
 pos = token.end;
-%0D
 %0A%09// Update the 
@@ -5502,33 +5502,32 @@
 the end position
-%0D
 %0A%09node.end = pos
@@ -5527,42 +5527,39 @@
 d = pos;
-%0D
 %0A%09return node;
-%0D
 %0A%7D;%0D%0A%0D%0A/*
-%0D
 %0ALook fo
@@ -5720,20 +5720,48 @@
 , end:,%7D
-%0D
 %0A*/
+%0Avar AttributeRules = null;%0D%0A
 %0D%0Aexport
@@ -5801,51 +5801,47 @@
 e,pos) %7B
-%0D
 %0A%09var node = %7B
-%0D
 %0A%09%09start: pos
-%0D
 %0A%09%7D;
-%0D
 %0A%09// Def
@@ -5847,33 +5847,32 @@
 fine our regexps
-%0D
 %0A%09var reAttribut
@@ -5889,33 +5889,32 @@
 %5B%5E%5C/%5Cs%3E%22'=%5D+)/g,
-%0D
 %0A%09%09reUnquotedAtt
@@ -5933,33 +5933,32 @@
 %5E%5C/%5Cs%3C%3E%22'=%5D+)/g,
-%0D
 %0A%09%09reFilteredVal
@@ -5975,33 +5975,32 @@
 %5C%7B(.+?)%5C%7D%5C%7D%5C%7D/g,
-%0D
 %0A%09%09reIndirectVal
@@ -6016,33 +6016,32 @@
 %7B(%5B%5E%5C%7D%5D+)%5C%7D%5C%7D/g;
-%0D
 %0A%09// Skip whites
@@ -6036,33 +6036,32 @@
  Skip whitespace
-%0D
 %0A%09pos = $tw.util
@@ -6081,33 +6081,32 @@
 ace(source,pos);
-%0D
 %0A%09// Get the att
@@ -6108,33 +6108,32 @@
 e attribute name
-%0D
 %0A%09var name = $tw
@@ -6184,51 +6184,47 @@
 teName);
-%0D
 %0A%09if(!name) %7B
-%0D
 %0A%09%09return null;
-%0D
 %0A%09%7D
-%0D
 %0A%09node.n
@@ -6235,33 +6235,32 @@
 = name.match%5B1%5D;
-%0D
 %0A%09pos = name.end
@@ -6252,33 +6252,32 @@
 %09pos = name.end;
-%0D
 %0A%09// Skip whites
@@ -6272,33 +6272,32 @@
  Skip whitespace
-%0D
 %0A%09pos = $tw.util
@@ -6317,33 +6317,32 @@
 ace(source,pos);
-%0D
 %0A%09// Look for an
@@ -6345,33 +6345,32 @@
 r an equals sign
-%0D
 %0A%09var token = $t
@@ -6410,31 +6410,29 @@
 os,%22=%22);
-%0D
 %0A%09if(token) %7B
-%0D
 %0A%09%09pos =
@@ -6434,33 +6434,32 @@
 pos = token.end;
-%0D
 %0A%09%09// Skip white
@@ -6455,33 +6455,32 @@
  Skip whitespace
-%0D
 %0A%09%09pos = $tw.uti
@@ -6501,33 +6501,32 @@
 ace(source,pos);
-%0D
 %0A%09%09// Look for a
@@ -6532,33 +6532,32 @@
 a string literal
-%0D
 %0A%09%09var stringLit
@@ -6596,33 +6596,32 @@
 ral(source,pos);
-%0D
 %0A%09%09if(stringLite
@@ -6626,46 +6626,24 @@
 teral) %7B
-%0D
 %0A%09%09%09
-pos = stringLiteral.end;%0D
+%09%09%09%09
 %0A%09%09%09node
@@ -6651,33 +6651,32 @@
 type = %22string%22;
-%0D
 %0A%09%09%09node.value =
@@ -6696,552 +6696,484 @@
 l.value;
-%0D
 %0A%09%09
-%7D else %7B%0D%0A%09%09%09// Look for a filtered value%0D%0A%09%09%09var filteredValue = $tw.utils.parseTokenRegExp(source,pos,reFilteredValue);%0D%0A%09%09%09if(filteredValue
+%09node.end = stringLiteral.end;%0A%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%0A%09%09%09return node;%0A%09%09%7D%0A%09%09// Load attribute rules if needed%0A%09%09if (!AttributeRules
 ) %7B
-%0D
 %0A%09%09%09
-%09pos = filteredValue.end;%0D%0A%09%09%09%09node.type = %22filtered%22;%0D%0A%09%09%09%09node.filter = filteredValue.match%5B1%5D;%0D%0A%09%09%09%7D else %7B%0D%0A%09%09%09%09// Look for an indirect value%0D%0A%09%09%09%09var indirectValue = $tw.utils.parseTokenRegExp(source,pos,reIndirectValue);%0D%0A%09%09%09%09if(indirectValu
+AttributeRules = %7B%7D;%0A%09%09%09$tw.modules.applyMethods(%22attributerule%22,AttributeRules);%0A%09%09%7D%0A%09%09// Look for an attribute rule%0A%09%09var match = null;%0A%09%09$tw.utils.each(AttributeRules,function(rul
 e) %7B
-%0D
 %0A%09%09%09
-%09%09pos = indirectValue.end;%0D%0A%09%09%09%09%09node.type = %22indirect%22;%0D%0A%09%09%09%09%09node.textReference = indirectValue.match%5B1%5D;%0D%0A%09%09%09%09%7D else %7B%0D
+match = rule(source,pos,node);%0A%09%09%09return !match;%0A%09%09%7D);%0A%09%09if (match) return match;%0A%09%09%09%09%09%09%09%09%09%09%09%09%09
 %0A%09%09%09
+%0A
 %09%09// Loo
@@ -7186,37 +7186,33 @@
 a unquoted value
-%0D%0A%09%09%09
+%0A
 %09%09var unquotedVa
@@ -7268,37 +7268,33 @@
 uotedAttribute);
-%0D%0A%09%09%09
+%0A
 %09%09if(unquotedVal
@@ -7298,53 +7298,26 @@
 Value) %7B
-%0D
 %0A%09%09%09%09%09%09
-pos = unquotedValue.end;%0D%0A
 %09%09
-%09
+%0A
 %09%09%09node.
@@ -7324,37 +7324,33 @@
 type = %22string%22;
-%0D%0A%09%09%09
+%0A
 %09%09%09node.value = 
@@ -7372,304 +7372,163 @@
 atch%5B1%5D;
-%0D
 %0A%09%09%09
-%09%09%7D else %7B%0D%0A%09%09%09%09%09%09// Look for a macro invocation value%0D%0A%09%09%09%09%09%09var macroInvocation = $tw.utils.parseMacroInvocation(source,pos);%0D%0A%09%09%09%09%09%09if(macroInvocation) %7B%0D%0A%09%09%09%09%09%09%09pos = macroInvocation.end;%0D%0A%09%09%09%09%09%09%09node.type = %22macro%22;%0D%0A%09%09%09%09%09%09%09node.value = macroInvocation;%0D
+node.end = unquotedValue.end;%0A%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%0A%09%09%09%09%09%09%09%09%09%0A%09%09%09return node;
 %0A%09%09%09%09
+%09%09%09%09%09%0A
 %09%09%7D else %7B
-%0D%0A%09%09
+%0A
 %09%09%09
-%09%09
 node.typ
@@ -7540,25 +7540,20 @@
 string%22;
-%0D%0A%09%09
+%0A
 %09%09%09
-%09%09
 node.val
@@ -7564,63 +7564,40 @@
  %22true%22;
-%0D
 %0A%09%09
-%09%09%09%09%7D%0D%0A%09%09%09%09%09%7D%0D%0A%09%09%09%09%7D%0D%0A%09%09%09%7D%0D%0A%09%09%7D%0D
+%7D%0A%09%09%0A%09%09%0A%09%0A%09
 %0A%09%7D else %7B
-%0D
 %0A%09%09node.
@@ -7604,33 +7604,32 @@
 type = %22string%22;
-%0D
 %0A%09%09node.value = 
@@ -7635,21 +7635,19 @@
  %22true%22;
-%0D
 %0A%09%7D
-%0D
 %0A%09// Upd
@@ -7658,33 +7658,32 @@
 the end position
-%0D
 %0A%09node.end = pos
@@ -7683,38 +7683,36 @@
 d = pos;
-%0D
 %0A%09return node;
-%0D
 %0A%7D;%0D%0A%0D%0A%7D)();
-%0D
 %0A
+%09
