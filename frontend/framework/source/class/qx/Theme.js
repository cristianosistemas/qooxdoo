/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************

#module(core)
#module(oo)
#require(qx.manager.object.AliasManager)

************************************************************************ */

/**
 * Early work on a cleaner way of defining themes that allow the styling of
 * qooxdoo applications. Supports themes for appearance, color, icon, widget.
 *
 * WARNING: Work in progress!
 */
qx.Class.define("qx.Theme",
{
  statics:
  {
    /*
    ---------------------------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Theme config
     *
     * Example:
     * <pre><code>
     * qx.Theme.define("name",
     * {
     *   extend : otherTheme,
     *   title : "MyThemeTitle"
     *   icons : {},
     *   widgets : {},
     *   colors : {},
     *   appearances : {}
     * });
     * </code></pre>
     *
     * @type static
     * @param name {String} name of the mixin
     * @param config {Map} config structure
     * @return {void}
     */
    define : function(name, config)
    {
      if (!config) {
        var config = {};
      }

      // Validate incoming data
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.__validateConfig(name, config);
      }

      // Create alias
      var theme = config;

      // Add name and basename to object
      theme.$$type = "Theme";
      theme.name = name;

      // Attach toString
      theme.toString = this.genericToString;

      // Assign to namespace
      theme.basename = qx.Class.createNamespace(name, theme);

      // Store class reference in global class registry
      this.__registry[name] = theme;
    },


    /**
     * Query the theme list to get all themes the given key
     *
     * @param key {String} the key to look for
     * @return {Theme[]} list of matching themes
     */
    __queryThemes : function(key)
    {
      var reg = this.__registry;
      var theme;
      var list = [];

      for (var name in reg)
      {
        theme = reg[name];
        if (theme[key]) {
          list.push(theme);
        }
      }

      return list;
    },


    /**
     * Returns a list of all registered color themes
     *
     * @type static
     * @return {Theme[]} list of color themes
     */
    getColorThemes : function() {
      return this.__queryThemes("colors");
    },


    /**
     * Returns a list of all registered color themes
     *
     * @type static
     * @return {Theme[]} list of color themes
     */
    getBorderThemes : function() {
      return this.__queryThemes("borders");
    },


    /**
     * Returns a list of all registered color themes
     *
     * @type static
     * @return {Theme[]} list of color themes
     */
    getWidgetThemes : function() {
      return this.__queryThemes("widgets");
    },


    /**
     * Returns a list of all registered color themes
     *
     * @type static
     * @return {Theme[]} list of color themes
     */
    getIconThemes : function() {
      return this.__queryThemes("icons");
    },


    /**
     * Returns a list of all registered color themes
     *
     * @type static
     * @return {Theme[]} list of color themes
     */
    getAppearanceThemes : function() {
      return this.__queryThemes("appearance");
    },


    /**
     * Returns a theme by name
     *
     * @type static
     * @param name {String} theme name to check
     * @return {Object ? void} theme object
     */
    getByName : function(name) {
      return this.__registry[name];
    },


    /**
     * Determine if theme exists
     *
     * @type static
     * @param name {String} theme name to check
     * @return {Boolean} true if theme exists
     */
    isDefined : function(name) {
      return this.getByName(name) !== undefined;
    },


    /**
     * Determine the number of themes which are defined
     *
     * @type static
     * @return {Number} the number of classes
     */
    getTotalNumber : function() {
      return qx.lang.Object.getLength(this.__registry);
    },




    /*
    ---------------------------------------------------------------------------
       PRIVATE/INTERNAL API
    ---------------------------------------------------------------------------
    */

    /**
     * This method will be attached to all themes to return
     * a nice identifier for them.
     *
     * @internal
     * @return {String} The interface identifier
     */
    genericToString : function() {
      return "[Theme " + this.name + "]";
    },


    /** {var} TODOC */
    __registry : {},


    /** {Map} allowed keys in theme definition */
    __allowedKeys : qx.core.Variant.select("qx.debug",
    {
      "on":
      {
        "title"       : "string", // String
        "extend"      : "object", // Theme
        "colors"      : "object", // Map
        "borders"     : "object", // Map
        "icons"       : "object", // Map
        "widgets"     : "object", // Map
        "appearances" : "object", // Map
        "meta"        : "object"
      },

      "default" : null
    }),


    /**
     * Validates incoming configuration and checks keys and values
     *
     * @type static
     * @param name {String} The name of the class
     * @param config {Map} Configuration map
     * @return {void}
     * @throws TODOC
     */
    __validateConfig : qx.core.Variant.select("qx.debug",
    {
      "on": function(name, config)
      {
        var allowed = this.__allowedKeys;
        for (var key in config)
        {
          if (allowed[key] === undefined) {
            throw new Error('The configuration key "' + key + '" in class "' + name + '" is not allowed!');
          }

          if (config[key] == null) {
            throw new Error('Invalid key "' + key + '" in class "' + name + '"! The value is undefined/null!');
          }

          if (allowed[key] !== null && typeof config[key] !== allowed[key]) {
            throw new Error('Invalid type of key "' + key + '" in class "' + name + '"! The type of the key must be "' + allowed[key] + '"!');
          }
        }

        // Validate maps
        var maps = [ "colors", "borders", "icons", "widgets", "appearances", "meta" ];
        for (var i=0, l=maps.length; i<l; i++)
        {
          var key = maps[i];

          if (config[key] !== undefined && (config[key] instanceof Array || config[key] instanceof RegExp || config[key] instanceof Date || config[key].classname !== undefined)) {
            throw new Error('Invalid key "' + key + '" in theme "' + name + '"! The value needs to be a map!');
          }
        }

        // Check conflicts
        var counter = 0;
        for (var i=0, l=maps.length; i<l; i++)
        {
          var key = maps[i];

          if (config[key]) {
            counter++;
          }

          if (counter > 1) {
            throw new Error("You can only define one theme category per file! Invalid theme: " + name);
          }
        }

        // Validate meta
        if (config.meta)
        {
          var value;
          for (var key in config.meta)
          {
            value = config.meta[key];
            if (!(typeof value === "object" && value !== null && value.$$type === "Theme")) {
              throw new Error('The content of a meta theme must reference to other themes. The value for "' + key + '" in theme "' + name + '" is invalid: ' + value);
            }
          }
        }

        // Validate extend
        if (config.extend && config.extend.$$type !== "Theme") {
          throw new Error('Invalid extend in theme "' + name + '": ' + config.extend);
        }
      },

      "default" : function() {}
    })
  }
});
