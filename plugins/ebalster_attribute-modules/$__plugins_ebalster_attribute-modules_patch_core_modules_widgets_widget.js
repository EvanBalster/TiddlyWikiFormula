@@ -2240,32 +2240,184 @@
 ;%0A%09%09%09%7D%0A%09%09%7D);%0A%09%7D%0A
+%09// Hashmap of the attribute classes%0A%09if(!this.attributeClasses) %7B%0A%09%09Widget.prototype.attributeClasses = $tw.modules.applyMethods(%22attributevalue%22);%0A%09%7D%0A
 %7D;%0D%0A%0D%0A/*%0ARender 
@@ -9043,32 +9043,130 @@
  this,%0A%09%09value;%0A
+%09if (!this.attributeGizmos) %7B%0A%09%09// First-time attribute preparation%0A%09%09this.attributeGizmos = %7B%7D;%0A%09
 %09$tw.utils.each(
@@ -9224,501 +9224,1462 @@
 me) %7B%0A%09%09
-if(
+%09// Does the 
 attribute
-.
+ 
 type 
-=== %22filtered%22) %7B%0A%09%09%09value = self.wiki.filterTiddlers(attribute.filter,self)%5B0%5D %7C%7C %22%22;%0A%09%09%7D else if(attribute.type === %22indirect%22) %7B
+have a known module?%0A%09%09%09var AttributeClass = self.attributeClasses%5Battribute.type%5D;%0A%09%09%09if (AttributeClass) %7B%0A%09%09%09%09// Instantiate an attribute object.%0A%09%09%09%09self.attributeGizmos%5Bname%5D = new AttributeClass(self,attribute);
 %0A%09%09%09
+%09
 value = self.
-wiki.getTextReference(attribute.textReference,%22%22,self.getVariable(%22currentTiddler%22)
+attributeGizmos%5Bname%5D.value;%0A%09%09%09%7D%0A%09%09%09else %7B%0A%09%09%09%09// Unknown attribute types are treated as strings.%0A%09%09%09%09// String attributes don't change after the first computeAttributes().%0A%09%09%09%09value = attribute.value;%0A%09%09%09%7D%0A%09%09%09// Is the value changed?%0A%09%09%09if (self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%09return true;%0A%09%09%7D
 );%0A
-%09
 %09%7D
- 
 else 
-if(attribute.type === %22macro%22) %7B%0A%09%09%09value = self.getVariable(attribute.value.name,%7Bparams: attribute.value.params%7D);%0A%09%09%7D else %7B // String attribute%0A%09%09%09value = attribute.value;%0A%09%09%7D%0A%09%09// Check whether the attribute has changed
+%7B%0A%09%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09%09$tw.utils.each(this.attributeGizmos,function(gizmo,name) %7B%0A%09%09%09value = gizmo.compute();%0A%09%09%09if(self.attributes%5Bname%5D !== value) %7B%0A%09%09%09%09self.attributes%5Bname%5D = value;%0A%09%09%09%09changedAttributes%5Bname%5D = true;%0A%09%09%09%7D%0A%09%09%7D);%0A%09%7D%0A%09return changedAttributes;%0A%7D;%0D%0A%0D%0A/*%0ASelectively re-compute previously computed attributes. Returns a hashmap of the names of the attributes that have changed%0A*/%0AWidget.prototype.refreshAttributes = function(changedTiddlers) %7B%0A%09if (!this.attributeGizmos) return computeAttributes();%0A%09var changedAttributes = %7B%7D,%0A%09%09self = this,%0A%09%09value;%0A%09// Fully recompute all dynamic attributes (no selectivity is available)%0A%09$tw.utils.each(this.attributeGizmos,function(gizmo,name) %7B%0A%09%09value = gizmo.refresh(changedTiddlers);
 %0A%09%09if(se
