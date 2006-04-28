/* ************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#package(form)

************************************************************************ */

qx.OO.defineClass("qx.ui.form.InputCheckSymbol", qx.ui.basic.Terminator, 
function()
{
  qx.ui.basic.Terminator.call(this);

  this.setTagName("INPUT");
  this.setSelectable(false);

  if (qx.sys.Client.isMshtml())
  {
    // Take control over size of element (mshtml)
    this.setWidth(13);
    this.setHeight(13);
  }
  else if (qx.sys.Client.isGecko())
  {
    // Remove gecko default margin
    this.setMargin(0);
  };

  // we need to be sure that the dom protection of this is added
  this.forceTabIndex(1);
  this.setTabIndex(-1);
});

qx.OO.addProperty({ name : "name", type : qx.constant.Type.STRING, impl : "apply" });
qx.OO.addProperty({ name : "value", impl : "apply" });
qx.OO.addProperty({ name : "type", impl : "apply" });
qx.OO.addProperty({ name : "checked", type : qx.constant.Type.BOOLEAN, defaultValue : false, impl : "apply", getAlias : "isChecked" });

qx.Proto._modifyApply = function(propValue, propOldValue, propData) {
  return this.setHtmlProperty(propData.name, propValue);
};

qx.Proto.getPreferredBoxWidth = function() {
  return 13;
};

qx.Proto.getPreferredBoxHeight = function() {
  return 13;
};

qx.Proto.getBoxWidth = qx.Proto.getPreferredBoxWidth;
qx.Proto.getBoxHeight = qx.Proto.getPreferredBoxHeight;

qx.Proto.getInnerWidth = qx.Proto.getPreferredBoxWidth;
qx.Proto.getInnerHeight = qx.Proto.getPreferredBoxHeight;

if (qx.sys.Client.isMshtml())
{
  qx.Proto._afterAppear = function()
  {
    qx.ui.basic.Terminator.prototype._afterAppear.call(this);

    var vElement = this.getElement();
    vElement.checked = this.getChecked();

    if (!this.getEnabled()) {
      vElement.disabled = true;
    };
  };
};

qx.Proto._modifyEnabled = function(propValue, propOldValue, propData)
{
  propValue ? this.removeHtmlAttribute(qx.constant.Core.DISABLED) : this.setHtmlAttribute(qx.constant.Core.DISABLED, qx.constant.Core.DISABLED);
  return qx.ui.basic.Terminator.prototype._modifyEnabled.call(this, propValue, propOldValue, propData);
};
