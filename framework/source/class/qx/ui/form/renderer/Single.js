/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Single column rendere for {@link qx.ui.form.Form}.
 */
qx.Class.define("qx.ui.form.renderer.Single", 
{
  extend : qx.ui.core.Widget,


  construct : function()
  {
    this.base(arguments);
    
    var layout = new qx.ui.layout.Grid();
    layout.setSpacing(6);
    layout.setColumnAlign(0, "left", "middle");
    this._setLayout(layout);
  },
  

  members :
  {
    __row : 0,
    __buttonRow : null,
    
    /**
     * Add a group of form items with the corresponding names. The names are
     * displayed as label.
     * The title is optional and is used as grouping for the given form 
     * items.
     * 
     * @param items {qx.ui.core.Widget[]} An array of form items to render.
     * @param names {String[]} An array of names for the form items.
     * @param title {String?} A title of the group you are adding.
     */
    addItems : function(items, names, title) {
      this.__buttonRow = null;
      // add the header
      if (title != null) {
        this._add(
          this._createHeader(title), {row: this.__row, column: 0, colSpan: 2}
        );
        this.__row++;
      }
      
      // add the items
      for (var i = 0; i < items.length; i++) {
        var label = this._createLabel(names[i], items[i]);
        this._add(label, {row: this.__row, column: 0});
        this._add(items[i], {row: this.__row, column: 1});
        this.__row++;
      }
    },
    
    /**
     * Adds a button the the form renderer. All buttons will be added in a 
     * single row at the bottom of the form.
     * 
     * @param button {qx.ui.form.Button} The button to add.
     */
    addButton : function(button) {
      if (this.__buttonRow == null) {
        // create button row
        this.__buttonRow = new qx.ui.container.Composite();
        var hbox = new qx.ui.layout.HBox();
        hbox.setAlignX("right");
        hbox.setSpacing(5);
        this.__buttonRow.setLayout(hbox);
        // add the button row
        this._add(this.__buttonRow, {row: this.__row, column: 0, colSpan: 2});
        // increase the row
        this.__row++;
      } 
      
      // add the button
      this.__buttonRow.add(button);      
    },
      
    
    /**
     * Creates a label for the given form item.
     *  
     * @param name {String} The content of the label without the 
     *   trailing * and :
     * @param item {qx.ui.core.Widget} The item, which has the required state.
     * @return {qx.uiu.basic.Label} The label for the given item.
     */
    _createLabel : function(name, item) {
      var reqired = "";
      if (item.getRequired()) {
       reqired = " <span style='color:red'>*</span> "; 
      }
      var label =  new qx.ui.basic.Label(name + reqired + " :");
      label.setRich(true);
      return label;
    },
    
    
    /**
     * Creates a header label for the form groups.
     * 
     * @param title {String} Creates a header label.
     * @return {qx.ui.basic.Label} The header for the form groups.
     */
    _createHeader : function(title) {
      var header = new qx.ui.basic.Label(title);
      header.setFont("bold");
      return header;
    }
  }
});