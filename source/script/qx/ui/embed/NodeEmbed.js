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

#package(simpleterminators)

************************************************************************ */

qx.OO.defineClass("qx.ui.embed.NodeEmbed", qx.ui.basic.Terminator, 
function(vId)
{
  qx.ui.basic.Terminator.call(this);

  if (qx.util.Validation.isValidString(vId)) {
    this.setSourceNodeId(vId);
  };
});

qx.OO.addProperty({ name : "sourceNodeId", type : qx.constant.Type.STRING });

qx.Proto._createElementImpl = function()
{
  var vNode = document.getElementById(this.getSourceNodeId());

  if (!vNode) {
    throw new Error("Could not find source node with ID: " + this.getSourceNodeId());
  };

  vNode.style.display = qx.constant.Core.EMPTY;

  return this.setElement(vNode);
};
